var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");


app.use(express.static("."));

app.get('/', function (req, res) {
        res.redirect('index.html');
});

server.listen(3000, function () {
        console.log("server is run");

});


function matrixGenerator(matrixSize, grass, grassEater, predator, chut, fox, wolf) {
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

        for (let i = 0; i < chut; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 4
        }
        //5 fox
        for (let i = 0; i < fox; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 5
        }
        // // 6
        for (let i = 0; i < wolf; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 6
        }



        return matrix
}

matrix = matrixGenerator(20, 15, 7, 4, 8, 5, 8)

io.sockets.emit("send matrix", matrix)

grassArr = []
grassEaterArr = []
predatorArr = []
chutArr = []
foxArr = []
wolfArr = []

Grass = require("./grass")
grassEater = require("./grassEater")
Predator = require("./predator")
Chut = require("./chut")
Fox = require("./fox")
Wolf = require("./wolf")


function createObject() {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x, y)

                                grassArr.push(grass)


                        } else if (matrix[y][x] == 2) {
                                let grEat = new grassEater(x, y)
                                grassEaterArr.push(grEat)
                        } else if (matrix[y][x] == 3) {
                                let pre = new Predator(x, y)
                                predatorArr.push(pre)
                        } else if (matrix[y][x] == 4) {
                                let chut = new Chut(x, y)
                                chutArr.push(chut)
                        } else if (matrix[y][x] == 5) {
                                let fox = new Fox(x, y)
                                foxArr.push(fox)
                        }
                        else if (matrix[y][x] == 6) {
                                let wolf = new Wolf(x, y)
                                wolfArr.push(wolf)
                        }


                }
        }
        io.sockets.emit("send matrix", matrix)

}
function game() {
        for (let i in grassArr) {
                grassArr[i].mul()
        }

        for (let i in grassEaterArr) {
                grassEaterArr[i].eat()
        }

        for (let i in predatorArr) {
                predatorArr[i].eat()
        }

        for (let i in chutArr) {
                console.log(chutArr);
                chutArr[i].eat()
        }

        for (let i in foxArr) {
                foxArr[i].eat()
        }
        for (let i in wolfArr) {
                wolfArr[i].eat()
        }

        io.sockets.emit("send matrix", matrix)

}

setInterval(game, 600)
var weath;

function Winter() {
    weath = "winter";
    io.sockets.emit('Winter', weath);
}

function Summer() {
    weath = "summer";
    io.sockets.emit('Summer', weath);
}

function Spring() {
    weath = "spring";
    io.sockets.emit('Spring', weath);
}
function Autumn() {
    weath = "autumn";
    io.sockets.emit('Autumn', weath);
}

function KillAll() {
        grassArr = [];
        grassEaterArr = [];
        predatorArr = [];
        chutArr = [];
        foxArr = [];
        wolfArr = [];
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 0;
            }
        }
}
function AddGrass() {
        for(let i = 0; i < 5 ; i++){
                let x = Math.floor(Math.random() * matrix.length)
                let y = Math.floor(Math.random() * matrix.length)

                matrix[y][x] = 1

                var gr = new Grass(x,y)
                grassArr.push(gr)


        }
}
function AddGrassEater(){
        for(let i = 0; i < 5 ; i++){
                let x = Math.floor(Math.random() * matrix.length)
                let y = Math.floor(Math.random() * matrix.length)

                matrix[y][x] = 2

                var grEat = new grassEater(x,y)
                grassEaterArr.push(grEat)

        }
}

function AddChut(){
        for(let i = 0; i < 6 ; i++){
                let x = Math.floor(Math.random() * matrix.length)
                let y = Math.floor(Math.random() * matrix.length)

                matrix[y][x] = 4

                var chut = new Chut(x,y)
                chutArr.push(chut)

        }
}
function AddWolf(){
        for(let i = 0; i < 7 ; i++){
                let x = Math.floor(Math.random() * matrix.length)
                let y = Math.floor(Math.random() * matrix.length)

                matrix[y][x] = 6

                var wolf = new Wolf(x,y)
                wolfArr.push(wolf)

        }
}




io.on('connection', function (socket) {
        createObject();
        socket.on("Spring", Spring);
        socket.on("Summer", Summer);
        socket.on("Autumn", Autumn);
        socket.on("Winter", Winter);
        socket.on("KillAll",KillAll)
        socket.on("addGrass",AddGrass )
        socket.on("addGrassEater",AddGrassEater)
        socket.on("addChut",AddChut)
        socket.on("addWolf",AddWolf) 


})


var statistics = {}

setInterval(function () {
        statistics.grass = grassArr.length
        statistics.grassEater = grassEaterArr.length
        statistics.predator = predatorArr.length
        statistics.chut = chutArr.length
        statistics.fox = foxArr.length
        statistics.wolf = wolfArr.length


        fs.writeFile("statistics.json",JSON.stringify(statistics),function(){
                console.log("statistics");
        })
},300)
