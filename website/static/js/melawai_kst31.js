// ===================== Harvest Data ======================
setInterval(() => {
    fetch('/api/harvestDataKST31/')
        .then(response=>response.json())
        .then(data=>{
            for (let harvest = 0; harvest < 1; harvest++){
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