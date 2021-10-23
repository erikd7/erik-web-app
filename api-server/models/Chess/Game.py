from .Helpers import opponent, updateAllowedMoves

class Game:

    def __init__(self):
        self.mate = False
        
        #the board
        self.board = {
            #white back rank
            "a1": 'wra',
            "b1": 'wnb',
            "c1": 'wbc',
            "d1": 'wqd',
            "e1": 'wke',
            "f1": 'wbf',
            "g1": 'wng',
            "h1": 'wrh',
            #white pawns
            "a2": 'wpa',
            "b2": 'wpb',
            "c2": 'wpc',
            "d2": 'wpd',
            "e2": 'wpe',
            "f2": 'wpf',
            "g2": 'wpg',
            "h2": 'wph',
            #black back rank
            "a8": 'bra',
            "b8": 'bnb',
            "c8": 'bbc',
            "d8": 'bqd',
            "e8": 'bke',
            "f8": 'bbf',
            "g8": 'bng',
            "h8": 'brh',
            #black pawns
            "a7": 'bpa',
            "b7": 'bpb',
            "c7": 'bpc',
            "d7": 'bpd',
            "e7": 'bpe',
            "f7": 'bpf',
            "g7": 'bpg',
            "h7": 'bph',
        }

        #allowed moves
        self.allowedMoves = {
            "wpa": {
                "a3": True,
                "a4": True
            },
            "wpb": {
                "b3": True,
                "b4": True
            },
            "wpc": {
                "c3": True,
                "c4": True
            },
            "wpd": {
                "d3": True,
                "d4": True
            },
            "wpe": {
                "e3": True,
                "e4": True
            },
            "wpf": {
                "f3": True,
                "f4": True
            },
            "wpg": {
                "g3": True,
                "g4": True
            },
            "wph": {
                "h3": True,
                "h4": True
            },
            "wnb": {
                "a3": True,
                "c3": True
            },
            "wng": {
                "f3": True,
                "h3": True
            },
            "bpa": {
                "a6": True,
                "a5": True
            },
            "bpb": {
                "b6": True,
                "b5": True
            },
            "bpc": {
                "c6": True,
                "c5": True
            },
            "bpd": {
                "d6": True,
                "d5": True
            },
            "bpe": {
                "e6": True,
                "e5": True
            },
            "bpf": {
                "f6": True,
                "f5": True
            },
            "bpg": {
                "g6": True,
                "g5": True
            },
            "bph": {
                "h6": True,
                "h5": True
            },
            "bnb": {
                "a6": True,
                "c6": True
            },
            "bng": {
                "f6": True,
                "h6": True
            },
        }

        #moves
        self.lastFromSquare = None
        self.lastToSquare = None
        self.fromSquare = None
        self.toSquare = None
        
        self.toMove = 'w'
    
    def createFrom(existing):
        game = Game()

        game.mate = existing.get('board')
        game.board = existing.get('board')
        game.lastFromSquare = existing.get('lastFromSquare')
        game.lastToSquare = existing.get('lastToSquare')
        game.fromSquare = existing.get('fromSquare')
        game.toSquare = existing.get('toSquare')
        game.toMove = existing.get('toMove')
        game.allowedMoves = existing.get('allowedMoves')

        return game

    def getObject(self):
        return { 
            "mate": self.board,
            "board": self.board,
            "lastFromSquare": self.lastFromSquare,
            "lastToSquare": self.lastToSquare,
            "fromSquare": self.fromSquare,
            "toSquare": self.toSquare,
            "toMove": self.toMove,
            "allowedMoves": self.allowedMoves
        }

    def makeMove(self):
        #Check if move is valid
        #for now assume what's coming in is valid. in future, validate the move first

        #check for moving into/out of mate

        #Move the pieces
       self.board[self.toSquare] = self.board[self.fromSquare] 
       self.board[self.fromSquare] = ""

       #todo: Check for mate

       #Update allowed moves
       allowedMoves = updateAllowedMoves(self)
       self.allowedMoves = allowedMoves

       self.endMove()

    def endMove(self):
        #Update last move squares
        self.lastFromSquare = self.fromSquare 
        self.lastToSquare = self.toSquare 

        #Clear move squares
        self.fromSquare = None
        self.toSquare = None

        #Move to next player
        self.toMove = opponent[self.toMove]


