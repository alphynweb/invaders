import gameSprite from '../../assets/images/sprite.png';

const sprite = function() {
    let img = new Image();
    img.src = gameSprite;
    return img;
};

export default sprite;