async function render(data) {
    // $('.modal').modal('hide');
    const main = document.getElementById("main")
    // console.log(data)
    const renderDom = data.map((el) => {
        // console.log(el.dock_data);
        const dateTime = new Date(el.created_at)
        const dock_v = Math.round(((el.dock_v / 1000) + Number.EPSILON) * 10) / 10
        let button_humidity, image_humidity, button_temperature, image_temperature, button_moisture, image_moisture;

        image_humidity = `<img src="static/images/humidity.png" style="height: 40%; width: 60%; margin-bottom: 10px;">`
        image_temperature = `<img src="static/images/temperature-control.png" style="height: 40%; width: 60%; margin-bottom: 10px;">`
        image_moisture = `<img src="static/images/moisturizing.png" style="height: 40%; width: 60%; margin-bottom: 10px;">`
        
        const pad = (value) => value <= 9 ? `0${value}` : value
        const created_at =
            `${pad(dateTime.getDate())}/${pad(dateTime.getMonth()+1)}/${dateTime.getFullYear()} ${pad(dateTime.getHours())}:${pad(dateTime.getMinutes())}`
        const pars_dock = JSON.parse(el.dock_data)
        // console.log(pars_dock.P);
        const renderTemp = pars_dock.T.map((temp) => `<th scope="col">${temp}</th>`).join('\n')
        const arrCell = Array.from(Array(14).keys())
        const headCell = arrCell.map((header_cell) => `<th scope="col">${ header_cell+1}</th>`).join('\n')
        const arrTemp = Array.from(Array(4).keys())
        const headTemp = arrTemp.map((header_temp) => `<th scope="col">${header_temp+1}</th>`).join('\n')
        return `        
            <div class="col-12 col-lg-4 col-xl-4 mt-3 mb-3">
                <div class="card text-center">
                    <div class="card-header">
                        <span class="h6 card-title"> Humidity </span>
                    </div>
                    <div class="card-body">
                        <div id="battery_image">${image_humidity}</div>
                        <h6 class="card-title font-weight-bold">${dock_v}</h6>
                        <p class="card-text mt-3">Last Update:<br />${created_at}</p>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-4 col-xl-4 mt-3 mb-3">
                <div class="card text-center">
                    <div class="card-header">
                        <span class="h6 card-title"> Temperature </span>
                    </div>
                    <div class="card-body">
                        <div id="battery_image">${image_temperature}</div>
                        <h6 class="card-title font-weight-bold">${dock_v}</h6>
                        <p class="card-text mt-3">Last Update:<br />${created_at}</p>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-4 col-xl-4 mt-3 mb-3">
                <div class="card text-center">
                    <div class="card-header">
                        <span class="h6 card-title"> Moisture </span>
                    </div>
                    <div class="card-body">
                        <div id="battery_image">${image_moisture}</div>
                        <h6 class="card-title font-weight-bold">${dock_v}</h6>
                        <p class="card-text mt-3">Last Update:<br />${created_at}</p>
                    </div>
                </div>
            </div>`
    })
    main.innerHTML = renderDom.join('\n')
}