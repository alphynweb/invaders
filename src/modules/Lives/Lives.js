import { GAME_TEXT, LIVES, TANK } from '../../config';
import Ctx from '../Ctx/Ctx';
import Sprite from '../Sprite/Sprite';

const lives = () => {
    return {
        x: 600,
        y: GAME_TEXT.y,
        currentLives: LIVES.lives,
        ctx: Ctx(),
        font: GAME_TEXT.font,
        sprite: Sprite(),
        loseLife: function () {
            this.currentLives--;
        },
        render: function () {
            // this.ctx.fillStyle = 'white';
            // this.ctx.font = this.font;
            // this.ctx.fillText('LIVES', this.x, this.y);

            // Draw no of tanks remaining
            for (let i = 0; i < this.currentLives; i++) {
                const livesXCoord = this.x + (i * (LIVES.indicatorGap + TANK.width));
                this.ctx.drawImage(this.sprite, TANK.spriteInfo.x, TANK.spriteInfo.y, TANK.width, TANK.height, livesXCoord + 80, this.y - 32, TANK.width, TANK.height);
            }
        }
    };
};

export default lives;