import requests
import json

class MambuClient:

    def __init__(self):
        with open('../config.json', 'r') as config_file:
            configs = json.load(config_file)
            self.team_name = configs['mambu']['team_name']
            self.password = configs['mambu']['password']
            self.endpoint = 'https://razerhackathon.sandbox.mambu.com/api/'

    def getClient(self, client_id):
        url = self.endpoint+'clients/'+str(client_id)
        print(url)
        r = requests.get(url, auth=(self.team_name, self.password))
        print(r.json())

    def getCurrentAccount(self, account_id):
        url = self.endpoint + 'savings/' + str(account_id)
        r = requests.get(url, auth=(self.team_name, self.password))
        print(r.json())



mambu_client = MambuClient()
mambu_client.getCurrentAccount('WJKI761')