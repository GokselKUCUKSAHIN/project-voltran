import * as network from "network";

async function getCallback(callback: Function): Promise<string> {
    return new Promise((res, rej) => {
        callback((err, ip) => {
            if (err) {
                rej(`Error: ${err}`);
            }
            res(ip);
        });
    });
}

export async function getGatewayIP(): Promise<string> {
    return getCallback(network.get_gateway_ip);
}

export async function getPrivateIP(): Promise<string> {
    return getCallback(network.get_private_ip);
}

// Test
(async _ => {
    console.log(await getGatewayIP());
})();