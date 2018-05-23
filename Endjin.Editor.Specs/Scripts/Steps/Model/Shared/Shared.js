(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "cucumber", "assert"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var cucumber_1 = require("cucumber");
    var assert = require("assert");
    cucumber_1.Given('I have a model of type {string} called {string}', function (modelType, name) {
        var newModel = new Endjin.Editor.Model[modelType]();
        this.models.set(name, newModel);
    });
    cucumber_1.When('I add {string} to {string}', function (name1, name2) {
        var model1 = this.getNamedModel(name1);
        var model2 = this.getNamedModel(name2);
        this.result = model2.acceptChild(0, model1);
    });
    cucumber_1.Then('the result should be null', function () {
        assert.strictEqual(this.result, null);
    });
    cucumber_1.Then('the result should be a Selection', function () {
        assert.ok(this.result instanceof Endjin.Editor.Model.Selection);
    });
    cucumber_1.Then('{string} should not contain {string}', function (name1, name2) {
        var model1 = this.getNamedModel(name1);
        var model2 = this.getNamedModel(name2);
        var i = model1.getIndex(model2);
        assert.strictEqual(i, -1);
    });
    cucumber_1.Then('{string} should contain {string}', function (name1, name2) {
        var model1 = this.getNamedModel(name1);
        var model2 = this.getNamedModel(name2);
        var i = model1.getIndex(model2);
        assert.notStrictEqual(i, -1);
    });
});
//# sourceMappingURL=Shared.js.map