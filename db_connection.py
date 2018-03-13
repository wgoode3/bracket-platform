from flask_pymongo import PyMongo
import bson
import bcrypt
import re
import json

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

class Db_connection(object):
    def __init__(self, app):
        self.mongo = PyMongo(app)

    def register(self, data):

        errors = []

        if len(data["username"]) < 1:
            errors.append("Username is required")
        elif len(data["username"]) < 3:
            errors.append("Username must be 3 characters or longer")
        else:
            u = self.mongo.db.users.find({"username": data["username"].lower()})
            if u.count() > 0:
                errors.append("Username already in use")

        if len(data["email"]) < 1:
            errors.append("Email is required")
        elif not EMAIL_REGEX.match(data["email"]):
            errors.append("Invalid Email")
        else:
            u = self.mongo.db.users.find({"email": data["email"].lower()})
            if u.count() > 0:
                errors.append("Email already in use")

        if len(data["password"]) < 1:
            errors.append("Password is required")
        elif len(data["password"]) < 8:
            errors.append("Password must be 8 characters or longer")

        if len(data["confirm"]) < 1:
            errors.append("Confirm Password is required")
        elif data["password"] != data["confirm"]:
            errors.append("Confirm Password must match Password")

        if len(errors) < 1:
            result = self.mongo.db.users.insert({
                "username": data["username"],
                "email": data["email"].lower(),
                "password": bcrypt.hashpw(data["password"].encode(), bcrypt.gensalt()),
                "admin": False,
                "bracket": None,
                "score": 0
            })
            return result
        
        return errors

    def login(self, data):
        
        errors = []

        if len(data["username"]) < 1:
            errors.append("Username is required")
        elif len(data["username"]) < 3:
            errors.append("Username must be 3 characters or longer")
        else:
            u = self.mongo.db.users.find({"username": data["username"]})
            if u.count() == 0:
                errors.append("Username not found")

        if len(data["password"]) < 1:
            errors.append("Password is required")
        elif len(data["password"]) < 8:
            errors.append("Password must be 8 characters or longer")

        if len(errors) < 1:
            if not bcrypt.hashpw(data["password"].encode(), u[0]["password"].encode()) == u[0]["password"].encode():
                errors.append("Incorrect Password")
            else:
                return u

        return errors

    def getUser(self, _id):
        return self.mongo.db.users.find(
            {"_id": bson.objectid.ObjectId(_id)}
        )

    def getUsers(self):
        users = self.mongo.db.users.find({"admin": False})
        return sorted([dict(u) for u in users], key=lambda u: -u["score"])

    def saveBracket(self, data, _id):
        return self.mongo.db.users.update(
            {"_id": bson.objectid.ObjectId(_id)}, 
            {"$set": json.loads(data)}
        )

    def updateScore(self, score, _id):
        return self.mongo.db.users.update(
            {"_id": bson.objectid.ObjectId(_id)}, 
            {"$set": {"score": score}}
        )