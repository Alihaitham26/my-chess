function getAvailableMoves(boardMap, position) {
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
            if(!boardMap[front]){
                availableMoves.push(front)
                if(!boardMap[superFront]){
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
            
        case "rook":
            console.log(type)
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
            moves.map(move=>{
                if(move&&!boardMap[move]){
                    availableMoves.push(move)
                }
            })
            break
        case "bishop":
            console.log(type)
            break
        case "queen":
            console.log(type)
            break
        case "king":
            console.log(type)
            break
    }
    return availableMoves
}