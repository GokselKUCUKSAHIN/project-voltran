const find = require('local-devices');

(async _ => {
  const devices = await find();
  const ips = devices.map(device => device.ip);
  console.log(ips);
})();