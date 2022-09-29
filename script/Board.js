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
            let piece = this.map[this.selectedPosition]
            if(piece.type==="king"){
                let row=piece.isWhite?1:8
                if(this.selectedPosition==="e"+row){
                    if(position==="c"+row){
                        this.move("a"+row,"d"+row)
                    }else if(position==="g"+row){
                        this.move("h"+row,"f"+row)
                    }
                }
            }
            if(piece.type==="pawn"){
                let leftPawn=moveOnBoard(this.selectedPosition,-1,piece.isWhite?1:-1)
                let rightPawn=moveOnBoard(this.selectedPosition,1,piece.isWhite?1:-1)
                if((position===leftPawn&&!this.map[leftPawn])||(position===rightPawn&&!this.map[rightPawn])){
                    delete(this.map[moveOnBoard(position,0,(this.isWhite?1:-1))])
                    this.draw()
                }
            }
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
        console.clear()
        this.isWhiteTurn=true
        this.turnViewer.innerText="white turn"
        this.map=Board.initBoardMap
        this.mapLog=[]
        for(let key in this.map){
            this.map[key].movesLog[0]=key
        }
        this.draw()
    }
    afterTurn(){
        // function after every turn to check win
        let whiteKingPosition
        let blackKingPosition
        let isWhiteKingAlive=false
        let isBlackKingAlive=false
        for(let square in this.map){
            let piece=this.map[square]
            if(piece.type==="king"){
                if(piece.isWhite){
                    whiteKingPosition=square
                    isWhiteKingAlive=true
                }else{
                    blackKingPosition=square
                    isBlackKingAlive=true
                }
            }
            if(square[1]===(piece.isWhite?"8":"1")&&piece.type==="pawn"){
                showUpgradePawn(piece.isWhite,square)
            }
        }
        if(!isWhiteKingAlive){
            showMyAlert("black win",this.reset)
        }else if(!isBlackKingAlive){
            showMyAlert("white win",this.reset)
        }else{
            this.htmlSquares[blackKingPosition].classList.remove("danger")
            this.htmlSquares[whiteKingPosition].classList.remove("danger")
            for(let square in this.map){
                let piece=this.map[square]
                let availavbleMoves=getAvailableMoves(this.map,square)
                for(let i = 0;i<availavbleMoves.length;i++){
                    if(piece.isWhite&&availavbleMoves[i]===blackKingPosition){
                        this.htmlSquares[blackKingPosition].classList.add("danger")
                        this.turnViewer.innerText="white king in check"
                    }else if(!piece.isWhite&&availavbleMoves[i]===whiteKingPosition){
                        this.htmlSquares[whiteKingPosition].classList.add("danger")
                        this.turnViewer.innerText="white king in check"
                    }
                }
            }
        }
    }
    upgradePawn(to,pawnPosition){
        this.map[pawnPosition]=new Piece(to,!this.isWhiteTurn)
        this.draw()
    }
}