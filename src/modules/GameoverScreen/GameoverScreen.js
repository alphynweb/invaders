import { GAMEOVER_TEXT } from '../../config';
import Button from '../Button/Button';
import revealText from '../../utils/RevealText';
import sleep from '../../utils/Sleep';

const gameoverScreen = () => {
    return {
        gameoverScreen: document.getElementById('gameoverScreen'),
        clear() {
            this.gameoverScreen.innerHTML = "";
        },
        remove() {
            this.gameoverScreen.classList.add('hide');
        },
        renderGameOverText(currentScore) {
            const renderScore = async () => {
                for (let i = 0; i < GAMEOVER_TEXT.length; i++) {
                    await renderRow(GAMEOVER_TEXT[i].replace('{score}', currentScore), this.gameoverScreen);
                };
            };

            const renderRow = async (text, container) => {
                const row = document.createElement('div');

                row.classList.add('game-over-row');

                container.appendChild(row);

                await revealText(row, text)
                    .then(() => sleep(500));
            };

            renderScore();
        },
        renderStartButton() {
            const startButton = Button(100, 200, 200, 60, 'START', '#0f0', 'startButton', 'button', this.startButtonContainer);
            startButton.render();
        },
        render(currentScore) {
            this.clear();
            this.renderGameOverText(currentScore);
        }
    }
};

export default gameoverScreen;