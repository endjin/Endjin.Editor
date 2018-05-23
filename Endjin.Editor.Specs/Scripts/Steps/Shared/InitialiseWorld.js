(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./State", "../../Helpers/loadScript", "cucumber"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var State_1 = require("./State");
    var loadScript_1 = require("../../Helpers/loadScript");
    var cucumber_1 = require("cucumber");
    loadScript_1.loadScript("../built/local/editor.js");
    cucumber_1.setWorldConstructor(State_1.State);
});
//# sourceMappingURL=InitialiseWorld.js.map