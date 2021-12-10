from flask import Flask
from flask_cors import CORS
from flask_restful import Api
import os
from routes import setRoutes
from waitress import serve



app = Flask(__name__)
CORS(app)
api = Api(app)

setRoutes(api)

if __name__ == "__main__":
  port = int(os.environ.get('PORT', 49155))
  print('Initializing and running app on port ' + str(port))
  #app.run(debug=True, host="0.0.0.0", port=port, use_reloader=False)
  serve(app, host='0.0.0.0', port=port)