from models.Resume import ResumeInfo

def setRoutes(api):
    api.add_resource(ResumeInfo, ResumeInfo.path)