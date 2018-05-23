/// <reference path="../../../../../../../built/local/editor.d.ts" />

import { Given, When, Then } from "cucumber";
import * as assert from "assert";

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