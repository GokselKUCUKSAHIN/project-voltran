import * as systemInfo from "systeminformation";

async function cpuData() {
    try {
        const cpu = await systemInfo.cpu();
        const temp = await systemInfo.cpuTemperature();
        console.log("Temp", temp);
        console.log('CPU Information:');
        console.log('- manufucturer: ' + cpu.manufacturer);
        console.log('- brand: ' + cpu.brand);
        console.log('- speed: ' + cpu.speed);
        console.log('- cores: ' + cpu.cores);
        console.log('- physical cores: ' + cpu.physicalCores);
        console.log('...');
    } catch (e) {
        console.log(e)
    }
}

(async _ => {
    await cpuData();
})();