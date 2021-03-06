from flask import Flask, jsonify

application = Flask(__name__)
application.config['MYSQL_USER'] = 'admin'
application.config['MYSQL_PASSWORD'] = 'password'
application.config['MYSQL_HOST'] = 'razerdb.crzzgbmgexyn.ap-southeast-1.rds.amazonaws.com'
application.config['MYSQL_DB'] = 'db'
application.config['MYSQL_CURSORCLASS'] = 'DictCursor'
application.config['MYSQL_PORT'] = 3306
application.config['MYSQL_UNIX_SOCKET'] = None
application.config['MYSQL_CONNECT_TIMEOUT'] = 10
application.config['MYSQL_READ_DEFAULT_FILE'] = None
application.config['MYSQL_USE_UNICODE'] = True
application.config['MYSQL_CHARSET'] = 'utf8'
application.config['MYSQL_SQL_MODE'] = None

from api.user_controller import user_api
from api.account_controller import account_api
from api.fwd_controller import fwd_api
from api.skilltree_controller import skilltree_api
from api.quest_controller import quest_api

application.register_blueprint(user_api)
application.register_blueprint(account_api)
application.register_blueprint(fwd_api)
application.register_blueprint(skilltree_api)
application.register_blueprint(quest_api)

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
                    Request body: {firstname, lastname, email, password} <br>
                    Creates a new user
                    <br><br>
                    <b> GET /user/&ltuser_id&gt </b> <br>
                    Get user by user_id
                    <br><br>
                    <b> GET /user/all </b> <br>
                    Gets all users stored in db_lite for debugging
                    <br><br>
                    <b> POST /login </b> <br>
                    Request body: {email, password} <br>
                    Gets mambuid, firstname and lastname
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
    application.run(host="0.0.0.0", threaded=False, debug=True)