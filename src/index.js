// Scss
import "./scss/style.scss";

// Fonts
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../node_modules/@fortawesome/fontawesome-free/js/all.js';

// Config
import { CITY, GAME_TEXT, INVADER, INVADERS, LIVES, MOTHERSHIP, SCREEN, TANK } from './config';

// Assets
import gameSprite from './assets/images/sprite.png';
import gameSoundsOgg from './assets/audio/gamesounds.ogg';
import gameSoundsMp3 from './assets/audio/gamesounds.mp3';

//Utils
import CollisionDetector from './utils/CollisionDetector';
import InputHandler from './utils/InputHandler';
import Preloader from './utils/Preloader';
import sleep from './utils/Sleep';

// Modules
import Background from './modules/Background/Background';
import GameoverScreen from './modules/GameoverScreen/GameoverScreen';
import IntroScreen from './modules/IntroScreen/IntroScreen';
import Screen from './modules/Screen/Screen';
import Sounds from './modules/Sounds/Sounds';
import Tank from './modules/Tank/Tank';
import Invaders from './modules/invaders/Invaders';
import Bullets from './modules/Bullets/Bullets';
import Cities from './modules/Cities/Cities';
import Mothership from './modules/Mothership/Mothership';
import Score from './modules/Score/Score';
import Lives from './modules/Lives/Lives';
import Button from './modules/Button/Button';

const background = Background();
let livesLeft;
let gameLoop;
const screen = Screen();
const gameoverScreen = GameoverScreen();
const introScreen = IntroScreen();
screen.render();
const sounds = Sounds();
let score;
let lives;
let tank;
let invaders;
let bullets;
let cities;
let citiesDestroyed = false;
let mothership;
let mothershipOldTime = 0;
let mothershipNewTime;

let collisionDetector;
let collisionInfo;
let inputHandler;
let now = 0;
let invaderMoveTime = INVADERS.moveTime;
let isTankBullet = false;
let invader_group_y;
let currentLevel = 1;
let isMuted = true;

const loading = document.getElementById('loading');
const screenCanvas = document.getElementById('screenCanvas');
const startButtonContainer = document.getElementById('startButtonContainer');
const startButton = Button(100, 200, 200, 60, 'START', '#0f0', 'startButton', 'button', startButtonContainer);
const soundToggle = document.getElementById('soundToggle');


// Preload images and sounds then init if all loaded successfully
const preloaderImages = Preloader([gameSprite], "image");
const preloaderSounds = Preloader([gameSoundsOgg, gameSoundsMp3], "sound");

const loadImgFiles = preloaderImages.preloadFiles();
const loadSoundFiles = preloaderSounds.preloadFiles();

Promise.all([loadImgFiles, loadSoundFiles])
    .then(() => {
        init();
        gameStates.currentState = gameStates.introScreen;
        gameStates.currentState();
    }).catch();


// Initialise everything needed for new game
const init = () => {
    // Remove loading spinner
    loading.style.display = 'none';

    // Render background
    background.render(gameSprite);

    // Set up initial assignment of variables
    invader_group_y = INVADERS.y;
    livesLeft = LIVES.lives;
    gameLoop = null;
    score = Score();
    lives = Lives();
    tank = Object.assign(Tank(), TANK);
    invaders = Invaders();
    bullets = Bullets();
    cities = Cities();
    mothership = Object.assign(Mothership(), MOTHERSHIP);
    collisionDetector = CollisionDetector(tank, tank);
    inputHandler = InputHandler();
    now = 0;
    invaderMoveTime = INVADERS.moveTime - INVADERS.speedIncrease;

    // Set up objects from prototypes (invaders and bullets)

    // Build objects
    invaders.build(invader_group_y);
    cities.build();
    resetMothershipTime();
};

const toggleMute = () => {
    isMuted = !isMuted;
    sounds.render(isMuted);
};

const loop = (currentTime) => {
    gameLoop = requestAnimationFrame(loop);
    gameStates.currentState(currentTime);
};

const update = (currentTime) => {
    purge();
    bullets.move();

    // If spacebar was pressed, then create new bullet
    let isBulletKeyPressed = inputHandler.currentKeysPressed.findIndex((key) => {
        return key === 32;
    });

    if (isBulletKeyPressed > -1) {
        isTankBullet = bullets.bulletList.find((bullet) => {
            return bullet.type === 'tank';
        });
        if (!isTankBullet) {
            bullets.addBullet('tank', null, tank.x + (TANK.width / 2) - (TANK.bulletInfo.width / 2), tank.y - TANK.bulletInfo.height, isMuted);
            tank.animationType = 'shoot';
            tank.animationFrame = 1;
        }
    }

    // Check collisions
    handleTankBulletCollisions();
    handleInvaderBulletCollisions();
    handleMothershipBulletCollisions();

    // Move objects
    tank.move(inputHandler.currentKeysPressed);

    // Check for mute toggle being pressed for sounds
    // sounds.toggleMute(inputHandler.currentKeysPressed);

    if (currentTime > now + invaderMoveTime) {
        // Only move invaders etc if none of them are currently being destroyed
        let areInvadersExploding = invaders.invaderList.filter((invader) => {
            return invader.isExploding;
        });
        if (!areInvadersExploding.length) {
            invaders.move(isMuted);
            createInvaderBullets();
        }
        now = currentTime;

        // Check for invaders reaching bottom of screen
        invaders.invaderList.forEach((invader) => {
            if (invader.y + invader.height > TANK.y) {
                tank.destroy();
                gameStates.currentState = gameStates.gameOver;
            }

            // Check for invaders reaching cities
            if (!citiesDestroyed) {
                if (invader.y + invader.height > (CITY.y - 30)) { // 30 worked out - not a vaariable
                    cities.clear();
                    citiesDestroyed = true;
                }
            }
        });
    }

    if (mothership.isActive && !mothership.isExploding) {
        createMothershipBullets();
        mothership.move();
        if (mothership.x > SCREEN.width) {
            mothership.remove();
            resetMothershipTime();
        }
    } else {
        if (currentTime > mothershipOldTime + mothershipNewTime) {
            mothershipOldTime = currentTime;
            mothership.reset();
            resetMothershipTime();
        }
    }
};

const resetMothershipTime = () => {
    mothershipNewTime = Math.floor((Math.random() * 30000) + 10000);
}

const purge = () => {
    invaders.purge(); // Get rid of any invaders that are destroyed.
    mothership.purge(); // Get rid of mothership if destroyed

    if (invaders.invaderList.length < 1) {
        gameStates.currentState = gameStates.finishLevel;
    }
};

const handleTankBulletCollisions = () => {

    // Establish whether tank bullet is currently in play
    let tankBulletIndex;
    let collisionInfo;
    let invaderHit;

    if (bullets.bulletList.length) {
        tankBulletIndex = bullets.bulletList.findIndex((bullet) => {
            return bullet.type === 'tank';
        });
    }

    // Collision detection for tank bullet
    if (tankBulletIndex > -1) {
        // Set collisionDetector obj1 to tank bullet
        const tankBullet = bullets.bulletList[tankBulletIndex];
        collisionDetector.obj1 = tankBullet;

        // Tank bullet vs invaders
        for (let i = 0; i < invaders.invaderList.length; i++) {
            collisionDetector.obj2 = invaderHit = invaders.invaderList[i];
            collisionInfo = collisionDetector.collisionInfo();

            if (collisionInfo.didCollide) {
                if (!invaderHit.isExploding) {
                    score.increase(invaderHit.score);
                    invaderHit.destroy(isMuted);
                    invaderMoveTime -= INVADERS.speedIncrease;
                    bullets.remove(tankBulletIndex);
                    break;
                }
            }
        }

        // Tank bulllet vs cities
        for (let i = 0; i < CITY.no; i++) {
            const cityHit = cities.cityList[i];
            collisionDetector.obj2 = cityHit;
            collisionInfo = collisionDetector.collisionInfo();

            if (collisionInfo.didCollide) {
                // Check the area directly above the bullet to see whether it's solid

                // If bullet y is lower than city y (To stop checking element outside the bounds of the city = error)
                let damageCity = false;
                // Area to check imagedata of
                const topLeftX = tankBullet.x - cityHit.x; // Bullet x
                const topLeftY = tankBullet.y - cityHit.y - 1; // 1 px above bullet y
                const width = TANK.bulletInfo.width;
                const height = 1;
                const imgData = cityHit.ctx.getImageData(topLeftX, topLeftY, width, height);

                for (let i = 0; i < imgData.data.length; i += 4) {
                    if (imgData.data[i + 3] === 255) {
                        damageCity = true;
                    }
                }

                if (damageCity === true) { // If pixel alpha is 255
                    cityHit.damage(tankBullet);
                    bullets.remove(tankBulletIndex);
                }
            }
        }

        // Tank bullet vs mothership
        if (mothership.isActive) {
            collisionDetector.obj2 = mothership;
            collisionInfo = collisionDetector.collisionInfo();

            if (collisionInfo.didCollide) {
                mothership.destroy(isMuted);
                resetMothershipTime();
                bullets.remove(tankBulletIndex);
                score.increase(500);
            }
        }
    }
};

const handleInvaderBulletCollisions = () => {
    // Collision detector for invader bullets
    if (bullets.bulletList.length) {
        let invaderBullet; // Current invader bullet to check
        let invaderType;
        let bulletInfo;
        let cityHit; // City that is hit
        // Area to check imagedata of    
        let topLeftX;
        let topLeftY;
        let width;
        let height;
        let imgData;
        let damageCity = false;

        // Run through any invaders bullets in bulletsList
        bullets.bulletList.forEach((bullet, index) => {
            if (bullet.type === 'invader') {
                invaderType = INVADER.find((inv) => inv.type === bullet.subType);
                bulletInfo = invaderType.bulletInfo;
                collisionDetector.obj1 = bullet;

                // Invader bullet vs tank
                collisionDetector.obj2 = tank;
                collisionInfo = collisionDetector.collisionInfo();

                if (collisionInfo.didCollide && !tank.isAnimating) {
                    // The invaders pause and the tank appears on the left hand side of the screen again
                    // All the invader bullets are deleted
                    // The game pauses while the tank destroy animate happens
                    gameStates.currentState = gameStates.loseLife;

                    inputHandler.currentKeysPressed = []; // Clear out the input handler info
                    bullets.remove(index);
                    tank.destroy(isMuted);
                    lives.loseLife();
                    if (lives.currentLives === 0) {
                        gameStates.currentState = gameStates.gameOver;
                        return;
                    }
                }
                // Invader bullet vs cities
                for (let i = 0; i < CITY.no; i++) {
                    cityHit = cities.cityList[i];
                    collisionDetector.obj2 = cityHit;
                    collisionInfo = collisionDetector.collisionInfo();

                    if (collisionInfo.didCollide) {

                        // Check the area directly above the bullet to see whether it's solid
                        // Area to check imagedata of
                        topLeftX = bullet.x - cityHit.x; // Bullet x
                        topLeftY = bullet.y - cityHit.y + bulletInfo.height; // 1 px below bullet y
                        width = bulletInfo.width;
                        height = 1;
                        imgData = cityHit.ctx.getImageData(topLeftX, topLeftY, width, height);

                        for (let i = 0; i < imgData.data.length; i += 4) {
                            if (imgData.data[i + 3] === 255) {
                                damageCity = true;
                            }
                        }

                        if (damageCity === true) { // If pixel alpha is 255
                            cityHit.damage(bullet);
                            bullets.remove(index);
                        }
                    }
                }
            }
        });
    }
};

const handleMothershipBulletCollisions = () => {
    bullets.bulletList.forEach((bullet, index) => {
        if (bullet.type === 'mothership') {
            collisionDetector.obj1 = bullet;
            collisionDetector.obj2 = tank;
            collisionInfo = collisionDetector.collisionInfo();

            if (collisionInfo.didCollide && !tank.isAnimating) {
                // The invaders pause and the tank appears on the left hand side of the screen again
                // All the invader bullets are deleted
                // The game pauses while the tank destroy animate happens
                gameStates.currentState = gameStates.loseLife;

                inputHandler.currentKeysPressed = []; // Clear out the input handler info
                bullets.remove(index);
                tank.destroy(isMuted);
                lives.loseLife();
                if (lives.currentLives === 0) {
                    gameStates.currentState = gameStates.gameOver;
                    return;
                }
            }
        }
    });
};

const createInvaderBullets = () => {
    // Check how many invader bullets are currently in play
    let invaderBullets = bullets.bulletList.filter((bullet) => bullet.type === 'invader');

    let invaderIndex;
    let invader;
    let bottomInvIndex;
    let bottomInv;
    let newInvaderBullet;
    // If it's less than 2(? Arbitrary) for example, then create more randomly so there are always 2
    let noBulletsToCreate = 2 - invaderBullets.length;

    for (let i = 0; i < noBulletsToCreate; i++) {
        // Choose random invader - the bottom one of whatever column
        invaderIndex = Math.floor((Math.random() * invaders.invaderList.length));

        invader = invaders.invaderList[invaderIndex];

        invaders.invaderList.forEach((inv, index) => {
            if (inv.x === invader.x) {
                bottomInvIndex = index;
            }
        });

        bottomInv = invaders.invaderList[bottomInvIndex];

        // Create new bullet
        if (!bottomInv.isAnimating) {
            bullets.addBullet('invader', bottomInv.type, bottomInv.x + (bottomInv.width / 2), bottomInv.y + bottomInv.height);
        }
    }
};

const createMothershipBullets = () => {
    // Create mothership bomb (Fired when mothership is above tank)
    const mothershipCenter = mothership.x + (mothership.width / 2);
    const tankCenter = tank.x + (tank.width / 2);

    if (mothershipCenter === tankCenter || (mothershipCenter < tankCenter + 4 && mothershipCenter > tankCenter - 4)) {
        // Create mothership bomb in bullets list if there isn't already one
        const mothershipBullets = bullets.bulletList.filter((bullet) => bullet.type === 'mothership');

        if (mothershipBullets.length === 0) {
            bullets.addBullet('mothership', null, mothershipCenter, mothership.y + mothership.height);
        }

        const t = 0;
    }
};

const render = () => {
    screen.clear();
    tank.render();
    invaders.render();
    bullets.render();
    mothership.render();
    score.render();
    lives.render();
};

const startGame = () => {
    // Remove intro screen
    introScreen.remove();
    // Remove game over screen
    gameoverScreen.remove();
    init();
    cities.render();
    gameStates.currentState = gameStates.runGame;
    gameLoop = requestAnimationFrame(loop);
}

// Controls different game states
const gameStates = {
    currentState: null,
    introScreen: function () {
        startButton.render();
        introScreen.render();

        document.getElementById('startButton').addEventListener('click', function () {
            this.classList.add('hide');
            startGame();
        });

        sounds.render(isMuted);
        soundToggle.addEventListener('click', () => {
            toggleMute();
        });
    },
    runGame: function (currentTime) {
        update(currentTime);
        render();
    },
    finishLevel: function () {
        // Implement short pause then re-setup invaders  and cities

        // Implement short pause

        // Setup invaders again - lower the y coord
        invader_group_y += INVADERS.rowHeight;

        // If invaders are lower than a certain level, reset the invader_group_y but speed up the invaders
        if (invader_group_y > INVADERS.maxY) {
            invader_group_y = INVADERS.y;
            currentLevel += 1;
            invaderMoveTime = INVADERS.moveTime - INVADERS.speedIncrease;
        } else {
            invaderMoveTime = INVADERS.moveTime - INVADERS.speedIncrease;
        }

        invaders.build(invader_group_y);

        invaders.direction = 'right';
        // Setup cities again
        cities.build();
        cities.render();

        // Reset tank
        tank.reset();

        // Run game again
        this.currentState = this.runGame;
    },
    loseLife: function (currentTime) {
        // Check to see if tank destroy animation has finished
        if (!tank.animationType) {
            this.currentState = this.runGame;
            tank.reset();
        }
        tank.render();
        // Reset the tank (to left hand side of screen)
        // Start the game again
    },
    gameOver: function () {
        cancelAnimationFrame(gameLoop);

        sleep(2000).then(() => {
            screen.clear();
            cities.clear();
            document.getElementById('startButton').classList.remove('hide');
            document.getElementById('gameoverScreen').classList.remove('hide');
            gameoverScreen.render(score.currentScore);
        })

    }
};
