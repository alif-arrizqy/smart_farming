const render = async (data) => {
    // console.info(data)
    document.getElementById('last_update').innerHTML = data.date + ' ' + data.time
    // HARVEST
    for (i = 1; i <= 4; i++) {
        document.getElementById(`mppt${i}`).innerHTML = data.harvest[`mppt${i}_harvest_energy`]
    }
    // ENJOY
    for (i = 1; i <= 3; i++) {
        document.getElementById(`chint${i}`).innerHTML = data.enjoy[`chint${i}_energy`]
    }

    // STORE
    temp_batt = []
    for (i = 1; i <= 24; i++) {
        dock = data.store[`dock${i}_battery_volt`]
        dock == undefined ? dock = 5555 : dock = dock
        temp_batt.push(dock)
    }
    console.info(temp_batt)
    var bordercolor = getComputedStyle(document.body).getPropertyValue('--bordercolor');
    var bodycolor = getComputedStyle(document.body).getPropertyValue('--bodycolor');
    var options = {
        responsive: true,
        tooltips: {
            enabled: true
        },
        legend: {
            display: false,
            position: 'top',
            labels: {
                fontColor: bodycolor
            }
        },
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    display: true,
                    color: bordercolor,
                    zeroLineColor: bordercolor
                },
                ticks: {
                    fontColor: bodycolor,
                },
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    display: false,
                    color: bordercolor,
                    zeroLineColor: bordercolor
                },
                ticks: {
                    fontColor: bodycolor,
                    suggestedMin: 0.0,
                    suggestedMax: 1
                }
            }]
        }
    };

    window.chartColors = {
        green: 'rgb(23, 170, 94)',
    };
    var color = Chart.helpers.color;


    let ctx = document.getElementById(`battery_store`).getContext('2d');
    window.myBar = new Chart(ctx, {
        type: 'bar',
        responsive: true,
        data: {
            labels: Array.from(Array(24).keys()),
            datasets: [{
                label: 'Battery Voltage',
                backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
                data: temp_batt,
            }]
        },
        options
    })
}