from flask import Blueprint, render_template, request
from .api import core

views = Blueprint("views", __name__)


@views.route("/")
def index():
    return render_template("ralis1.html")


@views.route("/ralis-2")
def ralis2():
    return render_template("ralis2.html")


@views.route("/chart")
def chart():
    return render_template("chart.html")


@views.route("/relay")
def relay():
    return render_template("relay.html")


# @views.route("/bali-battery")
# def bali_battery():
#     return render_template("site/bali-battery.html")


# @views.route("/bali-inverter")
# def bali_inverter():
#     return render_template("site/bali-inverter.html")


# @views.route("/bali-config", methods=["GET", "POST"])
# def bali_config():
#     if request.method == "GET":
#         return render_template("site/bali-config.html")
#     elif request.method == "POST":
#         return core.update_config_inverter1_bali()
#         # return render_template("site/config-bali.html")


@views.route("/melawai")
def melawai():
    return render_template("site/melawai.html")

@views.route("/melawai_tj6")
def melawai_tj6():
    return render_template("site/melawai_tj6.html")

@views.route("/melawai_kst31")
def melawai_kst31():
    return render_template("site/melawai_kst31.html")


@views.route("/wonogiri")
def wonogiri():
    return render_template("site/wonogiri.html")


@views.route("/pmacan")
def pulau_macan():
    return render_template("site/pulau_macan.html")