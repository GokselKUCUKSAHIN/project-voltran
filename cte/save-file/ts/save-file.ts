import * as fs from 'fs';

export function saveFile(path: string, file: string): void {
    try {
        fs.writeFileSync(path, file, "utf8")
    } catch (err) {
        console.error(err);
    }
}