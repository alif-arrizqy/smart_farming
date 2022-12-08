from flask import Blueprint, render_template, request
from .api import core

views = Blueprint("views", __name__)


@views.route("/")
def index():
    return render_template("home.html")


@views.route("/humidity")
def ralis2():
    return render_template("data_sensor/humidity.html")


@views.route("/temperature")
def chart():
    return render_template("data_sensor/temperature.html")


@views.route("/moisture")
def relay():
    return render_template("data_sensor/moisture.html")
