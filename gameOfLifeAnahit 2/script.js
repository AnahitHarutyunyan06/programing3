function matrixGenerator(matrixSize, grass,grassEater,predator, chut,fox,wolf) {
        var matrix = []
        ////  matrix սարքելու հատված
        for (let i = 0; i < matrixSize; i++) {
                matrix.push([])
                for (let j = 0; j < matrixSize; j++) {
                        matrix[i].push(0)
                }
        }

        // 1 grass
        for (let i = 0; i < grass; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 1
        }
         //GrassEater 2

         for (let i = 0; i < grassEater; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 2
        }
        //3 predator


        for (let i = 0; i < predator; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 3
        }
        //4 chut

        for (let i = 0; i < chut;i ++){
                let x = Math.floor(Math.random()* matrixSize)
                let y = Math.floor(Math.random()* matrixSize)
                matrix[y][x] = 4
        }
        //5 fox
        for(let i = 0;i < fox;i ++){
                let x = Math.floor(Math.random()* matrixSize)
                let y = Math.floor(Math.random()* matrixSize)
                matrix[y][x] = 5
        }
        // // 6
        for(let i = 0;i < wolf;i ++){
                let x = Math.floor(Math.random()* matrixSize)
                let y = Math.floor(Math.random()* matrixSize)
                matrix[y][x] = 6
        }

       
       
        return matrix
}

let matrix = matrixGenerator(20, 15,7,4,8,5)
let side = 30
///օբյեկտներ պահելու զանգվածներ
var grassArr = []
var grassEaterArr = []
var predatorArr = []
var chutArr = []
var foxArr = []
var wolfArr = []

function setup() {
        frameRate(15)
        createCanvas(matrix[0].length * side, matrix.length * side)
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x, y)

                                grassArr.push(grass)


                        } else if(matrix[y][x] == 2){
                             let grEat = new  GrassEater(x,y)
                             grassEaterArr.push(grEat)
                        }else if(matrix[y][x] ==  3){
                             let pre = new Predator(x,y)
                             predatorArr.push(pre)
                        }else if(matrix[y][x]== 4){
                             let chut = new Chut(x,y)
                             chutArr.push(chut)
                        }else if(matrix[y][x] == 5){
                                let fox = new Fox(x,y)
                                foxArr.push(fox)
                        }
                        else if(matrix[y][x] == 6){
                                let wolf = new Wolf(x,y)
                                wolfArr.push(wolf)
                        }


                }
        }

}


function draw() {

        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
    
                var tobot = side - side * 0.1
                textSize(tobot)
    
    
                if (matrix[y][x] == 1) {
                    fill("green")
                    rect(x * side, y * side, side, side)
                    text("🌾", x * side, y * side + tobot)
                } else if (matrix[y][x] == 2) {
                    fill("yellow")
                    rect(x * side, y * side, side, side)
                    text("🐮", x * side, y * side + tobot)
                } else if (matrix[y][x] == 0) {
                    fill("gray")
                    rect(x * side, y * side, side, side)
                } else if (matrix[y][x] == 3) {
                    fill("red")
                    rect(x * side, y * side, side, side)
                    text("🔴", x * side, y * side + tobot)
                }
                else if (matrix[y][x] == 4) {
                    fill("orange")
                    rect(x * side, y * side, side, side)
                    text("🐥", x * side, y * side + tobot)
                }
                else if (matrix[y][x] == 5) {
                    fill("#85929E")
                    rect(x * side, y * side, side, side)
                    text("🦊", x * side, y * side + tobot)
                } 
                else if (matrix[y][x] == 6) {
                        fill("white")
                        rect(x * side, y * side, side, side)
                        text("🐺", x * side, y * side + tobot)
                    } 

        }

}
    
                   


                for (let i in grassArr) {
                        grassArr[i].mul()
                }


                for(let i in grassEaterArr){
                        grassEaterArr[i].eat()
                }

             

                for(let i in predatorArr){
                        predatorArr[i].eat()
                }
               
                for(let i in chutArr){
                        chutArr[i].eat()
                }

                for(let i in foxArr){
                        foxArr[i].eat()
                }
                for(let i in wolfArr){
                        wolfArr[i].eat()

                }
}
