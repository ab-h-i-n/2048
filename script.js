
//key
var board;
var score = 90;
var rows =4;
var columns =4;
var reset = document.getElementById("reset");

window.onload = function(){
    document.getElementById("date").innerHTML =new Date().getFullYear();
    setGame();
}

reset.addEventListener("click",()=>{
    window.location.reload();
});

function setGame(){
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
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
    setTwo();
    setTwo();
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
    if(checkWin()){
        alert("You Win!");
      }
}

document.addEventListener("keyup",(e)=>{
    if(e.code == "ArrowLeft"){
        slideLeft();
        setTwo();
    }
    else if(e.code == "ArrowRight"){
        slideRight();
        setTwo();
    }
    else if(e.code == "ArrowUp"){
        slideUp();
        setTwo();
    }
    else if(e.code == "ArrowDown"){
        slideDown();
        setTwo();
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
function hasEmptyTile(){
    for(let i=0;i<rows;i++){
        for(let j=0;j<columns;j++){
            if(board[i][j] == 0){
                return true;
            }
        }
    }
return false;
}

function setTwo(){

    if(!hasEmptyTile()){
        return;
    }

    let found = false;
    while(!found){
        let r =Math.floor(Math.random() * rows);
        let c =Math.floor(Math.random() * columns);

        if(board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true; 
        }
    }
}

function checkWin() {
    for(let i=0;i<rows;i++){
      for(let j=0;j<columns;j++){
        if(board[i][j] == 2048){
          return true;
        }
      }
    }
    return false;
  }
  
// Add touch event listeners
var touchStartX, touchStartY, touchEndX, touchEndY;
document.addEventListener("touchstart", function(event) {
    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;
}, false);
document.addEventListener("touchend", function(event) {
    touchEndX = event.changedTouches[0].clientX;
    touchEndY = event.changedTouches[0].clientY;
    handleSwipe();
}, false);

function handleSwipe() {
var swipeThreshold = 50; // minimum distance for a swipe
var swipeDirection = "";

var deltaX = touchEndX - touchStartX;
var deltaY = touchEndY - touchStartY;
if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > swipeThreshold) {
        swipeDirection = "right";
    } else if (deltaX < -swipeThreshold) {
        swipeDirection = "left";
    }
} else {
    if (deltaY > swipeThreshold) {
        swipeDirection = "down";
    } else if (deltaY < -swipeThreshold) {
        swipeDirection = "up";
    }
}

// Call the corresponding function based on the direction of the swipe
if (swipeDirection === "right") {
    slideRight();
    setTwo();
} else if (swipeDirection === "left") {
    slideLeft();
    setTwo();
} else if (swipeDirection === "down") {
    slideDown();
    setTwo();
} else if (swipeDirection === "up") {
    slideUp();
    setTwo();
}
}