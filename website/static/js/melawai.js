const render = async (data) => {
    const data_fetch = data.map(el => {
        cap_h1 = el.h1_capacity
        pv_h1 = el.h1_pv_energy
        hr_h1 = el.h1_harvest_ratio
        etotal_h1 = el.h1_energy_total
        cap_h2 = el.h2_capacity
        pv_h2 = el.h2_pv_energy
        hr_h2 = el.h2_harvest_ratio
        etotal_h2 = el.h2_energy_total
        cap_total = el.total_capacity
        pv_total = el.total_pv_energy
        hr_total = el.total_harvest_ratio
        etotal_total = el.total_energy_total

        document.getElementById("cap_h1").innerHTML = cap_h1
        document.getElementById("pv_h1").innerHTML = pv_h1
        document.getElementById("hr_h1").innerHTML = hr_h1
        document.getElementById("etotal_h1").innerHTML = etotal_h1
        document.getElementById("cap_h2").innerHTML = cap_h2
        document.getElementById("pv_h2").innerHTML = pv_h2
        document.getElementById("hr_h2").innerHTML = hr_h2
        document.getElementById("etotal_h2").innerHTML = etotal_h2
        document.getElementById("cap_total").innerHTML = cap_total
        document.getElementById("pv_total").innerHTML = pv_total
        document.getElementById("hr_total").innerHTML = hr_total
        document.getElementById("etotal_total").innerHTML = etotal_total
    })
}

// ===================== Grafik HR Hourly =====================
const renderHourlyGraph = async (datas) => {
    const temp_hr = []
    datas.map((el) => {
        const data_hr = el.harvest_ratio
        // console.log(data_hr)
        temp_hr.push(data_hr)
    })
    console.log(temp_hr)
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


    let ctx = document.getElementById(`hourly-graph`).getContext('2d');
    window.myBar = new Chart(ctx, {
        type: 'bar',
        responsive: true,
        data: {
            labels: Array.from(Array(24).keys()),
            datasets: [{
                label: 'Harvest Ratio',
                backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
                data: temp_hr,
            }]
        },
        options
    })
}

// ===================== Grafik HR Daily =====================
const renderDailyGraph = async (datas) => {
    const temp_hr = []
    datas.map((el) => {
        const data_hr = el.harvest_ratio
        temp_hr.push(data_hr)
    })
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
                    suggestedMin: 0,
                    suggestedMax: 5
                }
            }]
        }
    };

    window.chartColors = {
        green: 'rgb(23, 170, 94)',
    };
    var color = Chart.helpers.color;

    const temp_date = []
    const arr = Array.from(Array(31).keys())
    const arrDate = arr.map((el) => {
        const tgl = el + 1
        temp_date.push(tgl)
    })
    let ctx = document.getElementById(`daily-graph`).getContext('2d');
    window.myBar = new Chart(ctx, {
        type: 'bar',
        responsive: true,
        data: {
            labels: temp_date,
            datasets: [{
                label: 'Harvest Ratio',
                backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
                data: temp_hr,
            }]
        },
        options
    })
}