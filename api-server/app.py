from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from routes import setRoutes

app = Flask(__name__)
CORS(app)
api = Api(app)

setRoutes(api)

if __name__ == "__main__":
  app.run(debug=True)