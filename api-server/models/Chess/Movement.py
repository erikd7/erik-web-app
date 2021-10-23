def isPawnMovementLegal(rankDir, fileDir, distance):
    return abs(rankDir) + abs(fileDir) == 1 and distance == 1

def isRookMovementLegal(rankDir, fileDir, _distance):
    return abs(rankDir) + abs(fileDir) == 1

def isBishopMovementLegal(rankDir, fileDir, _distance):
    return abs(rankDir) + abs(fileDir) == 2

def isBishopMovementLegal(rankDir, fileDir, _distance):
    return abs(rankDir) + abs(fileDir) == 1

pieceMovement = { 
    "p": isPawnMovementLegal,
    "r": isRookMovementLegal,
    "b": isBishopMovementLegal,

}

def isMovementLegal(piece, rankDir, fileDir, distance):
    return pieceMovement[piece](rankDir, fileDir, distance)
