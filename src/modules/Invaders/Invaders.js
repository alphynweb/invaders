import { INVADER, INVADERS, SCREEN, SOUNDS } from '../../config';
import Invader from '../Invader/Invader';
import Sounds from '../Sounds/Sounds';

const invaders = () => {
    const moveSounds = SOUNDS.invader.move;

    return {
        invaderList: [],
        direction: 'right',
        shiftDown: false,
        moveSounds: [],
        currentMoveSoundIndex: 0,
        currentMoveSound: null,
        build: function (y) {

            // Build move sounds
            moveSounds.forEach((moveSound) => {
                // Create audio object for sound
                const newSound = Sounds();
                newSound.startTime = moveSound.startTime;
                newSound.stopTime = moveSound.stopTime;
                // Push audio object into moveSounds array
                this.moveSounds.push(newSound);
            });

            // Build rows
            let rowNo = 1;
            let build = true;

            while (build) {
                // Check if row number is in INVADERS info
                const invader_info = INVADER.find((inv) => inv.rows.includes(rowNo));
                if (invader_info != undefined) {
                    // Carry on   
                    for (let column = 0; column < INVADERS.columns; column++) {
                        let invader = Invader(rowNo, column + 1, y); // column + 1 to start them slightly to the right
                        const newInvader = Object.assign(invader, invader_info);
                        this.invaderList.push(newInvader);
                    }
                } else {
                    // Stop
                    build = false;
                }
                rowNo++;
            }
        },
        purge: function () {
            // Loop trough invaders and remove any where isActive = false
            this.invaderList.forEach((invader, index) => {
                if (!invader.isActive) {
                    this.remove(index);
                }
            });
        },
        remove: function (index) {
            this.invaderList.splice(index, 1);
        },
        move: function (isMuted) {
            this.currentMoveSound = this.moveSounds[this.currentMoveSoundIndex];
            this.currentMoveSound.play(isMuted);
            this.currentMoveSoundIndex++;

            if (this.currentMoveSoundIndex > this.moveSounds.length - 1) {
                this.currentMoveSoundIndex = 0;
            }

            // Check if invaders are touching right or left walls and reverse direction if they are
            const isRhWall = this.invaderList.find((invader) => invader.x + invader.width >= SCREEN.width - INVADERS.moveSpeed);
            const isLhWall = this.invaderList.find((invader) => invader.x <= 0);

            if (isRhWall) {
                if (this.direction === 'right') {
                    this.shiftDown = true;
                }
                this.direction = 'left';
            }
            if (isLhWall) {
                if (this.direction === 'left') {
                    this.shiftDown = true;
                }
                this.direction = 'right';
            }
            if (this.shiftDown) {
                this.invaderList.forEach((invader) => {
                    invader.move('down');
                });
                this.shiftDown = false;
            } else {
                this.invaderList.forEach((invader) => {
                    invader.move(this.direction);
                });
            }
            this.shiftDown = false;
        },
        render: function () {
            this.invaderList.forEach((invader) => {
                invader.render();
            });
        }
    };
};

export default invaders;