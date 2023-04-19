
var board;
var score = 90;
var rows =4;
var columns =4;

window.onload = function(){
    document.getElementById("date").innerHTML =new Date().getFullYear();
    setGame();
}

function setGame(){
    // board = [
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0]
    // ]
    board = [
        [2, 2, 2, 2],
        [2, 2, 2, 0],
        [4, 4, 4, 16],
        [8, 8, 8, 16]
    ]

    for(let i=0;i<rows;i++){
        for(let j=0;j<columns;j++){
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            let num = board[i][j];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
}

function updateTile (tile , num){
    tile.innerText ="";
    tile.classList.value="";
    tile.classList.add("tile");
    if(num>0){
        tile.innerText = num;
        if(num<=1024){
            tile.classList.add("x"+num.toString());
        }else{
            tile.classList.add("x2048")
        }
    }
}

document.addEventListener("keyup",(e)=>{
    if(e.code == "ArrowLeft"){
        slideLeft();
    }
    if(e.code == "ArrowRight"){
        slideRight();
    }
    if(e.code == "ArrowUp"){
        slideUp();
    }
    if(e.code == "ArrowDown"){
        slideDown();
    }
})
function slideUp(){
    
}
function slideRight() {
    for(i=0;i<rows;i++){
        let row = board[i];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[i]=row;
        for(let j=0;j<columns;j++){
        let tile =document.getElementById(i.toString()+"-"+j.toString());
        let num=board[i][j];
        document.getElementById("score").innerText = score;
        updateTile(tile,num);
        }
    }
}

function slideLeft() {
    for(i=0;i<rows;i++){
        let row = board[i];
        row = slide(row);
        board[i]=row;
        for(let j=0;j<columns;j++){
        let tile =document.getElementById(i.toString()+"-"+j.toString());
        let num=board[i][j];
        document.getElementById("score").innerText = score;
        updateTile(tile,num);
        }
    }
}

function slide(row){
    row = filterZero(row);

    for(let i=0;i<row.length-1;i++){
        if(row[i] == row[i+1]){
            row[i] *= 2;
            row[i+1]=0;
            score += row[i];
        }
    }
    row = filterZero(row);
    while(row.length < columns){
        row.push(0);
    }

return row;
}

function filterZero(row){
    return row.filter(num => num!=0);
}