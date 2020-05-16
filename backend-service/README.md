# backend-service

### Setup Virtual Environment
```
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt 
```

### Deactivate Virtual Environment
```
deactivate
```

### Connecting to ec2 server
```
ssh -i "ee-default-keypair.pem" ubuntu@ec2-18-141-192-58.ap-southeast-1.compute.amazonaws.com
```

### Start system daemon
Daemon should be started automatically on network connection
```
sudo systemctl start refinance-backend
```

### Restart system daemon
```
sudo systemctl restart refinance-backend
```

### Stop system daemon
```
sudo systemctl stop refinance-backend
```

### Check daemon logs
```
journalctl -u refinance-backend -f
```