var player = true;
var mat = [];
var gamePlaying=true;
for(var i = 0; i<3; i++){
    mat.push([0,0,0]);
}

// Once content is loaded- function runs.
document.addEventListener("DOMContentLoaded", function() {
    var arrtd = document.getElementsByTagName('td');
    for(var i = 0; i < arrtd.length; i++){
        arrtd[i].addEventListener("mouseover",handleHover);
        arrtd[i].addEventListener("mouseleave",handleLeave);
        arrtd[i].addEventListener("click", handleClick);
    }
});

// Sets the td to X or O when hover. Decorative.
function handleHover(e){
    var td = e.target;
    if( mat[td.id[0]] [td.id[1]] === 0){
        td.innerText = player ? "X" : "O";
    }
}
function handleLeave(e){
    var td = e.target;
    if(mat[td.id[0]] [td.id[1]] === 0){
        td.innerText = "";
    }
}


// Sets X or O, depends on the player.
function handleClick(e){
    var td = e.target;
    var row = parseInt(td.id[0]);
    var col = parseInt(td.id[1]);
    if (mat[row][col] === 0)
    {
        var val = player ? 'X' : 'O';
        player = !player;
        td.innerText = val;
        mat[row][col]=val;
        var arrWin = winCheck(mat, row, col);
        if(arrWin){
            var arrtd = [];
            for(var i=0; i<arrWin.length; i++){
                arrtd.push(document.getElementById(arrWin[i].join('')));
            }
            handleWin(player, arrtd);
        }
    }
}

    // Check if there's a win
function winCheck(mat, row, col){
    var condition = mat[row][col];
    var arrWin = [];
    // Row or col filled - player Won
    if(condition === mat[row][(col+1)%3] && condition === mat[row][(col+2)%3]){
        return [[row, col], [row, (col+1)%3], [row, (col+2)%3]];
    }

    if(condition === mat[(row+1)%3][col] && condition === mat[(row+2)%3][col]){
        return [[row, col], [(row+1)%3, col], [(row+2)%3, col]];
    }
    // check diagonals
    // Left Diagonal - \
    if(row === col && (mat[0][0] === mat[1][1] && mat[0][0] === mat[2][2])){
        return [[0, 0], [1, 1], [2, 2]];        
    }
    // Right Diagonal - /
    if(row + col === 2 && (mat[2][0] === mat[1][1] &&
        mat[1][1] === mat[0][2])){
        return [[0, 2], [1, 1], [2, 0]];        
    }
    return false;
}

function handleWin(player, winTd){
    if(player){
        document.getElementsByClassName('p2')[0].innerText = "Player two wins! Ko madliki!"
    } else {
        document.getElementsByClassName('p1')[0].innerText = "Player one wins! Ko madliki!"  
    }
    var arrtd = document.getElementsByTagName('td');
    for(var i=0; i<winTd.length; i++){
        winTd[i].classList.add("win");  
        winTd[i].style.pointerEvents = "none";
    }
    for(var i = 0; i<arrtd.length;i++){
        arrtd[i].removeEventListener("mouseleave", handleLeave);
        arrtd[i].removeEventListener("click", handleClick);
        arrtd[i].removeEventListener("mouseover", handleHover);
    }
}


// Sets the game to the beginning
function newGame(){
    var arrtd = document.getElementsByTagName('td');
    for(var i=0; i<arrtd.length; i++){
        arrtd[i].addEventListener("mouseover",handleHover);
        arrtd[i].addEventListener("click",handleClick);
        arrtd[i].addEventListener("mouseleave",handleLeave);
        arrtd[i].classList.remove("win");
        arrtd[i].style.pointerEvents = "auto";
        arrtd[i].innerText = "";
    }
    mat = [];
    for(var i = 0; i<3; i++){
        mat.push([0,0,0]);
    }
    document.getElementsByClassName('p1')[0].innerText = "Player one";
    document.getElementsByClassName('p2')[0].innerText = "Player two";
    player = true;
}