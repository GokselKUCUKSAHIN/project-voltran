import * as network from "network";

network.get_gateway_ip((err, ip) => console.log(err || ip));
network.get_private_ip((err, ip) => console.log(err || ip));