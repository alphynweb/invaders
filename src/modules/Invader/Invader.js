import { INVADERS, SOUNDS } from '../../config';
import Ctx from '../Ctx/Ctx';
import Sprite from '../Sprite/Sprite';
import Sounds from '../Sounds/Sounds';

const invader = (row, column, y) => {
    const destroySound = Sounds();
    destroySound.startTime = SOUNDS.invader.destroy.startTime;
    destroySound.stopTime = SOUNDS.invader.destroy.stopTime;

    return {
        x: (column * INVADERS.columnWidth) + (column * INVADERS.columnGap),
        y: (row * INVADERS.rowHeight) + (row * INVADERS.rowGap) + y,
        ctx: Ctx(),
        sprite: Sprite(),
        isActive: true, // Determines whether active in game (switch to false when animating etc)
        isExploding: false,
        animationFrame: 0,
        sound: null,
        move: function (direction) {
            if (direction !== 'down') {
                this.x += direction === 'right' ? INVADERS.moveSpeed : -INVADERS.moveSpeed;
            } else {
                this.y += INVADERS.shiftDownSpeed;
            }

            this.animationFrame++;

            if (this.animationFrame > this.noAnimationFrames - 1) {
                this.animationFrame = 0;
            }
        },
        destroy: function (isMuted) {
            // Set isAnimating frame to start animation
            this.isExploding = 0; // Explosion
            destroySound.play(isMuted);
        },
        render: function () {
            // Work out offest of sprite to centralise
            const xOffset = (INVADERS.columnWidth - this.width) / 2;
            const yOffset = (INVADERS.rowHeight - this.height) / 2;
            const xSpriteOffset = (INVADERS.columnWidth - this.spriteExplosionWidth) / 2;
            const ySpriteOffset = (INVADERS.rowHeight - this.spriteExplosionHeight) / 2;

            if (this.isExploding === false) {
                // Work out which position on sprite to show according to animation frame
                this.ctx.drawImage(this.sprite, this.spriteX, this.spriteY + (this.height * this.animationFrame), this.width, this.height, this.x + xOffset, this.y + yOffset, this.width, this.height);
            } else {
                // Render explosion
                this.ctx.drawImage(this.sprite, this.spriteExplosionX, this.spriteExplosionY, this.spriteExplosionWidth, this.spriteExplosionHeight, this.x + xSpriteOffset, this.y + ySpriteOffset, this.spriteExplosionWidth, this.spriteExplosionHeight);
                this.isExploding++;
                if (this.isExploding > this.explosionFrames) {
                    this.isExploding = false;
                    this.isActive = false;
                }
            }
        }
    };
};

export default invader;