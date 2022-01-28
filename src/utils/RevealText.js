const revealText = (el, text, delay = 100) => {
    const textSplit = text.split('');

    let i = 0;
    let textString = "";

    return new Promise(resolve => {
        const splitInterval = setInterval(function () {
            el.innerHTML += textSplit[i];
            textString += textSplit[i];
            i++;
            if (i == textSplit.length) {
                clearInterval(splitInterval);
                resolve();
            }
        }, delay);
    });
};

export default revealText;