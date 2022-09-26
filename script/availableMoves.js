function getAvailableMoves(boardMap, position) {
    let getMovesArray=(xDirection,yDirection)=>{
        //function to move in x or/and y untill find peice so that stop and return moves
        let x=xDirection
        let y=yDirection
        let moves=[]
        let nextMove=moveOnBoard(position,x,y)
        while(nextMove&&!boardMap[nextMove]){
            moves.push(nextMove)
            x+=xDirection
            y+=yDirection
            nextMove=moveOnBoard(position,x,y)
        }
        return moves
    }
    let piece= boardMap[position]
    let type = piece.type
    let availableMoves=[]
    switch (type) {
        case "pawn":
            let yDeriction=boardMap[position].isWhite?1:-1
            let front=moveOnBoard(position,0,yDeriction)
            let superFront
            if(piece.movesLog.length===0&&piece.movesLog.length===0){
                superFront=moveOnBoard(position,0,yDeriction*2)
            }
            if(front&&!boardMap[front]){
                availableMoves.push(front)
                if(superFront&&!boardMap[superFront]){
                    availableMoves.push(superFront)
                }
            }
            let right=moveOnBoard(position,1,yDeriction)
            let left=moveOnBoard(position,-1,yDeriction)
            if(boardMap[left]&&boardMap[left].isWhite!==piece.isWhite){
                availableMoves.push(left)
            }
            if(boardMap[right]&&boardMap[right].isWhite!==piece.isWhite){
                availableMoves.push(right)
            }
            break
        case "knight":
            let moves=[
                moveOnBoard(position,2,1),
                moveOnBoard(position,2,-1),
                moveOnBoard(position,-2,1),
                moveOnBoard(position,-2,-1),
                moveOnBoard(position,1,2),
                moveOnBoard(position,1,-2),
                moveOnBoard(position,-1,2),
                moveOnBoard(position,-1,-2)]
            moves.filter(move=>move&&!boardMap[move]).forEach(move=>{availableMoves.push(move)})
            break
        case "rook":
            availableMoves=[...getMovesArray(1,0),...getMovesArray(0,1),...getMovesArray(-1,0),...getMovesArray(0,-1)]
            break
        case "bishop":
            availableMoves=[...getMovesArray(1,1),...getMovesArray(-1,-1),...getMovesArray(-1,1),...getMovesArray(1,-1)]
            break
        case "queen":
            availableMoves=[...getMovesArray(1,1),...getMovesArray(-1,-1),...getMovesArray(-1,1),...getMovesArray(1,-1),...getMovesArray(1,0),...getMovesArray(0,1),...getMovesArray(-1,0),...getMovesArray(0,-1)]
            break
        case "king":
            console.log(type)
            break
    }
    return availableMoves
}