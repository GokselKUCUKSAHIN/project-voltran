import * as fs from "fs";

type commandFunction = (arr: number[]) => number[];

interface Package {
  version: string;
}

const VERSION = '0.1.0';

const HELP_MESSAGE = `verman version ${VERSION}, (c) 2021 Goksel KUCUKSAHIN
Usage: verman [command]
  Commands:
  -- [help], [-help], [-h]  : Prints Help Text 
  -- [bump], [-bump], [-b]  : Increments revision number.                        | x.y.z  --> x.y.z+1 |
  -- [minor], [min], [-min] : Increments minor version number and zeros rest.    | x.y.z  --> x.y+1.0 |
  -- [major], [maj], [-maj] : Increments major version number and zeros rest.    | x.y.z  --> x+1.0.0 |

`

const CMDS: commandFunction[] = [incBump, incMinor, incMajor];

function incVersion(arr: number[], cmd: number) {
  return CMDS[cmd](cloneArray(arr));
}

function incBump(arr: number[]): number[] {
  arr[2]++;
  return arr;
}

function incMinor(arr: number[]): number[] {
  arr[1]++;
  arr[2] = 0;
  return arr;
}

function incMajor(arr: number[]): number[] {
  arr[0]++;
  arr[1] = 0;
  arr[2] = 0;
  return arr;
}

function cloneArray<T>(array: T[]): T[] {
  if (array !== undefined) {
    // primitive clone (not reference safe)
    return [...array];
  }
  throw Error("Source object is undefined!");
}

// USE CUSTOM IO LIB NEXT TIME

function readFile(path: string): string {
  let data = ""; // null/not defined safe
  try {
    data = fs.readFileSync(path, 'utf-8');
  } catch (err) {
    throw Error(`Error!\nDetails: ${err}`);
  }
  return data;
}

function saveFile(path: string, file: string): void {
  try {
    fs.writeFileSync(path, file, "utf8");
  } catch (err) {
    throw Error(`Error!\nDetails: ${err}`);
  }
}

function command(str: string): number {
  const cmd = str.toLowerCase();
  if (['help', '-help', '-h'].includes(cmd)) {
    // console.log("HELP");
    return -1;
  } else if (['bump', 'b', '-b'].includes(cmd)) {
    // console.log("BUMP");
    return 0;
  } else if (['minor', 'min', '-min'].includes(cmd)) {
    // console.log("MINOR");
    return 1;
  } else if (['major', 'maj', '-maj'].includes(cmd)) {
    // console.log("MAJOR");
    return 2;
  }
  return -1; // help
}

function getProcessArgv(): string[] {
  return process.argv.slice(2);
}

function help(): void {
  console.log(HELP_MESSAGE);
}

export function verman(): void {
  const args = getProcessArgv();
  if (args.length >= 1) {
    const cmd = command(args[0]);
    if (cmd > -1) {
      let file = "";
      try {
        file = readFile("package.json");
      } catch (ex) {
        console.error(`package.json not present!\nDetails:\n${ex}`);
      }
      if (file !== "") {
        const pack: Package = JSON.parse(file);
        const preVersion = pack.version;
        const packageVersionArray: string[] = pack.version.split('.');
        const versionArray: number[] = packageVersionArray.map(x => parseInt(x));
        pack.version = incVersion(versionArray, cmd).join('.');
        saveFile("package.json", JSON.stringify(pack, null, 2));
        console.log(`Version succesfuly changed ${preVersion} -> ${pack.version}`);
      }
    } else if (cmd === -1) {
      help();
    }
  }
}