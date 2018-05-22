(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "cucumber", "../../../../../Helpers/loadScript", "assert"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var cucumber_1 = require("cucumber");
    var loadScript_1 = require("../../../../../Helpers/loadScript");
    var assert = require("assert");
    loadScript_1.loadScript("../built/local/editor.js");
    var State = (function () {
        function State() {
            this.models = new Map();
            this.result = null;
        }
        return State;
    }());
    cucumber_1.setWorldConstructor(State);
    cucumber_1.Given('I have an AnchorModel called {string}', function (name) {
        var newModel = new Endjin.Editor.Model.AnchorModel();
        this.models.set(name, newModel);
    });
    cucumber_1.When('I add {string} to {string}', function (name1, name2) {
        var model1 = this.models.get(name1);
        var model2 = this.models.get(name2);
        this.result = model2.acceptChild(0, model1);
    });
    cucumber_1.Then('the result should be null', function () {
        assert.strictEqual(this.result, null);
    });
    cucumber_1.Then('{string} should not contain {string}', function (name1, name2) {
        var model1 = this.models.get(name1);
        var model2 = this.models.get(name2);
        var i = model1.getIndex(model2);
        assert.strictEqual(i, -1);
    });
});
//# sourceMappingURL=AcceptChild.js.map