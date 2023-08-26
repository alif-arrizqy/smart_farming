from flask import Blueprint, render_template, request

views = Blueprint("views", __name__)


@views.route("/")
def index():
    return render_template("home.html")


@views.route("/tanaman")
def tanaman():
    return render_template("data_tanaman/tanaman.html")