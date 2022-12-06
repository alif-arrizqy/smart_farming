from http import client
import json
from flask import Flask, jsonify, Blueprint, request, render_template
from pymongo import MongoClient
from datetime import date, datetime

client = MongoClient()

client = MongoClient(f"mongodb+srv://ongrid:sundayaongrid@cluster0.meftb.mongodb.net/melawai_tj6?retryWrites=true&w=majority")
db_tj6 = client['melawai_tj6']
collection_pv_tj6 = db_tj6.pv
collection_hour_tj6 = db_tj6.hour

db_kst31 = client['melawai_kst31']
collection_hour_kst31 = db_kst31.hour


today = date.today()
today = today.strftime("%d/%m/%Y")

api = Blueprint("api", __name__)
app = Flask(__name__)

@api.route("/api/voltage/", methods=["GET"])
def voltage():
    single_pv = collection_pv_tj6.find()
    list_voltage1 = []
    list_voltage2 = []
    list_waktu = []
    for i in single_pv:
        get_datetime = i.get("date_time")[:10]
        if get_datetime == today:
            get_pv = i.get("pv")
            waktu = i.get("date_time")
            list_waktu.append(waktu)

            get_voltage = get_pv["voltage"]
            for k, v in enumerate(get_voltage):
                if k == 0:
                    list_voltage1.append(v)
                else:
                    list_voltage2.append(v)

    datas = {
        'data_voltage1': list_voltage1,
        'data_voltage2': list_voltage2,
        'data_waktu': list_waktu
    }
    return jsonify(data=datas)


@api.route("/api/currentFirst/", methods=["GET"])
def currentFirst():
    single_pv = collection_pv_tj6.find()
    list_current1 = []
    list_current2 = []
    list_waktu = []
    for i in single_pv:
        get_datetime = i.get("date_time")[:10]
        if get_datetime == today:
            get_pv = i.get("pv")
            waktu = i.get("date_time")
            list_waktu.append(waktu)

            get_current = get_pv["current"]
            for k, v in enumerate(get_current):
                if k == 0:
                    list_current1.append(v)
                if k == 1:
                    list_current2.append(v)

    datas = {
        'data_current1': list_current1,
        'data_current2': list_current2,
        'data_waktu': list_waktu
    }
    return jsonify(data=datas)


@api.route("/api/currentSecond/", methods=["GET"])
def currentSecond():
    single_pv = collection_pv_tj6.find()
    list_current1 = []
    list_current2 = []
    list_waktu = []
    for i in single_pv:
        get_datetime = i.get("date_time")[:10]
        if get_datetime == today:
            get_pv = i.get("pv")
            waktu = i.get("date_time")
            list_waktu.append(waktu)

            get_current = get_pv["current"]
            for k, v in enumerate(get_current):
                if k == 2:
                    list_current1.append(v)
                if k == 3:
                    list_current2.append(v)

    datas = {
        'data_current1': list_current1,
        'data_current2': list_current2,
        'data_waktu': list_waktu
    }
    return jsonify(data=datas)


@api.route("/api/harvestData/", methods=["GET"])
def harvest_data():
    harvest = collection_hour_tj6.find().sort("date_time", -1).limit(1)
    for i in harvest:
        get_datetime = i.get("date_time")[:10]
        if get_datetime == today:
            get_harvest = i.get("harvest")
        
        datas = {
            "energy_daily": get_harvest.get("energy_daily"),
            "energy_total": get_harvest.get("energy_total"),
            "harvest_capacity": get_harvest.get("harvest_capacity"),
            "harvest_ratio": get_harvest.get("harvest_ratio"),
            "harvest_total": get_harvest.get("harvest_total"),
        }
        return jsonify(data=datas)


@api.route("/api/harvestDataKST31/", methods=["GET"])
def harvest_data_kst31():
    harvest = collection_hour_kst31.find().sort("date_time", -1).limit(1)
    for i in harvest:
        get_datetime = i.get("date_time")[:10]
        if get_datetime == today:
            get_harvest = i.get("harvest")
        
        datas = {
            "energy_daily": get_harvest.get("energy_daily"),
            "energy_total": get_harvest.get("energy_total"),
            "harvest_capacity": get_harvest.get("harvest_capacity"),
            "harvest_ratio": get_harvest.get("harvest_ratio"),
            "harvest_total": get_harvest.get("harvest_total"),
        }
        return jsonify(data=datas)



