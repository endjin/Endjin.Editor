/// <reference path="../../../built/local/editor.d.ts" />
/// <reference path="loadScript.ts" />

import { Given, When, Then, World } from "cucumber";
import { loadScript } from "../Helpers/loadScript";
import * as assert from "assert";

loadScript("../built/local/editor.js");

function isItFriday(today: string) {
    return "Nope";
}

interface State extends World {
    today: string;
}

export function World(callback: (w: World) => void) {
    let world: State = {
        today: "Sunday",
        actualAnswer: ""
    };

    callback(world);
}

Given('today is Sunday', function () {
    let t = new Endjin.Editor.Model.AnchorModel();
    let c = t.childCount;
    this.today = 'Sunday';
});

When('I ask whether it\'s Friday yet', function () {
    this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', function (expectedAnswer: string) {
    assert.equal(this.actualAnswer, expectedAnswer);
});