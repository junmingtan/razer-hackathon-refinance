import sqlite3
from sqlite3 import Error

class DbLite:

    def __init__(self):
        conn = sqlite3.connect('./resources/dblite.db')
        c = conn.cursor()
        sql_create_user_table = """ CREATE TABLE IF NOT EXISTS users (
                                        email text PRIMARY KEY,
                                        password text,
                                        firstname text,
                                        lastname text,
                                        mambuid text
                                ); """ 
        c.execute(sql_create_user_table)
        conn.commit()

    def insertUser(self, data):
        conn = sqlite3.connect('./resources/dblite.db')
        c = conn.cursor()
        sql_insert_user = """ INSERT INTO users(email, password, firstname, lastname, mambuid)
                              VALUES(?,?,?,?,?)
                          """
        try:
            c.execute(sql_insert_user, data)
            conn.commit()
            conn.close()
            return (True, None)
        except Error as e:
            conn.close()
            return (False, e)
    
    def getUser(self, email):
        conn = sqlite3.connect('./resources/dblite.db')
        c = conn.cursor()
        try:
            c.execute('SELECT * FROM users WHERE email = ?', (email,))
            conn.close()
            return (True, c.fetchall())
        except Error as e:
            conn.close()
            return (False, e)
    
    def getAllUsers(self):
        conn = sqlite3.connect('./resources/dblite.db')
        c = conn.cursor()
        try:
            c.execute('SELECT * FROM users')
            conn.close()
            return (True, c.fetchall())
        except Error as e:
            conn.close()
            return (False, e)



db_lite = DbLite()

if __name__ == "__main__":
    db_lite.insertUser(('a','b','c','d','e'))
    print(db_lite.getUser('a'))


    