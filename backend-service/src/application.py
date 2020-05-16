from flask import Flask, jsonify

application = Flask(__name__)

from api.user_controller import user_api
from api.account_controller import account_api
from api.fwd_controller import fwd_api
from db_driver.db_driver import db_setup

db = db_setup(application) # Returns connection object if successful, else None

application.register_blueprint(user_api)
application.register_blueprint(account_api)
application.register_blueprint(fwd_api)

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
                <head>
                    <title>API Endpoints</title>
                    <h3>REfinance Backened API Endpoints</h3>
                </head>
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
                    <br><br>
                    <b> POST /fwd </b> <br>
                    Request body: {base64image} <br>
                    Get nric fields in base64 encoded image
                    <br><br>
                    <b style="color:red"> GET /skilltree/&ltuser_id&gt </b> <br>
                    Get the skilltree of the user with user_id
                    <br><br>
                    <b style="color:red"> POST /skilltree </b> <br>
                    Request body: {user_id, skilltree} <br>
                    Updates the skilltree of the user with user_id
                    <br><br>
                    <b style="color:red"> GET /quest/&ltuser_id&gt </b> <br>
                    Get quests of the user with user_id
                    <br><br>
                    <b style="color:red"> POST /quest </b> <br>
                    Request body: {user_id, skilltree} <br>
                    Updates the quests of the user with user_id
                </body>
            </html>
    """
    return html


# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.run(host="0.0.0.0", threaded=True, debug=True)