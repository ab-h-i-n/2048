
//swipe
var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;

var gesuredZone = document.getElementById('board');

gesuredZone.addEventListener('touchstart', function(event) {
    touchstartX = event.screenX;
    touchstartY = event.screenY;
}, false);

gesuredZone.addEventListener('touchend', function(event) {
    touchendX = event.screenX;
    touchendY = event.screenY;
    handleGesure();
}, false); 

function handleGesure() {
    var swiped = 'swiped: ';
    if (touchendX < touchstartX) {
        alert(swiped + 'left!');
    }
    if (touchendX > touchstartX) {
        alert(swiped + 'right!');
    }
    if (touchendY < touchstartY) {
        alert(swiped + 'down!');
    }
    if (touchendY > touchstartY) {
        alert(swiped + 'left!');
    }
    if (touchendY == touchstartY) {
        alert('tap!');
    }
}
//key
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
    else if(e.code == "ArrowRight"){
        slideRight();
    }
    else if(e.code == "ArrowUp"){
        slideUp();
    }
    else if(e.code == "ArrowDown"){
        slideDown();
    }
})
function slideDown(){
    for(let i=0;i<columns;i++)
    {
        let row = [board[0][i],board[1][i],board[2][i],board[3][i]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for(let j=0;j<rows;j++){
            board[j][i]=row[j];
            let tile = document.getElementById(j.toString()+"-"+i.toString());
            let num = board[j][i];
            document.getElementById("score").innerText = score;
            updateTile(tile,num);
        }
    }
}
function slideUp(){
    for(let i=0;i<columns;i++)
    {
        let row = [board[0][i],board[1][i],board[2][i],board[3][i]];
        row = slide(row);
        for(let j=0;j<rows;j++){
            board[j][i]=row[j];
            let tile = document.getElementById(j.toString()+"-"+i.toString());
            let num = board[j][i];
            document.getElementById("score").innerText = score;
            updateTile(tile,num);
        }
    }
}
function slideRight() {
    for(let i=0;i<rows;i++){
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

