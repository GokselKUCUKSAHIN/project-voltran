import * as fs from 'fs';

export function readFile(path: string): string {
    let data: string = ""; // null/not defined safe
    try {
        data = fs.readFileSync(path, 'utf-8');
    } catch (err) {
        throw Error(`Error: ${err}`);
    }
    return data;
}