from flask import Blueprint, request, jsonify
from mambu_client import mambu_client

user_api = Blueprint('user_api', __name__)

@user_api.route('/user/create', methods=['POST'])
def createUser():
    firstname = request.json['firstname']
    lastname = request.json['lastname']
    result = mambu_client.createClient(firstname, lastname)
    client_id = result['client']['encodedKey']
    return jsonify(client_id = client_id)

@user_api.route('/user/<string:client_id>', methods=['GET'])
def getUser(client_id):
    result = mambu_client.getClient(client_id)
    return jsonify(result)
