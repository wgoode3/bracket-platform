# How to deploy

### Step 1: get a server

Start an Ubuntu instance on AWS and SSH into the server

### Step 2: setup the server

Update your server and install some needed files

```
ubuntu@xxx.xxx.xxx.xxx:~$ sudo apt-get update
ubuntu@xxx.xxx.xxx.xxx:~$ sudo apt-get install python-pip python-dev nginx git mongodb npm
```

Use pip to install ```virtualenv```

```
ubuntu@xxx.xxx.xxx.xxx:~$ sudo pip install virtualenv
```

### Step 3: git the project 

Use git to clone this project onto the server (do not run this with sudo)

```
ubuntu@xxx.xxx.xxx.xxx:~$ git clone https://github.com/wgoode3/bracket-platform.git
```

After it downloads ```cd``` into the repository and set up the virtual environment

```
ubuntu@xxx.xxx.xxx.xxx:~$ cd bracket-platform
ubuntu@xxx.xxx.xxx.xxx:~$ virtualenv venv
ubuntu@xxx.xxx.xxx.xxx:~$ source venv/bin/activate
ubuntu@xxx.xxx.xxx.xxx:~$ pip install -r requirements.txt
ubuntu@xxx.xxx.xxx.xxx:~$ pip install gunicorn
```

Next we need to get the [bulma](https://bulma.io/) module from npm

```
ubuntu@xxx.xxx.xxx.xxx:~$ cd static
ubuntu@xxx.xxx.xxx.xxx:~$ npm install
ubuntu@xxx.xxx.xxx.xxx:~$ cd ~
```

### Step 4: Configure and set up ```gunicorn```

```
ubuntu@xxx.xxx.xxx.xxx:~$ sudo nano /etc/systemd/system/gunicorn.service
```

Copy in the following code and exit with ```ctrl + x``` then ```y``` then ```Enter```

```
[Unit]
Description=gunicorn daemon
After=network.target
[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/home/ubuntu/bracket-platform
ExecStart=/home/ubuntu/bracket-platform/venv/bin/gunicorn --workers 3 --bind unix:/home/ubuntu/bracket-platform.sock server:app
[Install]
WantedBy=multi-user.target
```

Next run the following lines of code

```
ubuntu@xxx.xxx.xxx.xxx:~$ sudo systemctl daemon-reload
ubuntu@xxx.xxx.xxx.xxx:~$ sudo systemctl start gunicorn
ubuntu@xxx.xxx.xxx.xxx:~$ sudo systemctl enable gunicorn
```

When you use ```ls``` you should see

```
ubuntu@xxx.xxx.xxx.xxx:~$ ls
bracket-platform  bracket-platform.sock
```

If you do not see the ```.sock``` file redo the previous steps until you do

### Step 5: Configure and set up ```nginx```

```
ubuntu@xxx.xxx.xxx.xxx:~$ sudo nano /etc/nginx/sites-available/bracket-platform
```

Copy in the following code and exit with ```ctrl + x``` then ```y``` then ```Enter```

Note: Where it says ```server_name XXX.XXX.XXX.XXX;``` change that to the public IP of your AWS server

```
server {
  listen 80;
  server_name XXX.XXX.XXX.XXX;
  location = /favicon.ico { access_log off; log_not_found off; }
  location /static/ {
      root /home/ubuntu/bracket-platform;
  }
  location / {
      include proxy_params;
      proxy_pass http://unix:/home/ubuntu/bracket-platform.sock;
  }
}
```

Next create a symbolic link of your ```nginx``` config

```
ubuntu@xxx.xxx.xxx.xxx:~$ sudo ln -s /etc/nginx/sites-available/bracket-platform /etc/nginx/sites-enabled
```

Next test your ```nginx``` config with. 

```
ubuntu@xxx.xxx.xxx.xxx:~$ sudo nginx -t
```
If it doesn't say it's ```ok``` redo the previous steps.

Next we'll remove some ```nginx``` defaults

```
ubuntu@xxx.xxx.xxx.xxx:~$ sudo rm /etc/nginx/sites-enabled/default
ubuntu@xxx.xxx.xxx.xxx:~$ sudo rm /etc/nginx/sites-available/default
```

After restarting ```nginx``` your deployment should be complete

```
ubuntu@xxx.xxx.xxx.xxx:~$ sudo service nginx restart
```
