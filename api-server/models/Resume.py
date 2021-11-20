from flask import Flask, request, jsonify
from flask_restful import Resource
from middleware import checkAuth


class ResumeInfo(Resource):
    path = '/resume'

    data = {
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
        "skillsCore": [
            {
                "name": "JavaScript",
                "details": "2 years professional experience",
                "level": 3,
            },
            {
                "name": "Vue.js",
                "details":
                "2 years professional experience and independent work",
                "level": 3,
            },
            {
                "name": "React.js",
                "details": "1 year professional experience",
                "level": 2,
            },
            {
                "name": "Node.js & npm",
                "details": "2 years professional experience",
                "level": 2,
            },
            {
                "name": "SQL",
                "details": "5 years university and professional experience",
                "level": 3,
            },
            {
                "name": "HTML & CSS",
                "details": "2 years professional experience",
                "level": 3,
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
                "name": "Git",
                "details":
                "2 years professional experience and independent work  ",
                "level": 3,
            },
        ],
        "skillsAdditional": [
            {
                "name": "Axios.js & Express.js",
                "details":
                "2 years professional experience and independent stoudy",
                "level": 2
            },
            {
                "name": "Flask",
                "details": "1 year independent stoudy",
                "level": 2
            },
            {
                "name": "Bootstrap",
                "details": "1 year professional experience",
                "level": 2,
            },
            {
                "name": "Tailwind",
                "details":
                "2 years professional experience and independent work",
                "level": 2,
            },
            {
                "name": "R",
                "details": "1 year university study",
                "level": 1,
            },
            {
                "name": "C#",
                "details": "1 year professional experience",
                "level": 1,
            },
            {
                "name": "Docker",
                "details":
                "1 year professional experience and independent work",
            },
            {
                "name":
                "AWS",
                "details":
                "1 year professional experience including S3, CloudWatch, lambdas, serverless functions",
            },
        ],
        "experienceList": [
            {
                "organization":
                "Northwestern Mutual",
                "title":
                "Software Engineer II",
                "start":
                "2021",
                "description":
                "Full-stack engineer working in 6-member Agile team to create wire transfer management web app using primarily React, Node, Jest, and SQL with GitLab. Worked on all aspects of the SDLC, including unit testing, DevOps and pipeline management, release engineering, and support. Also served as team's embedded Scrum Master."
            },
            {
                "organization":
                "Epic",
                "title":
                "Software Engineer and Project Manager",
                "start":
                "2018",
                "end":
                "2021",
                "description":
                "As a Software Developer: Led design and development of customer-facing web app for supporting software implementation planning. Used SQL, C#, JS Vue, and HTML/CSS with GitLab. Coordinated all parts of the SDLC, from initial scoping and design through development, testing, go-live, and continuous improvement.\nAs a Project Manager: responsible for configuring large-scale software suite for healthcare organizations. Managed 20-member team. Member of Epic’s Infection Control Product Leads team during the COVID-19 response."
            },
        ],
    }

    def get(self):
        authResponse = checkAuth(request)
        if (not authResponse['ok']):
            return authResponse, 401
        response = jsonify(self.data)

        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
