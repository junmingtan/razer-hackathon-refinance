from flask_mysqldb import MySQL

def db_setup(application):
    application.config['MYSQL_USER'] = 'admin'
    application.config['MYSQL_PASSWORD'] = 'password'
    application.config['MYSQL_HOST'] = 'razerdb.crzzgbmgexyn.ap-southeast-1.rds.amazonaws.com'
    application.config['MYSQL_DB'] = 'db'
    application.config['MYSQL_CURSORCLASS'] = 'DictCursor'

    return MySQL(application)
