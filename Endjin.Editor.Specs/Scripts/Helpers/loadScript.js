(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "vm", "fs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var vm = require("vm");
    var fs = require("fs");
    function loadScript(path) {
        var s = fs.readFileSync(path);
        vm.runInThisContext("" + s);
    }
    exports.loadScript = loadScript;
});
//# sourceMappingURL=loadScript.js.map