const render = async (data) => {
    const data_fetch = data.map(el => {
        const dateTime = new Date(el.created_at)
        const pad = (value) => value <= 9 ? `0${value}` : value
        const last_update =`${pad(dateTime.getDate())}/${pad(dateTime.getMonth()+1)}/${dateTime.getFullYear()} ${pad(dateTime.getHours())}:${pad(dateTime.getMinutes())}`
        pv_h1 = el.h1_pv_energy
        hr_h1 = el.h1_harvest_ratio
        etotal_h1 = el.h1_total_energy
        last_updated = last_update

        document.getElementById("pv_h1").innerHTML = pv_h1
        document.getElementById("hr_h1").innerHTML = hr_h1
        document.getElementById("etotal_h1").innerHTML = etotal_h1
        document.getElementById("last_update").innerHTML = last_updated
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
    // const temp_calc = [0,0]
    // for (let i = 0; i < temp_hr.length; i++) {
    //     let calc = Math.round(((temp_hr[i + 2] - temp_hr[i + 1]) + Number.EPSILON) * 100) / 100
    //     if (isNaN(calc)) {
    //         temp_calc.push(0)
    //     } else if (calc < 0) {
    //         temp_calc.push(0)
    //     } else {
    //         temp_calc.push(calc)
    //     }
    // }
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