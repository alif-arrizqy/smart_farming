const getTanamanData = async (data) => {
  document.getElementById("valueTemperature").innerHTML = data.data.temperature;
  document.getElementById("valueMoisture").innerHTML = data.data.moisture;
  const valueFuzzy = data.data.fuzzy;
  if (valueFuzzy < 20) {
    document.getElementById("valueFuzzy").innerHTML = "Air Mengalir Cepat";
  } else if (valueFuzzy > 21 || valueFuzzy < 50) {
    document.getElementById("valueFuzzy").innerHTML = "Air Mengalir Normal";
  } else if (output > 51) {
    document.getElementById("valueFuzzy").innerHTML = "Air Mengalir Lambat";
  }
};

setInterval(() => {
  axios
      .get("http://localhost:5100/api/tanaman", (timeout = 1000))
      .then((response) => {
          getTanamanData(response.data);
      })
      .catch((error) => {
          console.log(error);
      });
}, 5000)

setTimeout(() => {
  axios
      .get("http://localhost:5100/api/tanaman", (timeout = 1000))
      .then((response) => {
          getTanamanData(response.data);
      })
      .catch((error) => {
          console.log(error);
      });
}, 3000);