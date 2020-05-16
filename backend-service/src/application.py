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
                    <b> POST /user/create </b> <br>
                    Request body: {firstname, lastname} <br>
                    Creates a new user
                    <br><br>
                    <b> GET /user/&ltuser_id&gt </b> <br>
                    Get user by user_id
                    <br><br>
                    
                    <b> POST /account/create </b> <br>
                    Request body: {user_id} <br>
                    Creates a new account for user with user_id
                    <br><br>
                    <b> GET /account/&ltaccount_id&gt </b> <br>
                    Get account by account_id
                    <br><br>
                    <b> GET /accounts/&ltuser_id&gt </b> <br>
                    Get all accounts owned by user with user_id
                </body>
            </html>
    """
    return html


# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.run(host="0.0.0.0", threaded=True, debug=True)