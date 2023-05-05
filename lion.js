let LivingCreauture = require("./LivingCreauture")

module.exports = class Lion extends LivingCreauture {
    constructor(x, y) {
       super(x,y)
        this.energy = 20
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
        this.getNewCoordinates()
       return super.chooseCell(char)
    }


    mul() {
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 6

            let pre = new Lion(newX, newY)

            lionArr.push(pre)


        }
    }


    eat() {
        let emptyCell = this.chooseCell(4)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell) {
            this.energy += 10
            let newX = newCell[0]
            let newY = newCell[1]

            
            for (let i in bearArr) {
                if (newX == bearArr[i].x && newY == bearArr[i].y) {
                    bearArr.splice(i, 1)
                }
            }


            matrix[newY][newX] =6
            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY

            if (this.energy > 30) {
                this.mul()
            }

        } else {
            this.move()
        }
    }


    move(){
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

            if(newCell){
                let newX = newCell[0]
                let newY = newCell[1]

                matrix[newY][newX] = 6
                matrix[this.y][this.x] = 0
                
                this.x = newX
                this.y = newY

                this.energy--

                if(this.energy < 0){
                    this.die ()
                }
            }
     }



     die(){
        matrix[this.y][this.x] = 0

          for(let i in lionArr){
                   if(this.x == lionArr[i].x && this.y == lionArr[i].y) {
                             lionArr.splice(i,1)
                   }
          }
    }


}