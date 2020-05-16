from application import db

class Db_driver:
    def __init__(self):
        self.db_conn = db

    def get_skill_tree(self, uid):
        '''
        Takes the db connection object and uid as input.
        Returns a dictionary where key = type of skill tree (travel, food, retail) 
        and value is a dictionary with the fields required
        Example return object:
        full_skill_tree = {
            "travel" : {                # where type is travel, food or retail
                "novice" : [            # where category is "none", novice etc
                    {
                        "pid" : 3,
                        "name" : "",
                        "description" : "",
                        "active" : "https://flaticon.com/xyz",
                        "inactive" : "https://flaticon.com/abc",
                        "is_active" : True,
                        "min_level" : 2
                    },
                    {
                        "pid" : 5,
                        "name" : "",
                        "description" : "",
                        "active" : "https://flaticon.com/xyz",
                        "inactive" : "https://flaticon.com/abc",
                        "is_active" : False,
                        "min_level" : 8
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
                    "inactive": item['inactive_url'],
                    "min_level" : item['min_level']
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


        cur = self.db_conn.connection.cursor()
        user_perk_query = "select pid from perk where uid = '%s'" % (uid)
        cur.execute(user_perk_query)
        user_perk_result = list(cur.fetchall())
        user_perk_result = {item for item in user_perk_result} # creates a set of perk ids 

        travel_query = "select * from perk where `type` = 'travel'"
        cur.execute(travel_query)
        travel_result = list(cur.fetchall())
        travel = helper(travel_result, user_perk_result)

        food_query = "select * from perk where `type` = 'food'"
        cur.execute(food_query)
        food_result = list(cur.fetchall())
        food = helper(food_result, user_perk_result)

        retail_query = "select * from perk where `type` = 'retail'"
        cur.execute(retail_query)
        retail_result = list(cur.fetchall())
        retail = helper(retail_result, user_perk_result)

        full_skill_tree = {}
        full_skill_tree['travel'] = travel
        full_skill_tree['food'] = food
        full_skill_tree['retail'] = retail
        return full_skill_tree


    def update_skill_tree(self, uid, pid):
        '''
        Updates the user_perk table by inserting new uid, pid entries
        Returns ??? #TODO: confirm return value
        '''
        cur = self.db_conn.connection.cursor()
        insert_query = "insert into user_perk (uid, pid) values ('%s', %d)" % (uid, pid)
        cur.execute(insert_query)
        self.db_conn.connection.commit()
        return None


    def get_quest(self):
        cur = self.db_conn.connection.cursor()
        quest_query = "select * from quest"
        cur.execute(quest_query)
        quests = list(cur.fetchall())
        return quests

    def get_user_quest(self, uid):
        cur = self.db_conn.connection.cursor()
        user_quest_query = "select uid, pid, progress, clear_condition, completed from user_quest where uid = '%s'" % (uid)
        cur.execute(user_quest_query)
        user_quest_result = list(cur.fetchall())
        for item in user_quest_result:
            item['completed'] = True if item['completed'] > 0 else False
        return user_quest_result

    def get_level(self):
        cur = self.db_conn.connection.cursor()
        level_query = "select * from level"
        cur.execute(level_query)
        levels = list(cur.fetchall())
        return levels

    def get_user(self, uid):
        cur = self.db_conn.connection.cursor()
        user_query = '''select * from `user` where uid = "%s"''' % (uid)
        cur.execute(user_query)
        user = list(cur.fetchall())[0]
        return user

    def update_user(self, uid, new_user):
        '''
        This method is used both for initial insert and also for actual updates
        returns #TODO: discuss on return type
        '''
        cur = self.db_conn.connection.cursor()
        delete_query = '''delete from `user` where uid = "%s"''' % (uid)
        cur.execute(delete_query)
        insert_query = '''insert into `user` (uid, first_name, last_name, user_level, exp_earned, skill_point) values (%s, %s, %s, %d, %d, %d)'''
        data = (new_user["user_id"], new_user["first_name"], new_user["last_name"], new_user["user_level"], new_user["exp_earned"], new_user["skill_point"])
        cur.execute(insert_query, data)
        self.db_conn.commit()
        return None

    def update_user_quest(self, new_user_quest):
        cur = self.db_conn.connection.cursor()
        quest_query = "select * from quest where qid = %d" % (new_user_quest["qid"])
        cur.execute(quest_query)
        quest = list(cur.fetchall())[0]
        clear_condition = quest["clear_condition"]
        insert_query = '''insert into user_quest (uid, qid, progress, clear_condition, completed) values (%s, %d, %d, %d, %d)'''
        data = (new_user_quest["uid"], new_user_quest["qid"], new_user_quest["progress"], clear_condition, new_user_quest["completed"])
        cur.execute(insert_query, data)
        self.db_conn.commit()
        return None


db_driver = Db_driver()