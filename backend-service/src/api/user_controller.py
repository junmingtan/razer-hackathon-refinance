from flask import Blueprint, request, jsonify
from mambu_client import mambu_client
from db_lite import db_lite

user_api = Blueprint('user_api', __name__)

@user_api.route('/user/create', methods=['POST'])
def createUser():
    firstname = request.json['firstname']
    lastname = request.json['lastname']
    email = request.json['email']
    password = request.json['password']
    result = mambu_client.createClient(firstname, lastname)
    client_id = result['client']['encodedKey']
    
    success, e = db_lite.insertUser((email, password, firstname, lastname, client_id))
    if not success:
        return jsonify(success=False, msg=e)

    return jsonify(success=True, mambuid=client_id)

@user_api.route('/user/<string:client_id>', methods=['GET'])
def getUser(client_id):
    result = mambu_client.getClient(client_id)
    return jsonify(result)

@user_api.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    success, db_result = db_lite.getUser(email)
    
    if not success:
        return jsonify(success=False, msg=db_result)

    user = db_result[0]
    print(user)
    if (user[1] != password):
        return jsonify(success=False, msg='Wrong Password')
    return jsonify(email=email, firstname=user[2], lastname=user[3], mambuid=user[4])

@user_api.route('/user/all', methods=['GET'])
def allUsers():
    success, db_result = db_lite.getAllUsers()
    return jsonify(db_result)

