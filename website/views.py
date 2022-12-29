from flask import Blueprint, render_template, request

views = Blueprint("views", __name__)


@views.route("/")
def index():
    return render_template("home.html")


@views.route("/cabai")
def cabai():
    return render_template("data_tanaman/cabai.html")


@views.route("/tomat")
def tomat():
    return render_template("data_tanaman/tomat.html")


@views.route("/terung")
def terung():
    return render_template("data_tanaman/terung.html")
