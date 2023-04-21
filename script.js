var socket = io()

var side = 30
///օբյեկտներ պահելու զանգվածներ


function setup() {
       
        createCanvas(20 * side, 20 * side)
        background("gray")
       

}
function nkarel(matrix ) {
        console.log(matrix);

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
    
                   


                // for (let i in grassArr) {
                //         grassArr[i].mul()
                // }


                // for(let i in grassEaterArr){
                //         grassEaterArr[i].eat()
                // }

             

                // for(let i in predatorArr){
                //         predatorArr[i].eat()
                // }
               
                // for(let i in chutArr){
                //         chutArr[i].eat()
                // }

                // for(let i in foxArr){
                //         foxArr[i].eat()
                // }
                // for(let i in wolfArr){
                //         wolfArr[i].eat()

                // }
}

socket.on("send message", nkarel)