(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "assert"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var assert = require("assert");
    var State = (function () {
        function State() {
            this.models = new Map();
            this.result = null;
        }
        State.prototype.getNamedModel = function (name) {
            if (!this.models.has(name)) {
                assert.fail("No model named " + name + " has been created");
            }
            return this.models.get(name);
        };
        return State;
    }());
    exports.State = State;
});
//# sourceMappingURL=State.js.map