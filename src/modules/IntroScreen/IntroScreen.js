import { CONTROLSINFO, INVADER, MOTHERSHIP } from '../../config';
import Button from '../Button/Button';
import revealText from '../../utils/RevealText';
import sleep from '../../utils/Sleep';
import gameSprite from '../../assets/images/sprite.png';

const introScreen = () => {
    return {
        controlsInfo: document.getElementById('controlsInfo'),
        invadersInfo: document.getElementById('invadersInfo'),
        introScreen: document.getElementById('introScreen'),
        // startButtonContainer: document.getElementById('startButtonContainer'),
        remove() {
            this.introScreen.classList.add('hide');
        },
        renderIntroText() {
            const renderInvaderScores = async () => {
                let invaderImg;
                let invaderScoreText;

                for (let i = 0; i < INVADER.length; i++) {
                    invaderScoreText = "Score " + INVADER[i].score;

                    invaderImg = document.createElement('div');
                    invaderImg.classList.add('invader-image');
                    invaderImg.style.width = INVADER[i].width + 'px';
                    invaderImg.style.height = INVADER[i].height + 'px';
                    invaderImg.style.backgroundImage = 'url(' + gameSprite + ')';
                    invaderImg.style.backgroundRepeat = 'no-repeat';
                    invaderImg.style.backgroundPosition = -INVADER[i].spriteX + 'px ' + -INVADER[i].spriteY + 'px';

                    await renderInfoRow(invaderImg, invaderScoreText, this.invadersInfo);
                }
            };

            const renderMothershipScore = async () => {
                let mothershipImg;
                let mothershipScoreText;

                mothershipScoreText = "???";

                mothershipImg = document.createElement('div');
                mothershipImg.classList.add('invader-image');
                mothershipImg.style.width = MOTHERSHIP.width + 'px';
                mothershipImg.style.height = MOTHERSHIP.height + 'px';
                mothershipImg.style.backgroundImage = 'url(' + gameSprite + ')';
                mothershipImg.style.backgroundRepeat = 'no-repeat';
                mothershipImg.style.backgroundPosition = -MOTHERSHIP.spriteX + 'px ' + -MOTHERSHIP.spriteY + 'px';

                await renderInfoRow(mothershipImg, mothershipScoreText, this.invadersInfo);
            };

            const renderControls = async () => {
                let controlInfoControl;
                let controlInfoEl;
                let controlInfoText;

                for (let i = 0; i < CONTROLSINFO.length; i++) {
                    switch (CONTROLSINFO[i].controlIconType) {
                        case "charcode":
                            controlInfoControl = String.fromCharCode(CONTROLSINFO[i].controlIconValue);
                            break;
                        case "text":
                            controlInfoControl = CONTROLSINFO[i].controlIconValue;
                            break;
                        default:
                            break;
                    };

                    controlInfoEl = document.createElement('span');
                    controlInfoEl.innerHTML = controlInfoControl;

                    controlInfoText = CONTROLSINFO[i].controlText;

                    await renderInfoRow(controlInfoEl, controlInfoText, this.controlsInfo);
                }
            };

            const renderInfoRow = async (lhContent, rhContent, container) => {
                const infoRow = document.createElement('div');
                const infoRowLh = document.createElement('div');
                const infoRowRh = document.createElement('div');

                infoRow.classList.add('info-row');
                infoRowLh.classList.add('lh-column');
                infoRowRh.classList.add('rh-column');

                infoRowLh.appendChild(lhContent);
                infoRow.appendChild(infoRowLh);
                infoRow.appendChild(infoRowRh);

                container.appendChild(infoRow);

                await revealText(infoRowRh, rhContent)
                    .then(() => sleep(500));
            };

            // renderStartButton();

            renderInvaderScores()
                .then(() => renderMothershipScore())
                .then(() => sleep(1000))
                .then(() => renderControls());
        },
        render() {
            this.renderIntroText();
        }
    }
};

export default introScreen;