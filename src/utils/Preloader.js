// First parameter = array of files, second parameter = filetypes (audio or graphics)
const preloader = (files, filetypes) => {

    return {
        preloadFiles: function () {
            return new Promise((resolve, reject) => {
                let filesLoaded = 0;

                switch (filetypes) {
                    case "image":
                        files.forEach(file => {
                            preloadImage(file);
                        });
                        break;
                    case "sound":
                        files.forEach(file => {
                            preloadAudio(file);
                        });
                        break;
                    default:
                        break;
                }


                function preloadAudio(file) {
                    const audio = new Audio();
                    audio.src = file;
                    audio.oncanplaythrough = () => {
                        loadedFiles();
                    };
                    audio.onerror = () => {
                        reject("There was an error loading the audio file" + file);
                    };
                }

                function preloadImage(file) {
                    const img = new Image();
                    img.src = file;
                    img.onload = () => {
                        loadedFiles();
                    };
                    img.onerror = () => {
                        reject("There was an error loading the image" + file);
                    };
                }

                function loadedFiles() {
                    filesLoaded++;

                    if (filesLoaded === files.length) {
                        resolve();
                    }
                }
            })
        }
    }
};

export default preloader;