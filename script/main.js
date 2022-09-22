const BOARD = document.querySelector(".board")
const LETTERS = ['a','b','c','d','e','f','g','h']
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