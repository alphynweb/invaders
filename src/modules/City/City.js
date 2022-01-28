import { INVADER, TANK } from '../../config';
import Sprite from '../Sprite/Sprite';

const city = (x, canvasId) => {
    return {
        x,
        canvasId: canvasId,
        ctx: document.getElementById(canvasId).getContext('2d'),
        sprite: Sprite(),
        damage: function (collisionObj) {
            // collisionObj = Bullet type that collided with the city
            const topLeftX = collisionObj.x - this.x - (this.spriteInfo.damageWidth / 2);
            let topLeftY;
            switch (collisionObj.type) {
                case 'tank':
                    topLeftY = collisionObj.y - this.y - this.spriteInfo.damageHeight + TANK.bulletInfo.speed;
                    break;
                case 'invader':
                    // Establish what type of Invader fired the bullet
                    const invaderType = INVADER.find((inv) => inv.type === collisionObj.subType);
                    topLeftY = collisionObj.y - this.y + collisionObj.height - invaderType.bulletInfo.height;
                    break;
            }
            this.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.drawImage(this.sprite, this.spriteInfo.damageX, this.spriteInfo.damageY, this.spriteInfo.damageWidth, this.spriteInfo.damageHeight, topLeftX, topLeftY, this.spriteInfo.damageWidth, this.spriteInfo.damageHeight);
            this.ctx.globalCompositeOperation = 'source-over'; // Change back to default for re-rendering of cities
        },
        clear: function () {
            this.ctx.clearRect(0, 0, this.width, this.height);
        },
        render: function () {
            this.ctx.drawImage(this.sprite, this.spriteInfo.x, this.spriteInfo.y, this.width, this.height, 0, 0, this.width, this.height);
        }
    };
};

export default city;