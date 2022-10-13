// DOM elements
const BOARD = document.querySelector(".board")
const MY_ALERT = document.querySelector(".my-alert")
const ALERT_TEXT=document.querySelector(".my-alert .box p")
const ALERT_BTN=document.querySelector(".my-alert .box button")
const UPGRADE_BOX=document.querySelector(".pawn-upgrade")
let theme=localStorage.getItem("theme")||"light"
const UPGRADE_IMGS={
    queen:document.getElementById("queen"),
    knight:document.getElementById("knight"),
    bishop:document.getElementById("bishop"),
    rook:document.getElementById("rook")
}
// constant variables
const LETTERS = ['a','b','c','d','e','f','g','h']

// use loop to create html squres and store in array instead of make it by html then store it in js
let htmlSquares={}
for(let i=0;i<LETTERS.length;i++){
    for(let j=1;j<=8;j++){
        let square=document.createElement("div")
        square.classList.add("square",(((j+i)/2)%1)===0?"white":"black")
        square.dataset.position=LETTERS[i]+j
        BOARD.appendChild(square)
        htmlSquares[LETTERS[i]+j]=square
    }
}

// make game board
let board=new Board(htmlSquares)

function toggleTheme(){
    // toggle theme betwen dark and light and set btn img
    if(document.body.classList.contains("light")){
        document.body.classList.remove("light")
        document.body.classList.add("dark")
        document.getElementById("themeImg").src="assist/icons/sun-solid.svg"
        localStorage.setItem("theme","dark")
    }
    else if(document.body.classList.contains("dark")){
        document.body.classList.remove("dark")
        document.body.classList.add("light")
        document.getElementById("themeImg").src="assist/icons/moon-solid.svg"
        localStorage.setItem("theme","light")
    }
}
if(theme==="dark"){
    toggleTheme()
}

let isOn=position=>(/^[a-h][1-8]$/).test(position)

function moveOnBoard(position,x,y){
    /*  fuction to convert position that type in letter and number to x,y 
        then move on x,y then reconvert it 
        and check if this position in the board */
    let newPosition=LETTERS[LETTERS.indexOf(position[0])+x]+(+position[1]+y)
    return isOn(newPosition)?newPosition:false 
}

function showMyAlert(text,onConfirm){
    ALERT_TEXT.innerText=text
    MY_ALERT.style.display="block"
    ALERT_BTN.onclick=()=>{
        MY_ALERT.style.display="none"
        onConfirm()
    }
}

function showUpgradePawn(isWhite,pawmPosition){
    UPGRADE_BOX.style.display="block"
    for(let key in UPGRADE_IMGS){
        let img=UPGRADE_IMGS[key]
        img.src=`assist/pieces/${isWhite?"white":"black"}/${img.dataset.type}.png`
        img.onclick=()=>{
            UPGRADE_BOX.style.display="none"
            board.upgradePawn(img.dataset.type,pawmPosition)
        }
    }
}
// make t key toggle theme onclick
document.addEventListener("keypress",ev=>{
    if(ev.code==="KeyT"){
        toggleTheme()
    }
})

// set downbar buttons onclick
document.getElementById("undo").onclick=board.undo
document.getElementById("theme").onclick=toggleTheme
document.getElementById("reset").onclick=board.reset