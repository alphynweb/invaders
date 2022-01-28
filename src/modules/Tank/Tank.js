import { SCREEN, SOUNDS, TANK  } from '../../config';
import Ctx from '../Ctx/Ctx';
import Sprite from '../Sprite/Sprite';
import Sounds from '../Sounds/Sounds';

const tank = () => {
    const explodeSound = Sounds();
    explodeSound.startTime = SOUNDS.tank.destroy.startTime;
    explodeSound.stopTime = SOUNDS.tank.destroy.stopTime;
;
    return {
        ctx: Ctx(),
        sprite: Sprite(),
        animationFrame: 0,
        animationType: null,
        destroyAnimationFrames: 100,
        shootAnimationFrames: 10,
        move: function (currentKeysPressed) {
            const isLeftKey = currentKeysPressed.findIndex((key) => {
                return key === 37;
            });
            const isRightKey = currentKeysPressed.findIndex((key) => {
                return key === 39;
            });
            if (isLeftKey > -1) {
                if (this.x > 0) {
                    this.x -= this.speed;
                }
            }
            if (isRightKey > -1) {
                if (this.x < SCREEN.width - this.width) {
                    this.x += this.speed;
                }
            }
        },
        destroy: function (isMuted) {
            // Set isAnimating frame to start animation
            explodeSound.play(isMuted);
            this.animationFrame = 1;
            this.animationType = 'destroy';
        },
        reset: function () {
            this.x = TANK.x;
            this.animationFrame = 0;
            this.animationType = null;
        },
        render: function () {
            // Centralise explosion sprite
            const xSpriteOffset = (this.width - this.spriteInfo.explosionWidth) / 2;
            const ySpriteOffset = (this.height - this.spriteInfo.explosionHeight) / 2;

            if (this.animationFrame === 0) {
                this.ctx.drawImage(this.sprite, this.spriteInfo.x, this.spriteInfo.y, this.width, this.height, this.x, this.y, this.width, this.height);
            } else if (this.animationType) {
                switch (this.animationType) {
                    case 'destroy':
                        this.ctx.drawImage(this.sprite, this.spriteInfo.explosionX, this.spriteInfo.explosionY, this.spriteInfo.explosionWidth, this.spriteInfo.explosionHeight, this.x + xSpriteOffset, this.y + ySpriteOffset, this.spriteInfo.explosionWidth, this.spriteInfo.explosionHeight);
                        this.animationFrame++;
                        if (this.animationFrame > this.destroyAnimationFrames) {
                            this.animationFrame = 0;
                            this.animationType = null;
                        }
                        break;
                    case 'shoot':
                        this.ctx.drawImage(this.sprite, 0, this.height, this.width, this.height, this.x, this.y, this.width, this.height);
                        this.animationFrame++;
                        if (this.animationFrame > this.shootAnimationFrames) {
                            this.animationFrame = 0;
                            this.animationType = null;
                        }
                        break;
                }
            }
        }
    };
};

export default tank;