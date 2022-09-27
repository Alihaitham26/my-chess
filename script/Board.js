class Board{
    //static function to draw the start chess map
    static get initBoardMap(){
        let boardMap={}
        const LETTERS = ['a','b','c','d','e','f','g','h']
        for(let i=0;i<LETTERS.length;i++){
            boardMap[LETTERS[i]+2]=new Piece("pawn",true)
            boardMap[LETTERS[i]+7]=new Piece("pawn",false)
        }
        for(let i=0;i<=1;i++){
            let row=i?1:8
            let isWhite=Boolean(i)
            boardMap['a'+row]=new Piece("rook",isWhite)
            boardMap['h'+row]=new Piece("rook",isWhite)
            boardMap['b'+row]=new Piece("knight",isWhite)
            boardMap['g'+row]=new Piece("knight",isWhite)
            boardMap['c'+row]=new Piece("bishop",isWhite)
            boardMap['f'+row]=new Piece("bishop",isWhite)
            boardMap['d'+row]=new Piece("queen",isWhite)
            boardMap['e'+row]=new Piece("king",isWhite)
        }
        return boardMap
    }


    constructor(htmlSquares,boardMap=Board.initBoardMap){
        this.htmlSquares=htmlSquares
        this.turnViewer=document.getElementById("turn-viewer")
        this.reset(boardMap)
        //use bind to use it onclick
        this.undo=this.undo.bind(this)
        this.reset=this.reset.bind(this)
        this.handleClick=this.handleClick.bind(this)
    }
    selectedPosition
    availableMoves=[]
    handleClick(position) {
        for(let square in this.htmlSquares){
            this.htmlSquares[square].classList.remove("dot")
        }
        if (this.map[position]&&!this.selectedPosition&&this.map[position].isWhite===this.isWhiteTurn) {
            this.selectedPosition=position
            this.availableMoves=getAvailableMoves(this.map, position)
            this.availableMoves.forEach(move=>{this.htmlSquares[move].classList.add("dot")})
       }else if(this.availableMoves.includes(position)&&this.selectedPosition){
            this.move(this.selectedPosition,position)
            this.isWhiteTurn=!this.isWhiteTurn
            this.turnViewer.innerText=`${this.isWhiteTurn?"white":"black"} turn`
            this.afterTurn()
            this.selectedPosition=undefined
            this.availableMoves=[]
        }else{
            this.selectedPosition=undefined
            this.availableMoves=[]
       }
    }
    draw(){
        for(let position in this.htmlSquares){
            this.htmlSquares[position].innerHTML=null
            if(this.map[position]){
                let piece=this.map[position]
                let img=document.createElement("img")
                img.src="assist/"+piece.img
                this.htmlSquares[position].appendChild(img)
            }
            this.htmlSquares[position].onclick = () => { this.handleClick(position) }
        }
    }
    move(from,to){
        if(this.map[from]){
            //edit the map,replace from square with to square,before that clone the map to use it in undo
            this.mapLog.push(Object.assign({},this.map))
            this.map[to]=this.map[from]
            delete this.map[from]
            this.map[to].movesLog.push(to)
            this.draw()
        }
    }
    undo(){
        if(this.mapLog.length>0){
            this.map=this.mapLog.pop()
            this.draw()
        }
    }
    reset(){
        // reset variables that control the game proggress
        this.isWhiteTurn=true
        this.turnViewer.innerText="white turn"
        this.map=Board.initBoardMap
        this.mapLog=[]
        this.draw()
    }
    afterTurn(){
        let isWhiteKingAlive=false
        let isBlackKingAlive=false
        for(let square in this.map){
            let piece=this.map[square]
            if(piece.type==="king"){
                piece.isWhite?isWhiteKingAlive=true:isBlackKingAlive=true
            }
        }
        if(!isWhiteKingAlive){
            showMyAlert("black win",this.reset)
        }else if(!isBlackKingAlive){
            showMyAlert("white win",this.reset)
        }
    }
}