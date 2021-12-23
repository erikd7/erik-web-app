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
    print('from is',affectedPiecesFrom)
    affectedPiecesTo = getTouchingPieces(game.board, game.toSquare)
    print('to is', affectedPiecesTo)

    return allowedMoves

def getTouchingPieces(board, square):
    [rank, file] = squareToRankFile(square)
    touchingPieces = []
    for rankDir in range(-1,2):
        for fileDir in range(-1,2):
            first = getFirstPiece(board, rank, file, rankDir, fileDir)
            piece = first['piece']
            distance = first['distance']
            allowedSquares = first['allowedSquares']
            print('piece is ', first)
            if(isMovementLegal(piece, rankDir, fileDir, distance)):
                touchingPieces.append(piece)

    return touchingPieces


def getFirstPiece(board, startRank, startFile, rankDirection, fileDirection):
    if (rankDirection == 0 and fileDirection == 0):
        return { "piece": noPiece, "distance": -1, "allowedSquares": {} }
    incrementer = 0
    piece = noPiece
    distance = -1
    visitedSquares = {}
    while isSquareOnBoard(startRank + incrementer*rankDirection, startFile + incrementer*fileDirection):
        square = getNextSquare(startRank + incrementer*rankDirection, startFile + incrementer*fileDirection, rankDirection, fileDirection)
        if (square == noPiece): break
        if (square in board):#if there is a piece on square
                piece = board[square]
                distance = incrementer + 1
        else: visitedSquares[square] = True
        incrementer = incrementer + 1

    return { "piece": piece, "distance": distance, "allowedSquares": visitedSquares }

def getNextSquare(rank, file, rankDirection, fileDirection):
    file += fileDirection
    rank += rankDirection

    if (not isSquareOnBoard(rank, file)):
        return noPiece

    return rankFileToSquare(rank,file)

def isSquareOnBoard(rank, file):
    return file >= boardMin and file <= boardMax and rank >= boardMin and rank <= boardMax

def getPieceOnSquare(board, rank, file):
    print('getting', board, rank, file)
    return board[rankFileToSquare(rank, file)]

def squareToRankFile(square):
    file = square[0]
    file = fileIndex[file]
    rank = int(square[1])
    
    return [rank, file]

def rankFileToSquare(rank,file):
    return indexFile[file] + str(rank)

#assumes that moving to the square is legal
def canCaptureOnSquare(board, toSquare, piece, rankDirection, fileDirection):
    toPiece = board[toSquare]
    #has to take opposite color
    if (toPiece[0] == piece[0]):
        return False
    #if pawn, has to move in diagonal
    if (toPiece[1] == "p"):
        return abs(rankDirection) + abs(fileDirection) == 1
    
    return True