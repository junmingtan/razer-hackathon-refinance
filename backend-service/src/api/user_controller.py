from flask import Blueprint, request, jsonify

user_api = Blueprint('user_api', __name__)

@user_api.route('/user/create', methods=['GET'])
def createUser():
    return jsonify(success = True)