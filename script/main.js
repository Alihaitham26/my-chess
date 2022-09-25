const BOARD = document.querySelector(".board")
const LETTERS = ['a','b','c','d','e','f','g','h']

// use loop to create html squres and store in array instead of make it by html then store it in js
let htmlSquares={}
for(let i=0;i<LETTERS.length;i++){
    for(let j=1;j<=8;j++){
        let square=document.createElement("div")
        square.classList.add("square",(((j+i)/2)%1)===0?"black":"white")
        square.dataset.position=LETTERS[i]+j
        BOARD.appendChild(square)
        htmlSquares[LETTERS[i]+j]=square
    }
}
let board=new Board(htmlSquares)

function toggleTheme(){
    //toggle theme betwen dark and light and set btn img
    if(document.body.classList.contains("light")){
        document.body.classList.remove("light")
        document.body.classList.add("dark")
        document.getElementById("themeImg").src="assist/sun-solid.svg"
    }
    else if(document.body.classList.contains("dark")){
        document.body.classList.remove("dark")
        document.body.classList.add("light")
        document.getElementById("themeImg").src="assist/moon-solid.svg"
    }
}


let positionRegex=/^[a-h][1-8]$/
let isOn=position=>positionRegex.test(position)
function moveOnBoard(position,x,y){
    /*  fuction to convert position that type in letter and number to x,y 
        then move on x,y then reconvert it 
        and check if this position in the board */
    let newPosition=LETTERS[LETTERS.indexOf(position[0])+x]+(+position[1]+y)
    return isOn(newPosition)?newPosition:false 
}

// set downbar buttons onclick
document.getElementById("undo").onclick=board.undo
document.getElementById("theme").onclick=toggleTheme
document.getElementById("reset").onclick=board.reset