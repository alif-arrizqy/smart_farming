const getHumidty = async (data) => {
    document.getElementById("valueHumidity").innerHTML = data.data.value;
    document.getElementById("createdAtHumidity").innerHTML = data.data.created_at;
}

const getTemperature = async (data) => {
    document.getElementById("valueTemperature").innerHTML = data.data.value;
    document.getElementById("createdAtTemperature").innerHTML = data.data.created_at;
}

const getMoisture = async (data) => {
    document.getElementById("valueMoisture").innerHTML = data.data.value;
    document.getElementById("createdAtMoisture").innerHTML = data.data.created_at;
}