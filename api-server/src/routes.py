from models.Resume import ResumeInfo
from models.Chess.Chess import *

def setRoutes(api):
    api.add_resource(ResumeInfo, ResumeInfo.path)
    api.add_resource(NewChess, NewChess.path)
    api.add_resource(MakeMove, MakeMove.path)