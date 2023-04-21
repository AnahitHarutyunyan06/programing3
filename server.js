var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");


app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000, function(){
    console.log("server is run");

});


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

matrix = matrixGenerator(20, 15,7,4,8,5,8)

io.sockets.emit("send message", matrix)

 grassArr = []
 grassEaterArr = []
 predatorArr = []
 chutArr = []
 foxArr = []
 wolfArr = []

 Grass = require("./grass")
 GrassEater = require ("./grassEater")
 Predator = require ("./predator")
 Chut = require ("./chut")
 Fox = require ("./fox")
 Wolf = require ("./wolf")

 
 function createObject(){
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
    io.sockets.emit("send message", matrix)
 }

//