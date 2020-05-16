from flask import Blueprint, request, jsonify
from mambu_client import mambu_client
account_api = Blueprint('account_api', __name__)

@account_api.route('/account/create', methods=['POST'])
def createAccount():
    user_id = request.json['user_id']
    result = mambu_client.createCurrentAccount(user_id)
    account_id = result['savingsAccount']['id']
    return jsonify(account_id = account_id)

@account_api.route('/account/<string:account_id>', methods=['GET'])
def getAccount(account_id):
    result = mambu_client.getCurrentAccount(account_id)
    return jsonify(result)

@account_api.route('/accounts/<string:user_id>', methods=['GET'])
def getAccounts(user_id):
    result = mambu_client.getCurrentAccounts(user_id)
    return jsonify(result)