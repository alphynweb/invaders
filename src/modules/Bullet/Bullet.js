import Ctx from '../Ctx/Ctx';
import Sprite from '../Sprite/Sprite';

const bullet = (x, y) => {
    return {
        x,
        y,
        width: 0,
        height: 0,
        direction: 'up',
        speed: 0,
        ctx: Ctx(),
        sprite: Sprite(),
        spriteX: 0,
        spriteY: 0,
        type: 'tank',
        subType: null, // To distinguish between different types of invader bullet
        move: function() {
            this.y = this.direction === 'up' ? this.y - this.speed : this.y + this.speed;
        },
        render: function() {
            this.ctx.drawImage(this.sprite, this.spriteX, this.spriteY, this.width, this.height, this.x, this.y, this.width, this.height);            
        }
    };
};

export default bullet;