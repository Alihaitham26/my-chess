class Board{
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
        this.boardMap=boardMap
        this.draw()
    }
    draw(){
        for(let position in this.boardMap){
            if(this.boardMap[position]){
                let piece=this.boardMap[position]
                let img=document.createElement("img")
                img.src="assist/"+piece.img
                this.htmlSquares[position].appendChild(img)
            }
        }
    }
}