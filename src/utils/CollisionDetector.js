const collisionDetector = (obj1, obj2) => {
    return {
        obj1,
        obj2,
        obj1Side: null,
        obj2Side: null,
        sidesCollided: null,

        obj1Top: obj1.y,
        obj1Bottom: obj1.y + obj1.height,
        obj1Right: obj1.x + obj1.width,
        obj1Left: obj1.x,

        obj2Top: obj2.y,
        obj2Bottom: obj2.y + obj2.height,
        obj2Right: obj2.x + obj2.width,
        obj2Left: obj2.x,

        collisionInfo: function () {
            const didCollide = this.obj1.x < this.obj2.x + this.obj2.width && this.obj1.x + this.obj1.width > this.obj2.x && this.obj1.y < this.obj2.y + this.obj2.height && this.obj1.y + this.obj1.height > this.obj2.y;
            let collidingSides = [];

            if (didCollide) {
                // Work out which sides are closest (which sides are touching)
                // Distance between obj1 right and obj2 left
                const obj1RightObj2Left = (this.obj2.x) - (this.obj1.x + this.obj1.width);
                // Distance betwwen obj1 left and obj2 right
                const obj1LeftObj2Right = (this.obj1.x) - (this.obj2.x + this.obj2.width);
                // Distance between obj1 top and obj2 bottom
                const obj1TopObj2Bottom = (this.obj2.y + this.obj2.height) - (this.obj1.y);
                // Distance between obj1 bottom and obj2 top
                const obj1BottomObj2Top = (this.obj1.y + this.obj1.height) - (this.obj2.y);

                collidingSides.push(
                    // Convert negative values to positive ones
                    {
                        "sides": "obj1Right", "distance": (obj1RightObj2Left < 0) ? obj1RightObj2Left * -1 : obj1RightObj2Left
                    },
                    {
                        "sides": "obj1Left", "distance": (obj1LeftObj2Right < 0) ? obj1LeftObj2Right * -1 : obj1LeftObj2Right
                    },
                    {
                        "sides": "obj1Top", "distance": (obj1TopObj2Bottom < 0) ? obj1TopObj2Bottom * -1 : obj1TopObj2Bottom
                    },
                    {
                        "sides": "obj1Bottom", "distance": (obj1BottomObj2Top < 0) ? obj1BottomObj2Top * -1 : obj1BottomObj2Top
                    }
                );

                collidingSides.sort(function (a, b) {
                    return a.distance - b.distance;
                });
            }

            let collisionInfo = {
                didCollide: didCollide,
                collidingSides: collidingSides[0]
            };
            return collisionInfo;
        }
    }
};

export default collisionDetector;