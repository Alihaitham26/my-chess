class Piece{
    static types=["pawn","rook","knight","bishop","queen","king"]
    constructor(type,isWhite){
        if(!Piece.types.includes(type)){
            throw new Error(`${type} is not a piece type`)
        }else if(typeof(isWhite) !== "boolean"){
            throw new Error("isWhite must boolean")
        }
        this.type=type
        this.isWhite=isWhite
        this.movesLog=[]
        this.img=`${isWhite?"w":"b"}_${type}.png`
    }
    move(position){
        this.positionsLog.push(position)
    }
}