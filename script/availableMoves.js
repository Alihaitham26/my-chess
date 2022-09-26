function getAvailableMoves(boardMap, position) {
    let piece= boardMap[position]
    let type = piece.type
    switch (type) {
        case "pawn":
            let yDeriction=boardMap[position].isWhite?1:-1
            let availableMoves=[]
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
            return availableMoves
        case "rook":
            console.log(type)
            break
        case "knight":
            console.log(type)
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
}