var express =  require ('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs")


app.use(express.static("."));

app.get('/',function(req,res){
    res.redirect('index.html')
});

server.listen(3000,function(){
   console.log("server is run");
})


function matrixGenerator(matrixSize, carrot,rabbit,fox,wolf,bear,lion) {
    var matrix = []
    ////  matrix սարքելու հատված
    for (let i = 0; i < matrixSize; i++) {
            matrix.push([])
            for (let j = 0; j < matrixSize; j++) {
                    matrix[i].push(0)
            }
    }

    // 1 carrot
    for (let i = 0; i < carrot; i++) {
            let x = Math.floor(Math.random() * matrixSize)
            let y = Math.floor(Math.random() * matrixSize)
            matrix[y][x] = 1
    }
     //rabbit 2

     for (let i = 0; i < rabbit; i++) {
            let x = Math.floor(Math.random() * matrixSize)
            let y = Math.floor(Math.random() * matrixSize)
            matrix[y][x] = 2
    }
    //3 fox
            for (let i = 0; i < fox; i++) {
            let x = Math.floor(Math.random() * matrixSize)
            let y = Math.floor(Math.random() * matrixSize)
            matrix[y][x] = 3
    }
    //4 wolf
    for (let i = 0; i < wolf; i++) {
            let x = Math.floor(Math.random() * matrixSize)
            let y = Math.floor(Math.random() * matrixSize)
            matrix[y][x] = 4
    }
    //5 bear 

    for(let i = 0;i < bear;i ++){
            let x = Math.floor(Math.random()* matrixSize)
            let y = Math.floor(Math.random()* matrixSize)
            matrix[y][x] = 5
    }
    //6 lion 
    for(let i = 0;i < lion;i ++){
            let x = Math.floor(Math.random()* matrixSize)
            let y = Math.floor(Math.random()* matrixSize)
            matrix[y][x] = 6
    }

   
   
    return matrix
}

matrix = matrixGenerator(20, 10,16,4,8,6,9)


io.sockets.emit('send matrix',matrix)

 carrotArr = []
 rabbitArr = []
 foxArr = []
 wolfArr = []
 bearArr = []
 lionArr = []

Carrot = require("./carrot")
Rabbit = require("./rabbit")
Fox = require("./fox")
Wolf = require("./wolf")
Bear = require("./bear")
Lion = require("./lion")


function createObject(){
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 1) {
                        let carrot = new Carrot(x, y)

                        carrotArr.push(carrot)


                } else if(matrix[y][x] == 2){
                     let rabbit = new  Rabbit(x,y)
                    rabbitArr.push(rabbit)
                }else if(matrix[y][x] ==  3){
                     let fox = new Fox(x,y)
                     foxArr.push(fox)
                }else if(matrix[y][x]== 4){
                     let wf = new Wolf(x,y)
                       wolfArr.push(wf)
               } else if(matrix[y][x]== 5){
                     let br = new Bear(x,y)
                     bearArr.push(br)
                }else if(matrix[y][x] == 6){
                        let li = new Lion(x,y)
                        lionArr.push(li)
                }


        }
    }

    io.sockets.emit('send matrix',matrix)
}

function game (){
        for (let i in carrotArr) {
                carrotArr[i].mul()
                
        }
        for(let i in rabbitArr){
                rabbitArr[i].eat()
        }
         for(let i in foxArr){
                foxArr[i].eat()
        }
        
        for(let i in wolfArr){
                wolfArr[i].eat()
        }
         for(let i in bearArr){
                bearArr[i].eat()
        }

        for(let i in lionArr){
                lionArr[i].eat()
        }

        io.sockets.emit('send matrix',matrix)

}


setInterval(game,300)

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


function Kill() {
        carrotArr = [];
        rabbitArr = [];
        foxArr  = [];
        wolfArr = [];
        bearArr = [];
        lionArr  = [];
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 0;
            }
        }
        io.sockets.emit("send matrix", matrix);
    }

    function AddCarrot() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 1;
                var carrot = new Carrot(x, y);
                carrotArr.push(carrot);
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    function AddRabbit() {
        let count = 0;
        for (var i = 0; i < 50; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (count < 7) {
                if (i < 30) {
                    if (matrix[y][x] == 0) {
                        count++;
                        matrix[y][x] = 2;
                        var rabbit = new Rabbit(x, y);
                        rabbitArr.push(rabbit);
                    }
    
                } else if (i >= 30) {
                    if (matrix[y][x] == 0 || matrix[y][x] == 1) {
                        count++;
                        matrix[y][x] = 2;
                        var rabbit = new Rabbit(x, y);
                        rabbitArr.push(rabbit);
                    }
                }
            }
    
    
        }
    
        io.sockets.emit("send matrix", matrix);
    }
    function AddFox() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 3;
                var fox = new Fox(x, y);
                foxArr.push(fox);
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    function AddWolf() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 4;
                var wolf = new Wolf(x, y);
                wolfArr.push(wolf);
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    
    function AddBear() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 5;
                var bear = new Bear(x, y);
                bearArr.push(bear);
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    function AddLion() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 6;
                var lion = new Lion(x, y);
                lionArr.push(lion);
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    

io.on('connection', function (socket) {
        createObject();
        socket.on("spring", Spring);
        socket.on("summer", Summer);
        socket.on("autumn", Autumn);
        socket.on("winter", Winter);
        socket.on("addCarrot", AddCarrot);
        socket.on("addRabbit", AddRabbit);
        socket.on("killAll", Kill);
        socket.on("addFox",AddFox);
        socket.on("addWolf", AddWolf);
        socket.on("addBear", AddBear);
        socket.on("addLion", AddLion);
    })

var statistics = {}
setInterval(function(){
       statistics.carrot = carrotArr.length
       statistics.rabbit =  rabbitArr.length
       statistics.fox = foxArr.length
       statistics.wolf = wolfArr.length
       statistics.bear = bearArr.length
       statistics.lion = lionArr.length

       fs.writeFile("statistics.json",JSON.stringify(statistics),function(){
            console.log("statistics");
       })
     
},1000)