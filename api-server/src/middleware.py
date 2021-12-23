def checkAuth(request):
    headers = request.headers
    auth = headers.get("x-api-key")
    if auth == '917bac03-ca89-49dc-8c6b-ea1a62ceea11':
        return {"ok": True}
    else:
        return {"ok": False, "message": "You are not authorized to access this resource"}