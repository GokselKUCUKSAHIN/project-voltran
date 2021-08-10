const ping = require("net-ping");
const session = ping.createSession();

function checkIPs(ip) {
  session.pingHost(ip, function (error, target) {
    if (error)
      console.log(target + ": " + error.toString());
    else
      console.log(target + ": Alive");
  });
}

for (let i = 1; i < 254; i++) {
  checkIPs(`192.168.1.${i}`);
}