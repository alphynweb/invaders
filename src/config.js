export const SCREEN = {
    width: 1046,
    height: 800
};

export const GAME_TEXT = {
    y: 40, // Height at which lives and score etc are rendered
    font: 'bold 20px arial',
    introScreenArrowFont: 'bold 40px arial'
};

export const CONTROLSINFO = [
    {
        controlIconType: 'charcode',
        controlIconValue: '8592',
        controlText: 'Move Tank Left'
    },
    {
        controlIconType: 'charcode',
        controlIconValue: '8594',
        controlText: 'Move Tank Right'
    },
    {
        controlIconType: 'text',
        controlIconValue: 'Space Bar',
        controlText: 'Fire'
    }
];

export const GAMEOVER_TEXT = [
    "GAME OVER",
    "YOU SCORED {score}",
    "PRESS START TO TRY AGAIN"
];

export const LIVES = {
    lives: 5, // No of initial lives
    indicatorGap: 10, // Space between lives at top of screen
    y: SCREEN.height - 10
};

export const TANK = {
    width: 52,
    height: 32,
    x: 0,
    y: SCREEN.height - 50,
    speed: 4,
    spriteInfo: {
        x: 0,
        y: 0,
        explosionX: 756,
        explosionY: 108,
        explosionWidth: 44,
        explosionHeight: 26
    },
    bulletInfo: {
        width: 6,
        height: 23,
        speed: 10,
        spriteX: 404,
        spriteY: 0
    }
};

export const CITY = {
    y: SCREEN.height - 180,
    width: 88,
    height: 64,
    no: 4,
    indent: 50, // Space between outer cities and edge of screen
    spriteInfo: {
        x: 52,
        y: 0,
        damageX: 52,
        damageY: 200,
        damageWidth: 20,
        damageHeight: 20
    }
};

export const INVADERS = {
    moveSpeed: 20, // Distance invaders move horizontally
    shiftDownSpeed: 30, // Distance invaders shift down by when they reach the edge of the screen
    y: 100,
    maxY: 300,
    columnWidth: 50,
    rowHeight: 50,
    columns: 11,
    columnGap: 5,
    rowGap: 10,
    moveTime: 1000, // Time between movement
    speedIncrease: 17,
    explosionFrames: 5
};

export const INVADER = [
    {
        type: 'invader1',
        width: 32,
        height: 32,
        spriteX: 140,
        spriteY: 0,
        spriteExplosionX: 756,
        spriteExplosionY: 0,
        spriteExplosionWidth: 44,
        spriteExplosionHeight: 26,
        noAnimationFrames: 2,
        explosionFrames: 5,
        score: 50,
        rows: [1, 2],
        bulletInfo: {
            width: 4,
            height: 10,
            speed: 8,
            spriteX: 420,
            spriteY: 0
        }
    },
    {
        type: 'invader2',
        width: 44,
        height: 32,
        spriteX: 172,
        spriteY: 0,
        spriteExplosionX: 756,
        spriteExplosionY: 27,
        spriteExplosionWidth: 44,
        spriteExplosionHeight: 26,
        noAnimationFrames: 2,
        explosionFrames: 5,
        score: 100,
        rows: [3, 4],
        bulletInfo: {
            width: 4,
            height: 10,
            speed: 6,
            spriteX: 440,
            spriteY: 0
        }
    },
    {
        type: 'invader3',
        width: 48,
        height: 32,
        spriteX: 216,
        spriteY: 0,
        spriteExplosionX: 756,
        spriteExplosionY: 54,
        spriteExplosionWidth: 44,
        spriteExplosionHeight: 26,
        noAnimationFrames: 2,
        explosionFrames: 5,
        score: 200,
        rows: [5],
        bulletInfo: {
            width: 4,
            height: 10,
            speed: 4,
            spriteX: 460,
            spriteY: 0
        }
    }
];

export const MOTHERSHIP = {
    x: -68,
    y: 60,
    width: 68,
    height: 27,
    speed: 2,
    spriteX: 332,
    spriteY: 0,
    spriteExplosionX: 756,
    spriteExplosionY: 81,
    spriteExplosionWidth: 44,
    spriteExplosionHeight: 26,
    noExplodingFrames: 100,
    bulletInfo: {
        width: 12,
        height: 26,
        speed: 5,
        spriteX: 517,
        spriteY: 0
    },
    animationFrames: [
        10,
        10,
        10,
        10,
        10,
        10
    ]
};

export const SOUNDS = {
    invader: {
        move: [
            {
                startTime: 2.6,
                stopTime: 2.7
            },
            {
                startTime: 3.7,
                stopTime: 3.8
            },
            {
                startTime: 4.8,
                stopTime: 4.9
            },
            {
                startTime: 5.9,
                stopTime: 6
            }
        ],
        fire: {

        },
        destroy: {
            startTime: 1.3,
            stopTime: 1.6
        }
    },
    tank: {
        fire: {
            startTime: 0,
            stopTime: 0.3
        },
        destroy: {
            startTime: 7.1,
            stopTime: 7.9
        }
    }
    ,
    mothership: {
        destroy: {
            startTime: 7.1,
            stopTime: 7.9
        }
    }
};
