import requests
import json

class MambuClient:
    def __init__(self):
        with open('config.json', 'r') as config_file:
            configs = json.load(config_file)
            self.team_name = configs['mambu']['team_name']
            self.password = configs['mambu']['password']
            self.endpoint = 'https://razerhackathon.sandbox.mambu.com/api/'

    def getClient(self, client_id):
        url = self.endpoint+'clients/'+str(client_id)
        print(url)
        r = requests.get(url, auth=(self.team_name, self.password))
        return r.json()

    def createClient(self, firstname, lastname):
        url = self.endpoint + 'clients'
        payload = {
                    "client": {
                        "firstName": firstname,
                        "lastName": lastname,
                        "preferredLanguage": "ENGLISH",
                        "notes": "Enjoys playing RPG",
                        "assignedBranchKey": '8a8e878e71c7a4d70171ca6befea1319'
                    },
                    "idDocuments": [
                        {
                            "identificationDocumentTemplateKey": "8a8e867271bd280c0171bf7e4ec71b01",
                            "issuingAuthority": "Immigration Authority of Singapore",
                            "documentType": "NRIC/Passport Number",
                            "validUntil": "2021-09-12",
                            "documentId": "S9812345A"
                        }
                    ],
                    "addresses": [],
                    "customInformation": [
                        {
                            "value":"Singapore",
                            "customFieldID":"countryOfBirth"
                            
                        }
                    ]
                }
        r = requests.post(url, json=payload, auth=(self.team_name, self.password))
        print(r.json())
        return(r.json())

    def getCurrentAccount(self, account_id):
        url = self.endpoint + 'savings/' + str(account_id)
        r = requests.get(url, auth=(self.team_name, self.password))
        print(r.json())

    def createCurrentAccount(self, clientid):
        url = self.endpoint + 'savings'
        payload = {
                    "savingsAccount": {
                        "name": "Digital Account",
                        "accountHolderType": "CLIENT",
                        "accountHolderKey": clientid,
                        "accountState": "APPROVED",
                        "productTypeKey": "8a8e878471bf59cf0171bf6979700440",
                        "accountType": "CURRENT_ACCOUNT",
                        "currencyCode": "SGD",
                        "allowOverdraft": "true",
                        "overdraftLimit": "100",
                        "overdraftInterestSettings": {
                            "interestRate": 5
                        },
                        "interestSettings": {
                            "interestRate": "1.25"
                        }
                    }
                }
        r = requests.post(url, json=payload, auth=(self.team_name, self.password))
        print(r.json())
        return(r.json())



mambu_client = MambuClient()
mambu_client.getClient('8a8e87b772175ada01721bfb9a42249b')