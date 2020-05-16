from flask import Blueprint, request, jsonify
from mambu_client import mambu_client
account_api = Blueprint('account_api', __name__)

@user_api.route('/account/create', methods=['POST'])
def createAccount():
    mambu_client.getCurrentAccount('WJKI761')