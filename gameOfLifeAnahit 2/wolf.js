class Wolf extends LivingCreature{
    constructor(x, y) {
       super(x,y)
        this.energy = 10
        this.directions = []
    }


    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        this.getNewCoordinates();
        return super.chooseCell(char)
    }


    mul() {
        let emptyCell = this.chooseCell(0);
        let newCell = random(emptyCell)

        if (newCell && this.energy > 12) {
            let newX = newCell[0];
            let newY = newCell[1];

            matrix[newY][newX] = 6;
            let wolf = new Wolf(newX, newY);
            wolfArr.push(wolf);

            this.energy =25;
        }
    }


    eat() {
        let emptyCell = this.chooseCell(4);
        let newCell = random(emptyCell)
        if (newCell) {
            this.energy += 5;
            let newX = newCell[0];
            let newY = newCell[1];

            for (let i = 0; i < predatorArr.length; i++) {
                if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
                    predatorArr.splice(i, 1)
                    break;
                }
            }
            for (let i = 0; i < foxArr.length; i++) {
                if (foxArr[i].x == newX && foxArr[i].y == newY) {
                    foxArr.splice(i, 1)
                    break;
                }
            }


            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            if (this.energy > 12) {
                this.mul()
            }
        }



        else {
            this.move()
        }
    }


    move() {

        let emptyCell = this.chooseCell(0);
        let newCell = random(emptyCell)

        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;


            this.x = newX;
            this.y = newY;

            this.energy--

            if (this.energy < 0) {
                this.die()
            }
        }




    }

    die() {


        matrix[this.y][this.x] = 0;
        for (let i = 0; i < foxArr.length; i++) {
            if (foxArr[i].x == this.x && foxArr[i].y == this.y) {
                foxArr.splice(i, 1)
            }
        }
    }

}