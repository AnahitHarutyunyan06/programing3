let LivingCreauture = require("./LivingCreauture")

module.exports = class Rabbit extends LivingCreauture{
    constructor(x,y){
        super(x,y)
        this.energy = 40
        this.directions = [ ];
    }


    getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }



    chooseCell(char){
        this.getNewCoordinates()
       return super.chooseCell(char)
   }


     mul(){
         let emptyCell = this.chooseCell(0)
         let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

            if(newCell){
                 let newX = newCell[0]
                 let newY = newCell[1]

                 matrix[newY][newX]  = 2

                 let rabbit = new Rabbit(newX,newY)

                 rabbitArr.push(rabbit)


            }
     }


     eat(){
        let emptyCell = this.chooseCell(1)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

           if(newCell ){
               this.energy += 5
            let newX = newCell[0]
            let newY = newCell[1]

                   for(let i in carrotArr){
                            if(newX == carrotArr[i].x  && newY == carrotArr[i].y){
                                      carrotArr.splice(i,1)
                            }
                   }

                   matrix[newY][newX] = 2
                   matrix[this.y][this.x] = 0


                   this.x = newX
                   this.y = newY

                   if(this.energy > 30){
                        this.mul()
                   }

           }else{
               this.move()
           }
     }

     move(){
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

            if(newCell){
                let newX = newCell[0]
                let newY = newCell[1]

                matrix[newY][newX] = 2
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

           for(let i in rabbitArr){
                    if(this.x == rabbitArr[i].x && this.y == rabbitArr[i].y) {
                              rabbitArr.splice(i,1)
                    }
           }
     }
     

         

}