from flask import Blueprint, request, jsonify
from mambu_client import mambu_client
from db_driver import db_driver

user_api = Blueprint('user_api', __name__)

@user_api.route('/user/create', methods=['POST'])
def createUser():
    firstname = request.json['firstname']
    lastname = request.json['lastname']
    result = mambu_client.createClient(firstname, lastname)
    client_id = result['client']['encodedKey']

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
    return jsonify(client_id = client_id)

@user_api.route('/user/<string:client_id>', methods=['GET'])
def getUser(client_id):
    result = mambu_client.getClient(client_id)
    return jsonify(result)
