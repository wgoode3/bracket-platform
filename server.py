from flask import Flask, render_template as render, redirect, request, session, flash, jsonify
from db_connection import Db_connection

app            = Flask(__name__)
app.secret_key = "wqeelkmdsnbnuizapajvdpoji"
app.name       = "bracket"
db             = Db_connection(app)

@app.route("/")
def leaderboard():
    return render("leaderboard.html", users=db.getUsers())

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
        return redirect("/sign_up")
    else:
        session["user_id"] = str(u[0]["_id"])
        user = db.getUser(session["user_id"])[0]
        if user["admin"]:
            return redirect("/admin")
        elif user["bracket"] != None:
            return redirect("/")
        else:
            return redirect("/bracket/new")

@app.route("/logout")
def logout():
    session.clear()
    flash("You have successfully signed out")
    return redirect("/")

@app.route("/admin")
def admin():
    if "user_id" not in session:
        flash("You need to <a href='/sign_up'>sign in</a> as an admin to be here")
        return redirect("/")
    else:
        user = db.getUser(session["user_id"])[0]
        if not user["admin"]:
            flash("You are not the admin")
            return redirect("/")

    return render("admin.html", user=user)

@app.route("/bracket/new")
def new_bracket():
    if "user_id" not in session:
        flash("Welcome friend, please <a href='/sign_up'>sign in</a> to fill out a bracket")
        return redirect("/")
    else:
        user = db.getUser(session["user_id"])[0]
        if user["bracket"] != None:
            flash("You already filled out a bracket")
            return redirect("/")

    return render("bracket.html", user=user)

@app.route("/bracket", methods=["POST"])
def bracket():
    print db.saveBracket(request.data, session["user_id"])
    return jsonify({"status": 200})

app.run(debug=True)