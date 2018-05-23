/// <reference path="../../../../../built/local/editor.d.ts" />

import { Given, When, Then } from "cucumber";
import * as assert from "assert";

Given('I have a model of type {string} called {string}', function (modelType: string, name: string): void {
    let newModel = new (<any>Endjin.Editor.Model)[modelType]() as Endjin.Editor.Model.IModel;

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

Then('the result should be a Selection', function (): void {
    assert.ok(this.result instanceof Endjin.Editor.Model.Selection);
});

Then('{string} should not contain {string}', function(name1: string, name2: string): void {
    let model1 = this.models.get(name1);
    let model2 = this.models.get(name2);

    let i = model1.getIndex(model2);

    assert.strictEqual(i, -1);
});

Then('{string} should contain {string}', function (name1: string, name2: string): void {
    let model1 = this.models.get(name1);
    let model2 = this.models.get(name2);

    let i = model1.getIndex(model2);

    assert.notStrictEqual(i, -1);
});