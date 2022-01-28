const inputHandler = () => {
    const inputHandler = {
        currentKeysPressed: [],
        init: function () {
            document.addEventListener('keydown', (event) => {
                event.preventDefault();
                var keyIndex = this.currentKeysPressed.findIndex((key) => {
                    return key === event.keyCode;
                });
                if (keyIndex === -1) {
                    this.currentKeysPressed.push(event.keyCode);
                }
            });
            document.addEventListener('keyup', (event) => {
                var keyIndex = this.currentKeysPressed.findIndex((key) => {
                    return key === event.keyCode;
                });
                this.currentKeysPressed.splice(keyIndex, 1);
            });
        }
    };

    inputHandler.init();
    return inputHandler;
};

export default inputHandler;
