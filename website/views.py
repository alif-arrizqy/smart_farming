from flask import Blueprint, render_template, request

views = Blueprint("views", __name__)


@views.route("/")
def index():
    return render_template("home.html")


@views.route("/humidity")
def humidity():
    return render_template("data_sensor/humidity.html")


@views.route("/temperature")
def temperature():
    return render_template("data_sensor/temperature.html")


@views.route("/moisture")
def moisture():
    return render_template("data_sensor/moisture.html")
