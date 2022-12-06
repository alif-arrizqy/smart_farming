async function render(data) {
    // $('.modal').modal('hide');
    const main = document.getElementById("main")
    // console.log(data)
    const renderDom = data.map((el) => {
        // console.log(el.dock_data);
        const dateTime = new Date(el.created_at)
        const dock_v = Math.round(((el.dock_v / 1000) + Number.EPSILON) * 10) / 10
        let image, button;

        if (dock_v != 100) {
            if (dock_v >= 42) {
                button = `<button type="button" class="btn btn-success">Full Battery</button>`
                image = `<img src="static/images/status.png" style="height: 40%; width: 80%; margin-bottom: 10px;">`
            } else if (dock_v >= 40) {
                button = `<button type="button" class="btn btn-warning">Half Battery</button>`
                image = `<img src="static/images/half-battery.png" style="height: 40%; width: 80%; margin-bottom: 10px;">`
            } else if (dock_v <= 39.9) {
                button = `<button type="button" class="btn btn-danger">Low Battery</button>`
                image = `<img src="static/images/low-battery.png" style="height: 40%; width: 80%; margin-bottom: 10px;">`
            }
        } else {
            button = `<button type="button" class="btn btn-dark">Dock is Off</button>`
            image = `<img src="static/images/no-battery.png" style="height: 40%; width: 80%; margin-bottom: 10px;">`
        }
        const pad = (value) => value <= 9 ? `0${value}` : value
        const created_at =
            `${pad(dateTime.getDate())}/${pad(dateTime.getMonth()+1)}/${dateTime.getFullYear()} ${pad(dateTime.getHours())}:${pad(dateTime.getMinutes())}`
        const pars_dock = JSON.parse(el.dock_data)
        // console.log(pars_dock.P);
        const renderCell = pars_dock.C.map((cell) => `<th scope="col">${cell}</th>`).join('\n')
        const renderTemp = pars_dock.T.map((temp) => `<th scope="col">${temp}</th>`).join('\n')
        const arrCell = Array.from(Array(14).keys())
        const headCell = arrCell.map((header_cell) => `<th scope="col">${ header_cell+1}</th>`).join('\n')
        const arrTemp = Array.from(Array(4).keys())
        const headTemp = arrTemp.map((header_temp) => `<th scope="col">${header_temp+1}</th>`).join('\n')
        return `        
            <div class="col-12 col-lg-2 col-xl-2 mt-3 mb-3">
                <div class="card text-center">
                    <div class="card-header">
                        <span class="h6 card-title">Dock ${el.dock_id} </span>
                    </div>
                    <div class="card-body">
                        <div id="battery_image">${image}</div>
                        <h6 class="card-title font-weight-bold">${dock_v}</h6>
                        <div data-toggle="modal" data-target=".ModalDock${el.dock_id}" id="battery_status">${button}</div>
                        <p class="card-text mt-3">Last Update:<br />${created_at}</p>
                    </div>
                </div>
            </div>
            
            <div class="modal fade ModalDock${el.dock_id}" tabindex="-1" role="dialog"
                aria-labelledby="myLargeModalLabel1" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="myLargeModalLabel1">Detail Data Dock</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-12 col-md-12 mt-3">
                                    <div class="card">
                                        <div class="card-body">
                                            <div id="accordion2" class="accordion-alt" role="tablist">
                                                <div class="mb-2">
                                                    <h6 class="mb-0">
                                                        <a class="d-block border" data-toggle="collapse"
                                                            href="#collapse4" aria-expanded="true"
                                                            aria-controls="collapse4">
                                                            Dock Data ${el.dock_id}
                                                        </a>
                                                    </h6>
                                                    <div id="collapse4" class="collapse show" role="tabpanel"
                                                        data-parent="#accordion2">
                                                        <div class="card-body">
                                                            <div class="table-responsive">
                                                                <table
                                                                    class="table layout-dark bordered text-center">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">Created at</th>
                                                                            <th scope="col">Dock ID</th>
                                                                            <th scope="col">Dock Pack</th>
                                                                            <th scope="col">Dock Voltage(V)</th>
                                                                            <th scope="col">Dock Current(I)</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <th>${created_at}</th>
                                                                            <th>${el.dock_id}</th>
                                                                            <th>${pars_dock.P}</th>
                                                                            <th>${pars_dock.V}</th>
                                                                            <th>${pars_dock.I}</th>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mb-2">
                                                    <h6 class="mb-0">
                                                        <a class="collapsed  redial-dark d-block border redial-border-light"
                                                            data-toggle="collapse" href="#collapse5"
                                                            aria-expanded="false" aria-controls="collapse5">
                                                            Dock Cell
                                                        </a>
                                                    </h6>
                                                    <div id="collapse5" class="collapse show" role="tabpanel"
                                                        data-parent="#accordion2">
                                                        <div class="card-body">
                                                            <div class="table-responsive">
                                                                <table
                                                                    class="table layout-dark bordered text-center">
                                                                    <thead>
                                                                        <tr>
                                                                            ${headCell}
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            ${renderCell}
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h6 class="mb-0">
                                                        <a class="collapsed  redial-dark d-block border redial-border-light"
                                                            data-toggle="collapse" href="#collapse6"
                                                            aria-expanded="false" aria-controls="collapse6">
                                                            Dock Temperature
                                                        </a>
                                                    </h6>
                                                    <div id="collapse6" class="collapse show" role="tabpanel"
                                                        data-parent="#accordion2">
                                                        <div class="card-body">
                                                            <div class="table-responsive">
                                                                <table
                                                                    class="table layout-dark bordered text-center">
                                                                    <thead>
                                                                        <tr>
                                                                            ${headTemp}
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            ${renderTemp}
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
    main.innerHTML = renderDom.join('\n')
}