import {machineId} from "node-machine-id";

(async _ => {
    console.log(await machineId());
})()