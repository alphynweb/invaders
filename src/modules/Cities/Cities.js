import { CITY, SCREEN } from '../../config';
import City from '../City/City';

const cities = () => {
    return {
        cityList: [],
        build: function () {
            this.cityList = [];
            const cityArea = SCREEN.width - (CITY.indent * 2); // Horizontal area cities take up
            const cityGap = (cityArea - (CITY.no * CITY.width)) / (CITY.no - 1);

            for (let i = 0; i < CITY.no; i++) {

                const gameArea = document.getElementById('gameArea');

                // Work out x coord for city based on no of cities and city gap
                const cityX = (i * CITY.width) + (i * cityGap) + CITY.indent;

                // Build a seperate canvas for the city
                const cityCanvas = document.createElement('canvas');
                cityCanvas.id = 'cityCanvas' + i;
                cityCanvas.width = CITY.width;
                cityCanvas.height = CITY.height;
                cityCanvas.style.position = "absolute";
                cityCanvas.style.top = (CITY.y) + "px";
                cityCanvas.style.left = cityX + "px";
                cityCanvas.style.zIndex = "999";

                gameArea.appendChild(cityCanvas);

                const newCity = Object.assign(City(cityX, cityCanvas.id), CITY);

                this.cityList.push(newCity);
            }
        },
        clear: function () {
            this.cityList.forEach((city) => {
                city.clear();
            });
        },
        render: function () {
            this.cityList.forEach((city) => {
                city.render();
            });
        }
    };
};

export default cities;