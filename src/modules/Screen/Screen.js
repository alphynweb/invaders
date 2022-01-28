import * as config from '../../config';

const screen = () => {
    const screenCanvas = document.createElement('canvas');
    screenCanvas.id = "screenCanvas";
    screenCanvas.width = config.SCREEN.width;
    screenCanvas.height = config.SCREEN.height;
    
    return {
        screen: screenCanvas,
        width: config.SCREEN.width,
        height: config.SCREEN.height,
        ctx: screenCanvas.getContext('2d'),
        render() {
            const gameArea = document.getElementById('gameArea');
            gameArea.style.width = config.SCREEN.width + 'px';
            gameArea.style.position = 'relative';
            gameArea.appendChild(this.screen);
        },
        clear() {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
    };
};

export default screen;