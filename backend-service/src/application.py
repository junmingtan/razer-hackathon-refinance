from flask import Flask, jsonify

application = Flask(__name__)

from api.user_controller import user_api
from api.account_controller import account_api

application.register_blueprint(user_api)
application.register_blueprint(account_api)

@application.route('/health', methods=['GET'])
def health():
    """
    Health check endpoint.
    :return: Http 200 response
    """
    return jsonify(success=True, status='Happy!')

@application.route('/', methods=['GET'])
def home():
    html = """
            <html>
                <body>
                    POST /user/create {firstname, lastname}
                    <br>
                    GET /user/&ltuser_id&gt
                </body>
            </html>
    """
    return html


# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.run(host="0.0.0.0", threaded=True, debug=True)