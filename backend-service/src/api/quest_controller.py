from flask import Blueprint, request, jsonify
from db_driver import db_driver

quest_api = Blueprint('quest_api', __name__)

@quest_api.route('/quest/<string:account_id>', methods=['GET'])
def getUserQuest(account_id):

    result = None

    ###
    # Call database client here
    ###
    result = db_driver.get_user_quest(account_id)

    return jsonify(result)

@quest_api.route('/quest/', methods=['GET'])
def getQuest():
    result = None

    result = db_driver.get_quest()

    return jsonify(result)

# @quest_api.route('/quest/', methods=['POST'])
# def getAccount(account_id):
#     user_id = request.json['user_id']
#     skilltree = request.json['quest']

#     result = None

#     ###
#     # Call database client here
#     ###

#     return jsonify(result)