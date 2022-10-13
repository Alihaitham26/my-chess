class Piece{
    static types=["pawn","rook","knight","bishop","queen","king"]
    constructor(type,isWhite){
        //make errors to help in find the issue
        if(!Piece.types.includes(type)){
            throw new Error(`${type} is not a piece type`)
        }else if(typeof(isWhite) !== "boolean"){
            throw new Error("isWhite must boolean")
        }
        this.type=type
        this.isWhite=isWhite
        this.movesLog=[]
        this.img=`pieces/${isWhite?"white":"black"}/${type}.png`
    }
    move(position){
        // save last move to use it in special move
        this.positionsLog.push(position)
    }
}