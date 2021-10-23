from .Movement import isMovementLegal

opponent = {
    "b": "w",
    "w": "b",
    }

boardMin = 1
boardMax = 8

noPiece = 'xx'

fileIndex = { "a": 1, "b": 2, "c": 3, "d": 4, "e": 5, "f": 6, "g": 7, "h": 8 }
indexFile = { 1: "a", 2:"b", 3:"c", 4:"d", 5:"e", 6:"f", 7:"g", 8:"h" }

def updateAllowedMoves(game):
    allowedMoves = game.allowedMoves
    affectedPiecesFrom = getTouchingPieces(game.board, game.fromSquare)
    print(affectedPiecesFrom)

    return allowedMoves

def getTouchingPieces(board, square):
    [rank, file] = squareToRankFile(square)
    touchingPieces = []
    for rankDir in range(-1,1):
        for fileDir in range(-1,1):
            first = getFirstPiece(board, rank, file, rankDir, fileDir)
            piece = first.firstPiece
            distance = first.distance
            if(isMovementLegal(piece, rankDir, fileDir, distance)):
                touchingPieces.append(firstPiece)

    return touchingPieces


def getFirstPiece(board, startRank, startFile, rankDirection, fileDirection):
    incrementer = 0
    while isSquareOnBoard(startRank + incrementer*rankDirection, startFile + incrementer*fileDirection):
        square = getNextSquare(startRank + incrementer*rankDirection, startFile + incrementer*fileDirection, rankDirection, fileDirection)
        if (square in board):
            return { "piece": board[square], "distance": incrementer }
        incrementer = incrementer + 1

    return { "piece": noPiece, "distance": -1 }

def getNextSquare(rank, file, rankDirection, fileDirection):
    file += fileDirection
    rank += rankDirection

    if (not isSquareOnBoard(rank, file)):
        return noPiece

    return indexFile[file] + str(rank)

def isSquareOnBoard(rank, file):
    return file >= boardMin and file <= boardMax and rank >= boardMin and rank <= boardMax

def squareToRankFile(square):
    file = square[0]
    file = fileIndex[file]
    rank = int(square[1])

    return [rank, file]
