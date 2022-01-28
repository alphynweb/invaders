const background = () => {
    return {
        backgroundContainer: document.getElementById('gameArea'),
        render: function(image) {
            this.backgroundContainer.style.backgroundImage = 'url(' + image + ')';
            this.backgroundContainer.style.backgroundRepeat = 'no-repeat';
            this.backgroundContainer.style.backgroundPositionX = '0';
            this.backgroundContainer.style.backgroundPositionY = '-700px';
        }
    }
};

export default background;