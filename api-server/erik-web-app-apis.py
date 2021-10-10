from flask import Flask, request, jsonify, request
from flask_cors import CORS
from flask_restful import Resource, Api, reqparse

app = Flask(__name__)
CORS(app)
api = Api(app)

def checkAuth(request):
    headers = request.headers
    auth = headers.get("x-api-key")
    if auth == '917bac03-ca89-49dc-8c6b-ea1a62ceea11':
        return {"ok": True}
    else:
        return {"ok": False, "message": "You are not authorized to access this resource"}

class ResumeInfo(Resource):
    resumeInfo = {
        "contactDetails": [
        {
            "label": "email",
            "info": "erik.dietrich.b@gmail.com",
        },
        {
            "label": "phone",
            "info": "(724) 799-4475",
        },
        {
            "label": "location",
            "info": "Madison, WI & Remote",
        },
        ],
        "educationList": [
        {
            "institution": {
            "name": "Virginia Tech",
            "location": "Blacksburg, VA",
            },
            "graduationYear": 2018,
            "degree": "Bachelor of Science",
            "majors": ["Industrial and Systems Engineering"],
            "minors": ["Economics"],
            "distinction": "Magna Cum Laude",
        },
        ],
        "links": [
        {
            "title": "LinkedIn",
            "tooltip": "My LinkedIn page",
            "url": "https://www.linkedin.com/in/erik-dietrich-000506134/",
        },
        {
            "title": "GitHub",
            "tooltip": "My GitHub profile - including this repo",
            "url": "https://github.com/normalone7",
        },
        ],
        "languagesAndFrameworks": [
        {
            "name": "JavaScript",
            "details": "2 years professional experience",
            "level": 3,
        },
        {
            "name": "Vue.js",
            "details": "2 years professional experience and independent work",
            "level": 3,
        },
        {
            "name": "React",
            "details": "1 year professional experience",
            "level": 2,
        },
        {
            "name": "Bootstrap",
            "details": "1 year professional experience",
            "level": 2,
        },
        {
            "name": "Tailwind",
            "details": "2 years professional experience and independent work",
            "level": 2,
        },
        {
            "name": "SQL",
            "details": "5 years university and professional experience",
            "level": 3,
        },
        {
            "name": "HTML",
            "details": "2 years professional experience",
            "level": 3,
        },
        {
            "name": "CSS",
            "details": "2 years professional experience",
            "level": 3,
        },
        {
            "name": "R",
            "details": "1 year university study",
            "level": 1,
        },
        {
            "name": "Python",
            "details": "2 years university and independent work",
            "level": 2,
        },
        {
            "name": "Java",
            "details": "2 years university and independent work  ",
            "level": 2,
        },
        {
            "name": "C#",
            "details": "1 year professional experience",
            "level": 1,
        },
        ],
        "apps": [
        {
            "name": "AWS",
            "details":
            "1 year professional experience including S3, CloudWatch, lambdas, serverless functions",
        },
        ]
    };
    def get(self):
        authResponse = checkAuth(request);
        if (not authResponse['ok']):
            return authResponse, 401 
        response = jsonify(self.resumeInfo); 
       
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response;

api.add_resource(ResumeInfo, '/resume/')

if __name__ == "__main__":
  app.run(debug=True)