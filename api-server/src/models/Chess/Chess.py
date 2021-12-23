from flask import Flask, request, jsonify
from flask_restful import Resource
from middleware import checkAuth
from models.Chess.Game import *

class NewChess(Resource):
    path = '/chess/new-game'
    
    def get(self):
        authResponse = checkAuth(request);
        if (not authResponse['ok']):
            return authResponse, 401 
        
        data = Game().getObject()
        response = jsonify(data);
       
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response;

class MakeMove(Resource):
    path = '/chess/make-move'

    def post(self):
        authResponse = checkAuth(request);
        if (not authResponse['ok']):
            return authResponse, 401
        
        body = request.get_json()

        game = Game.createFrom(body)
        game.makeMove()

        response = jsonify(game.getObject()); 
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response;
