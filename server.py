from flask import Flask, render_template as render, redirect, request, session, flash, jsonify
from db_connection import Db_connection
from datetime import datetime

app            = Flask(__name__)
app.secret_key = "wqeelkmdsnbnuizapajvdpoji"
app.name       = "bracket"
db             = Db_connection(app)

@app.route("/")
def leaderboard():
    if "user_id" in session:
        user = db.getUser(session["user_id"])[0]
    else:
        user = None
    return render("leaderboard.html", users=db.getUsers(), user=user)

@app.route("/sign_up")
def signUp():
    return render("signUp.html")

@app.route("/register", methods=["POST"])
def register():
    u = db.register(request.form)
    if isinstance(u, list):
        for error in u:
            flash(error)
        return redirect("/sign_up")
    else:
        session["user_id"] = str(u)
        return redirect("/bracket/new")

@app.route("/login", methods=["POST"])
def login():
    u = db.login(request.form)
    if isinstance(u, list):
        for error in u:
            flash(error)
        return redirect("/sign_in")
    else:
        session["user_id"] = str(u[0]["_id"])
        user = db.getUser(session["user_id"])[0]
        if user["admin"]:
            return redirect("/admin")
        elif user["bracket"] != None:
            return redirect("/")
        else:
            return redirect("/bracket/new")

@app.route("/sign_in")
def signIn():
    return render("signIn.html")

@app.route("/logout")
def logout():
    session.clear()
    flash("You have successfully signed out")
    return redirect("/")

@app.route("/admin")
def admin():

    if "user_id" not in session:
        flash("You need to <a href='/sign_up'>sign in</a> to go there")
        return redirect("/")
    else:
        user = db.getUser(session["user_id"])[0]
        if not user["admin"]:
            flash("You are not the admin")
            return redirect("/")

    return render("admin.html", user=user)

@app.route("/admin/calculate", methods=["POST"])
def calculate():
    user = db.getUser(session["user_id"])[0]
    if user["admin"]:
        bracket = user["bracket"]
        users = db.getUsers()
        for u in users:
            if u["bracket"] == None:
                print("user {} has not filled out a bracket yet".format(u["username"]))
            else:
                # print(u)
                print u["username"]
                score = 0
                for i in range(len(bracket)):
                    if bracket[i] == u["bracket"][i]:
                        # score based on what round the prediction is in
                        score += 2**(6-bracket[i]["round"])
                print score
                db.updateScore(score, u["_id"])
            # print(users)
    return redirect("/admin")

@app.route("/bracket/new")
def new_bracket():
    # check if the games have already started
    if datetime.now() > datetime.strptime("2018-03-15 12:15", "%Y-%m-%d %H:%M"):
        flash("The tournament has begun, you cannot fill out a bracket now")
        return redirect("/") 

    if "user_id" not in session:
        flash("Welcome friend, please <a href='/sign_up'>sign in</a> before you fill out a bracket")
        return redirect("/")
    else:
        user = db.getUser(session["user_id"])[0]
        if user["bracket"] != None:
            flash("You already filled out a bracket")
            return redirect("/")

    return render("bracket.html", user=user)

@app.route("/bracket", methods=["POST"])
def bracket():

    if "user_id" not in session:
        flash("You need to <a href='/sign_up'>sign in</a> to go there")
        return redirect("/")
    else:
        user = db.getUser(session["user_id"])[0]
        if not user["admin"] and datetime.now() > datetime.strptime("2018-03-13 12:15", "%Y-%m-%d %H:%M"):
            flash("The tournament has begun, you cannot fill out a bracket now")
            return jsonify({"status": 200})

    db.saveBracket(request.data, session["user_id"])
    return jsonify({"status": 200})

@app.route("/user/<_id>")
def user(_id):
    user = db.getUser(_id)[0]
    return jsonify({"status": 200, "data": user['bracket']})

app.run(debug=True, host="0.0.0.0")
