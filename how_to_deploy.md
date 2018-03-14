# How to deploy

### Step 1: get a server

Start an Ubuntu instance on AWS and SSH into the server

### Step 2: setup the server

Update your server and install some needed files

```shell
ubuntu@xxx.xxx.xxx.xxx:~$ sudo apt-get update
ubuntu@xxx.xxx.xxx.xxx:~$ sudo apt-get install python-pip python-dev nginx git mongodb npm
```

Use pip to install ```virtualenv```

```shell
ubuntu@xxx.xxx.xxx.xxx:~$ sudo pip install virtualenv
```

### Step 3: git the project 

Use git to clone this project onto the server (do not run this with sudo)

```shell
ubuntu@xxx.xxx.xxx.xxx:~$ git clone https://github.com/wgoode3/bracket-platform.git
```

After it downloads ```cd``` into the repository and set up the virtual environment

```shell
ubuntu@xxx.xxx.xxx.xxx:~$ cd bracket-platform
ubuntu@xxx.xxx.xxx.xxx:~$ virtualenv venv
ubuntu@xxx.xxx.xxx.xxx:~$ source venv/bin/activate
ubuntu@xxx.xxx.xxx.xxx:~$ pip install -r requirements.txt
ubuntu@xxx.xxx.xxx.xxx:~$ pip install gunicorn
```

Next we need to get the [bulma](https://bulma.io/) module from npm

```shell
ubuntu@xxx.xxx.xxx.xxx:~$ cd static
ubuntu@xxx.xxx.xxx.xxx:~$ npm install
ubuntu@xxx.xxx.xxx.xxx:~$ cd ~
```

### Step 4: Configure and set up ```gunicorn```

```shell
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

```shell
ubuntu@xxx.xxx.xxx.xxx:~$ sudo systemctl daemon-reload
ubuntu@xxx.xxx.xxx.xxx:~$ sudo systemctl start gunicorn
ubuntu@xxx.xxx.xxx.xxx:~$ sudo systemctl enable gunicorn
```

If you use ```ls```, you should see

```shell
ubuntu@xxx.xxx.xxx.xxx:~$ ls
bracket-platform   bracket-platform.sock
```

If you do not see the ```.sock``` file redo the previous steps until you do

### Step 5: Configure and set up ```nginx```

```shell
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

```shell
ubuntu@xxx.xxx.xxx.xxx:~$ sudo ln -s /etc/nginx/sites-available/bracket-platform /etc/nginx/sites-enabled
```

Next rest your ```nginx``` config with. If it doesn't say it's ```ok``` redo the previous steps

```shell
ubuntu@xxx.xxx.xxx.xxx:~$ sudo nginx -t
```

Next we'll remove some nginx defaults

```shell
ubuntu@xxx.xxx.xxx.xxx:~$ sudo rm /etc/nginx/sites-enabled/default
ubuntu@xxx.xxx.xxx.xxx:~$ sudo rm /etc/nginx/sites-available/default
```

After restarting nginx our deployment should be complete

```shell
ubuntu@xxx.xxx.xxx.xxx:~$ ubuntu@54.162.31.253:~$ sudo service nginx restart
```
