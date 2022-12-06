// ==================== VOLTAGE ====================
setInterval(() => {
    fetch('/api/voltage/')
        .then(response=>response.json())
        .then(data=> {
            const speedCanvas = document.getElementById("voltageChart");
            const dataFirst = {
                label: "PV Voltage1 (V)",
                data: data.data.data_voltage1,
                lineTension: 0,
                fill: false,
                borderColor: 'rgb(50,205,50)'
            };
            const dataSecond = {
                label: "PV Voltage2 (V)",
                data: data.data.data_voltage2,
                lineTension: 0,
                fill: false,
                borderColor: 'rgb(255,255,0)'
            };
            const voltageData = {
            labels: data.data.data_waktu,
            datasets: [dataFirst, dataSecond]
            };

            const chartOptions = {
            legend: {
                display: false,
            },
            scales:{
                    xAxes: [{
                        display: true //this will remove all the x-axis grid lines
                    }],
                }
            };

            const lineChart = new Chart(speedCanvas, {
            type: 'line',
            data: voltageData,
            options: chartOptions
            });

        })
    }, 3000)

// =============== Current PV 6 7 ======================
setInterval(()=>{
    fetch('/api/currentFirst/')
        .then(response=>response.json())
        .then(data=> {
            const currentFirstCanvas = document.getElementById("currentChart1");
            const dataFirst = {
                label: "PV Current PV6 (A)",
                data: data.data.data_current1,
                lineTension: 0,
                fill: false,
                borderColor: 'rgb(220, 20, 60)'
            };
            const dataSecond = {
                label: "PV Current PV7 (A)",
                data: data.data.data_current2,
                lineTension: 0,
                fill: false,
                borderColor: 'rgb(240,230,140)'
            };
            const currentFirstData = {
            labels: data.data.data_waktu,
            datasets: [dataFirst, dataSecond]
            };

            const chartOptions = {
            legend: {
                display: false,
            },
            scales:{
                    xAxes: [{
                        display: true //this will remove all the x-axis grid lines
                    }],
                }
            };

            const lineChart = new Chart(currentFirstCanvas, {
            type: 'line',
            data: currentFirstData,
            options: chartOptions
            });

        })
    }, 3000)


// =============== Current PV 9 10 ======================
setInterval(() => {
    fetch('/api/currentSecond/')
        .then(response=>response.json())
        .then(data=> {
            const currentSecondCanvas = document.getElementById("currentChart2");
            const dataFirst = {
                label: "PV Current PV9 (A)",
                data: data.data.data_current1,
                lineTension: 0,
                fill: false,
                borderColor: 'rgb(220,20,60)'
            };
            const dataSecond = {
                label: "PV Current PV10 (A)",
                data: data.data.data_current2,
                lineTension: 0,
                fill: false,
                borderColor: 'rgb(240,230,140)'
            };
            const currentSecondData = {
            labels: data.data.data_waktu,
            datasets: [dataFirst, dataSecond]
            };

            const chartOptions = {
            legend: {
                display: false,
            },
            scales:{
                    xAxes: [{
                        display: true //this will remove all the x-axis grid lines
                    }],
                }
            };

            const lineChart = new Chart(currentSecondCanvas, {
            type: 'line',
            data: currentSecondData,
            options: chartOptions
            });

        })
    }, 3000)

// ===================== Harvest Data ======================
setInterval(() => {
    fetch('/api/harvestData/')
        .then(response=>response.json())
        .then(data=>{
            for (let harvest = 0; harvest < 2; harvest++){
                document.getElementById(`cap_h${harvest}`).innerHTML = `${data.data.harvest_capacity[`${harvest}`]}`
                document.getElementById(`pv_h${harvest}`).innerHTML = `${data.data.energy_daily[`${harvest}`]}`
                document.getElementById(`hr_h${harvest}`).innerHTML = `${data.data.harvest_ratio[`${harvest}`]}`
                document.getElementById(`etotal_h${harvest}`).innerHTML = `${data.data.energy_total[`${harvest}`]/100}`
            } 
            // console.log(data.data.harvest_total)
            document.getElementById("cap_total").innerHTML = `${data.data.harvest_total[2]}`
            document.getElementById("pv_total").innerHTML = `${data.data.harvest_total[0]}`
            document.getElementById("hr_total").innerHTML = `${data.data.harvest_total[3]}`
            document.getElementById("etotal_total").innerHTML = `${data.data.harvest_total[1]/100}`
        })
    }, 5000)

