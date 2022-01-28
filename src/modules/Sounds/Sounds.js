import { GAME_TEXT } from '../../config';
import gameSoundsOgg from '../../assets/audio/gamesounds.ogg';
import gameSoundsMp3 from '../../assets/audio/gamesounds.mp3';

const sounds = () => {
    return {
        x: 300,
        y: GAME_TEXT.y,
        soundSourceOgg: gameSoundsOgg,
        soundSrcMp3: gameSoundsMp3,
        startTime: null,
        stopTime: null,
        soundObject: document.createElement('audio'),
        soundText: "Off",
        soundToggle: document.getElementById('soundToggle'),

        play: function (isMuted) {
            let source = document.createElement('source');
            source.type = 'audio/ogg';
            source.src = gameSoundsOgg;
            this.soundObject.appendChild(source);

            source.src = gameSoundsMp3;
            source.type = 'audio/mp3';
            this.soundObject.appendChild(source);

            this.soundObject.muted = isMuted;
            this.soundObject.currentTime = this.startTime;
            this.soundObject.addEventListener('timeupdate', () => {
                if (this.soundObject.currentTime > this.stopTime) {
                    this.pause();
                }
            });
            this.soundObject.play();
        },
        pause: function () {
            this.soundObject.pause();
        },
        render: function (isMuted) {
            const soundOnOffIcon = isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';

            this.soundToggle.innerHTML = soundOnOffIcon;
        }
    };
};

export default sounds;