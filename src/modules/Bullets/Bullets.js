import { INVADER, MOTHERSHIP, SCREEN, SOUNDS, TANK } from '../../config';
import Bullet from '../Bullet/Bullet';
import Sounds from '../Sounds/Sounds';

const bullets = () => {

    const shootSound = Sounds();
    shootSound.startTime = SOUNDS.tank.fire.startTime;
    shootSound.stopTime = SOUNDS.tank.fire.stopTime;

    return {
        bulletList: [],
        addBullet: function (bulletType, bulletSubType, x, y, isMuted) {

            let newBullet;

            switch (bulletType) {
                case 'tank':
                    shootSound.play(isMuted);

                    newBullet = Object.assign(Bullet(x, y), TANK.bulletInfo);

                    this.bulletList.push(newBullet);
                    break;

                case 'invader':
                    const invaderInfo = INVADER.find((inv) => inv.type === bulletSubType);
                    const bulletInfo = invaderInfo.bulletInfo;

                    newBullet = Object.assign(Bullet(x, y), bulletInfo);

                    newBullet.type = 'invader';
                    newBullet.subType = invaderInfo.type;
                    newBullet.direction = 'down';

                    this.bulletList.push(newBullet);
                    break;

                case 'mothership':
                    // TODO
                    newBullet = Object.assign(Bullet(x, y), MOTHERSHIP.bulletInfo);
                    newBullet.type = 'mothership';
                    newBullet.direction = 'down';
                    this.bulletList.push(newBullet);
                    break;
            }
        },
        remove: function (index) {
            this.bulletList.splice(index, 1);
        },
        reset: function () {
            this.bulletList = [];
        },
        move: function () {
            this.bulletList.forEach((bullet, index) => {
                // If tank bullet reaches top of screen, remove it from bulletList
                if (bullet.type === 'tank' && bullet.y < 0) {
                    this.remove(index);
                }
                // If invader bullet reaches bottom of screen, remove it from bulletList
                if ((bullet.type === 'invader' || bullet.type === 'mothership') && bullet.y > SCREEN.height) {
                    this.remove(index);
                }
                bullet.move();
            });
        },
        render: function () {
            this.bulletList.forEach((bullet) => {
                bullet.render();
            });
        }
    };
};

export default bullets;