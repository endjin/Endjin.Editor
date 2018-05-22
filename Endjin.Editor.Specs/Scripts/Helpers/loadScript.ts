import * as vm from "vm";
import * as fs from "fs";

export function loadScript(path: string): void {
    var s = fs.readFileSync(path);
    vm.runInThisContext("" + s);
}
