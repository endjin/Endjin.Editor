(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "cucumber", "../Helpers/loadScript", "assert"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var cucumber_1 = require("cucumber");
    var loadScript_1 = require("../Helpers/loadScript");
    var assert = require("assert");
    loadScript_1.loadScript("../built/local/editor.js");
    function isItFriday(today) {
        return "Nope";
    }
    function World(callback) {
        var world = {
            today: "Sunday",
            actualAnswer: ""
        };
        callback(world);
    }
    exports.World = World;
    cucumber_1.Given('today is Sunday', function () {
        var t = new Endjin.Editor.Model.AnchorModel();
        var c = t.childCount;
        this.today = 'Sunday';
    });
    cucumber_1.When('I ask whether it\'s Friday yet', function () {
        this.actualAnswer = isItFriday(this.today);
    });
    cucumber_1.Then('I should be told {string}', function (expectedAnswer) {
        assert.equal(this.actualAnswer, expectedAnswer);
    });
});
//# sourceMappingURL=IsItFriday.js.map