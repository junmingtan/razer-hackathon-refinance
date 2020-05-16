from flask import Flask, jsonify

application = Flask(__name__)

from api.user_controller import user_api

application.register_blueprint(user_api)

@application.route('/health', methods=['GET'])
def health():
    """
    Health check endpoint.
    :return: Http 200 response
    """
    return jsonify(success=True, status='Happy!')

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.run(host="0.0.0.0", threaded=True, debug=True)
oytho