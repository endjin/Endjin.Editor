/// <reference path="../../../../../../../built/local/editor.d.ts" />
/// <reference path="../../../../../Helpers/loadScript.ts" />

import { Given, When, Then, World, setWorldConstructor } from "cucumber";
import { loadScript } from "../../../../../Helpers/loadScript";
import * as assert from "assert";

loadScript("../built/local/editor.js");

class State implements World {
    models: Map<string, Endjin.Editor.Model.IModel>;
    result: Selection | null;

    constructor() {
        this.models = new Map<string, Endjin.Editor.Model.IModel>();
        this.result = null;
    }
}

setWorldConstructor(State);

Given('I have an AnchorModel called {string}', function(name: string): void {
    let newModel = new Endjin.Editor.Model.AnchorModel();
    this.models.set(name, newModel);
});

When('I add {string} to {string}', function(name1: string, name2: string): void {
    let model1 = this.models.get(name1);
    let model2 = this.models.get(name2);

    this.result = model2.acceptChild(0, model1);
});

Then('the result should be null', function(): void {
    assert.strictEqual(this.result, null);
});

Then('{string} should not contain {string}', function(name1: string, name2: string): void {
    let model1 = this.models.get(name1);
    let model2 = this.models.get(name2);

    let i = model1.getIndex(model2);

    assert.strictEqual(i, -1);
});