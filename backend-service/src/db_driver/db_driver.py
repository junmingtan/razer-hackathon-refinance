from flask_mysqldb import MySQL

def db_setup(application):
    application.config['MYSQL_USER'] = 'admin'
    application.config['MYSQL_PASSWORD'] = 'password'
    application.config['MYSQL_HOST'] = 'razerdb.crzzgbmgexyn.ap-southeast-1.rds.amazonaws.com'
    application.config['MYSQL_DB'] = 'razerdb'
    application.config['MYSQL_CURSORCLASS'] = 'DictCursor'

    return MySQL(application)

def get_skill_tree(db_conn, uid):
    '''
    Takes the db connection object and uid as input.
    Returns a dictionary where key = type of skill tree (travel, food, retail) 
    and value is a dictionary with the fields required
    Example return object:
    full_skill_tree = {
        "travel" : {                # where type is travel, food or retail
            "novice" : [            # where category is none, novice etc
                {
                    "pid" : 3,
                    "name" : "",
                    "description" : "",
                    "active" : "https://flaticon.com/xyz",
                    "inactive" : "https://flaticon.com/abc",
                    "is_active" : True
                },
                {
                    "pid" : 5,
                    "name" : "",
                    "description" : "",
                    "active" : "https://flaticon.com/xyz",
                    "inactive" : "https://flaticon.com/abc",
                    "is_active" : False
                }
            ]
        }
    }
    '''
    def helper(results_list, user_perk_result):
        '''
        Helper method to generate dictionaries for each query.
        Takes a list of dictionary items as input.
        Returns a dictionary where key is the categories of each skill tree
        and value is a dictionary where
        key is name of resource element, e.g. Airplane, Bus
        and value are the fields required
        '''
        categories = {}
        for item in results_list:
            if item['category'] is None:
                item['category'] = "none"
            elements = categories.get(item['category'], [])     # Return empty list if not in categories
            new_item = {
                "pid" : item['pid'],
                "name" : item['name'],
                "active": item['active_url'],
                "inactive": item['inactive_url']
            }
            if item['pid'] in user_perk_result:
                new_item["is_active"] = True
            else:
                new_item["is_active"] = False
            if item['description'] is None:
                new_item["description"] = ""
            else:
                new_item["description"] = item["description"]
            elements.append(new_item)
            categories[item['category']] = elements
        return categories


    cur = db_conn.connection.cursor()
    user_perk_query = "select pid from perk where uid = %s" % (uid)
    cur.execute(user_perk_query)
    user_perk_result = list(cur.fetchall())
    user_perk_result = {item for item in user_perk_result} # creates a set of perk ids 

    travel_query = "select * from perk where type = 'travel'"
    cur.execute(travel_query)
    travel_result = list(cur.fetchall())
    travel = helper(travel_result, user_perk_result)

    food_query = "select * from perk where type = 'food'"
    cur.execute(food_query)
    food_result = list(cur.fetchall())
    food = helper(food_result, user_perk_result)

    retail_query = "select * from perk where type = 'retail'"
    cur.execute(retail_query)
    retail_result = list(cur.fetchall())
    retail = helper(retail_result, user_perk_result)

    full_skill_tree = {}
    full_skill_tree['travel'] = travel
    full_skill_tree['food'] = food
    full_skill_tree['retail'] = retail
    return full_skill_tree

