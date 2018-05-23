/// <reference path="../../../../../built/local/editor.d.ts" />

import { Given, When, Then } from "cucumber";
import * as assert from "assert";
import { State } from "../../Shared/State";

Given('I have a model of type {string} called {string}', function (this: State, modelType: string, name: string): void {
    let newModel = new (<any>Endjin.Editor.Model)[modelType]() as Endjin.Editor.Model.IModel;
    this.models.set(name, newModel);
});

When('I add {string} to {string}', function (this: State, name1: string, name2: string): void {
    let model1 = this.getNamedModel(name1);
    let model2 = this.getNamedModel(name2);

    this.result = model2.acceptChild(0, model1);
});

Then('the result should be null', function (this: State): void {
    assert.strictEqual(this.result, null);
});

Then('the result should be a Selection', function (this: State): void {
    assert.notStrictEqual(this.result, null);
});

Then('the result Selection should start at position {int}', function (this: State, start: number) {
    assert.strictEqual(this.result!.selectionStart.index, start);
});

Then('the result Selection should end at position {int}', function (this: State, end: number) {
    assert.strictEqual(this.result!.selectionEnd.index, end);
});

Then('{string} should not contain {string}', function (this: State, name1: string, name2: string): void {
    let model1 = this.getNamedModel(name1);
    let model2 = this.getNamedModel(name2);

    let i = model1.getIndex(model2);

    assert.strictEqual(i, -1);
});

Then('{string} should contain {string}', function (this: State, name1: string, name2: string): void {
    let model1 = this.getNamedModel(name1);
    let model2 = this.getNamedModel(name2);

    let i = model1.getIndex(model2);

    assert.notStrictEqual(i, -1);
});