let LivingCreature = require("./LivingCreature")
 module.exports = class GrassEater extends LivingCreature{
    constructor(x,y,){
        super(x,y, )
        this.energy = 10
       
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
         let newCell = emptyCell[Math.floor(Math.random()* emptyCell.length)]
            if(newCell && this.energy > 12) {
                 let newX = newCell[0]
                 let newY = newCell[1]

                 let grEat = new GrassEater(newX,newY)
                 matrix[newY][newX]  = 2
                 grassEaterArr.push(grEat)

                this.energy = 10
            }
     }


     eat(){
        let emptyCell = this.chooseCell(1)
        let newCell = emptyCell[Math.floor(Math.random()* emptyCell.length)]

           if(newCell ){
               this.energy += 5
            let newX = newCell[0]
            let newY = newCell[1]

                   for(let i in grassArr){
                            if(newX == grassArr[i].x  && newY == grassArr[i].y){
                                      grassArr.splice(i,1)
                            }
                   }

                   matrix[newY][newX] = 2
                   matrix[this.y][this.x] = 0


                   this.x = newX
                   this.y = newY

                   if(this.energy > 20){
                        this.mul()
                   }

           }else{
               this.move()
           }
     }

     move(){
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random()* emptyCell.length)]

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
         

           for(let i = 0; i < grassEaterArr.length; i++) {
                    if(this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                              grassEaterArr.splice(i,1)
                    }
           }
           matrix[this.y][this.x] = 0
     }
 }

