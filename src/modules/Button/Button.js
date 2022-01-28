import Ctx from '../Ctx/Ctx';

const button = (x, y, width, height, text, color = '#fff', id, cssClass, container) => {
    return {
        x,
        y,
        width,
        height,
        text,
        color,
        id,
        cssClass,
        ctx: Ctx(),
        render: function () {
            const btn = document.createElement('button');
            btn.id = this.id;
            btn.classList.add(this.cssClass);
            btn.innerHTML = text;
            btn.style.width = this.width;
            btn.style.height = this.height;
            container.appendChild(btn);
        }
    };
};

export default button;