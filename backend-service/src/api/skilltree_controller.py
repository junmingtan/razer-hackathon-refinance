from flask import Blueprint, jsonify, request
from db_driver import db_driver

skilltree_api = Blueprint('skilltree_api', __name__)

@skilltree_api.route('/skilltree/<string:account_id>', methods=['GET'])
def getSkillTree(account_id):

    result = None

    ###
    # Call database client here
    ###
    result = db_driver.get_skill_tree(uid=account_id)

    return jsonify(result)

@skilltree_api.route('/skilltree/', methods=['POST'])
def getAccount(account_id):
    user_id = request.json['user_id']
    skilltree = request.json['skilltree']

    result = None

    ###
    # Call database client here
    ###
    db_driver.update_skill_tree(uid=user_id, new_tree=skilltree)

    return jsonify(result)