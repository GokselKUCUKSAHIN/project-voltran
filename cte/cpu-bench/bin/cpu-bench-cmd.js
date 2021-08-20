#!/usr/bin/env node
const cpuSingleCoreBench = require("../dist/index").cpuSingleCoreBench;
const cpuMultiCoreBench = require("../dist/index").cpuMultiCoreBench;

(async _ => {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    switch (args[0].toLowerCase()) {
      case "single-core":
      case "single":
        console.log("Single-Core Score Calculating...");
        console.log("Single-Core Score Result:", cpuSingleCoreBench());
        break;
      case "multi-core":
      case "multi":
        console.log("Multi-Core Score Calculating...");
        console.log("Multi-Core Score Result:", await cpuMultiCoreBench());
        break;
    }
  }
})();