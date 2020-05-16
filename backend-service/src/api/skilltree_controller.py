from flask import Blueprint, jsonify, request

skilltree_api = Blueprint('skilltree_api', __name__)

from db_driver import db_driver

@skilltree_api.route('/skilltree/<string:account_id>', methods=['GET'])
def getSkillTree(account_id):

    result = None

    ###
    # Call database client here
    ###
    result = db_driver.get_skill_tree(uid=account_id)

    return jsonify(result)

@skilltree_api.route('/skilltree/<string:account_id>/<string:perk_id>', methods=['POST'])
def updateSkillTree(account_id, perk_id):

    result = None

    ###
    # Call database client here
    ###
    db_driver.update_skill_tree(uid=account_id, pid=int(perk_id))

    return jsonify(result)