from flask import Blueprint, request, jsonify
from db_driver.db_driver import db

quest_api = Blueprint('quest_api', __name__)

@quest_api.route('/quest/update', methods=['POST'])
def createAccount():
    user_id = request.json['user_id']
    result = mambu_client.createCurrentAccount(user_id)
    account_id = result['savingsAccount']['id']
    return jsonify(account_id = account_id)

@quest_api.route('/quest/<string:user_id>', methods=['GET'])
def getAccount(account_id):
    result = .getCurrentAccount(account_id)
    return jsonify(result)