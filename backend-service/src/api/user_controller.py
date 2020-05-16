from flask import Blueprint, request, jsonify
from mambu_client import mambu_client
<<<<<<< HEAD
from db_driver import db_driver
=======
from db_lite import db_lite
>>>>>>> 4dd69e71d125f506bc93f5e633d8e7ddf25fcf4c

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

    new_user = {}
    new_user["user_id"] = client_id
    new_user["first_name"] = firstname
    new_user["last_name"] = lastname
    new_user["user_level"] = 1
    new_user["exp_earned"] = 0
    new_user["skill_point"] = 1
    db_driver.update_user(client_id, new_user)

    beginner_quest_subscription = {}
    beginner_quest_subscription["uid"] = client_id
    beginner_quest_subscription["qid"] = 0
    beginner_quest_subscription["progress"] = 0
    beginner_quest_subscription["completed"] = 0
    db_driver.update_user_quest(beginner_quest_subscription)

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
