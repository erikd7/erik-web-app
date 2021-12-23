import json
from types import SimpleNamespace

def objectToJson(object):
    return json.dumps(object.__dict__)

def jsonToObject(json):
    return json.loads(json, object_hook=lambda d: SimpleNamespace(**d))