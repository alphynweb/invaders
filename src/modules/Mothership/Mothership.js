import { SOUNDS } from '../../config';
import Ctx from '../Ctx/Ctx';
import Sprite from '../Sprite/Sprite';
import Sounds from '../Sounds/Sounds';


const mothership = () => {
    const destroySound = Sounds();
    destroySound.startTime = SOUNDS.mothership.destroy.startTime;
    destroySound.stopTime = SOUNDS.mothership.destroy.stopTime;

    return {
        ctx: Ctx(),
        sprite: Sprite(),
        isExploding: false,
        currentAnimationFrame: 0, // Current animation frame from animationframes array
        animationFrameNo: 0, // Current frame count
        isActive: false,
        score: Math.ceil(Math.random() * 10) * 100,
        move: function () {
            this.x += this.speed;
        },
        reset: function () {
            this.x = -this.width;
            this.isActive = true;
            this.score = Math.ceil(Math.random() * 10) * 100;
        },
        remove: function () {
            this.isActive = false;
        },
        destroy: function (isMuted) {
            destroySound.play(isMuted);
            // Set isAnimating frame to start animation
            this.isExploding = 0;
        },
        purge: function () {
            if (!this.isActive) {
                this.remove();
            }
        },
        render: function () {
            // Centralise explosion sprite
            const xSpriteOffset = (this.width - this.spriteExplosionWidth) / 2;
            const ySpriteOffset = (this.height - this.spriteExplosionHeight) / 2;

            // Centralise explosion score text 
            const scoreText = this.score;
            const scoreTextWidth = this.ctx.measureText(scoreText).width;
            const scoreXOffset = (this.width - scoreTextWidth) / 2;
            const scoreYOffset = 20;

            if (this.isActive) {
                if (this.isExploding === false) {
                    this.animationFrameNo++;

                    if (this.animationFrameNo > this.animationFrames[this.currentAnimationFrame]) {
                        this.animationFrameNo = 0;
                        this.currentAnimationFrame++;
                        if (this.currentAnimationFrame > this.animationFrames.length - 1) {
                            this.currentAnimationFrame = 0;
                        }
                    }

                    this.ctx.drawImage(this.sprite, this.spriteX, this.spriteY + (this.height * this.currentAnimationFrame), this.width, this.height, this.x, this.y, this.width, this.height);
                } else {
                    // Exploision
                    this.ctx.drawImage(this.sprite, this.spriteExplosionX, this.spriteExplosionY, this.spriteExplosionWidth, this.spriteExplosionHeight, this.x + xSpriteOffset, this.y + ySpriteOffset, this.spriteExplosionWidth, this.spriteExplosionHeight);
                    // Score

                    this.ctx.fillText(this.score, this.x + scoreXOffset, this.y + scoreYOffset);
                    this.isExploding++;
                    if (this.isExploding > this.noExplodingFrames) {
                        this.isExploding = false;
                        this.isActive = false;
                    }
                }
            }
        }
    };
};

export default mothership;
