def isPawnMovementLegal(rankDir, fileDir, distance):
    return abs(rankDir) + abs(fileDir) == 1 and distance == 1

def isRookMovementLegal(rankDir, fileDir, _distance):
    return abs(rankDir) + abs(fileDir) == 1

def isKnightMovementLegal(rankDir, fileDir, _distance):
    return abs(rankDir) + abs(fileDir) == 2

def isBishopMovementLegal(rankDir, fileDir, _distance):
    return abs(rankDir) + abs(fileDir) == 2

def isQueenMovementLegal(rankDir, fileDir, _distance):
    return abs(rankDir) + abs(fileDir) <= 2

def isKingMovementLegal(rankDir, fileDir, distance):
    return abs(rankDir) + abs(fileDir) <= 2 and distance <= 1

def illegalMovement(_rankDir, _fileDir, _distance):
    return False

pieceMovement = { 
    "p": isPawnMovementLegal,
    "r": isRookMovementLegal,
    "n": isKnightMovementLegal,
    "b": isBishopMovementLegal,
    "q": isQueenMovementLegal,
    "k": isKingMovementLegal,
    "x": illegalMovement
}

def isMovementLegal(piece, rankDir, fileDir, distance):
    return pieceMovement[piece[1]](rankDir, fileDir, distance)
