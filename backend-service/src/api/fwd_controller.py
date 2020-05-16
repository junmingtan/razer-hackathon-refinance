from flask import Blueprint, jsonify, request
from fwd_client import fwd_client

fwd_api = Blueprint('fwd_api', __name__)

@fwd_api.route('/fwd', methods=['POST'])
def scanNRIC():
    image = request.json['base64image']
    result = fwd_client.verify(image)
    return result
