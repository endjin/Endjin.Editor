/// <reference path="../../../../../../../built/local/editor.d.ts" />
/// <reference path="../../../../../Helpers/loadScript.ts" />

import { Given, When, Then, World } from "cucumber";
import { loadScript } from "../../../../../Helpers/loadScript";
import * as assert from "assert";

loadScript("../built/local/editor.js");

interface State extends World {
    models: Map<string, Endjin.Editor.Model.IModel>;
}

export function World(callback: (w: World) => void) {
    let world: State = {
        models = new Map<string, Endjin.Editor.Model.IModel>();
    };

    callback(world);
}

Given('I have an AnchorModel called {string}', (name: string): string => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('I add {string} to {string}', (name1: string, name2: string): string => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('the result should be {result}', (result: string): string => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('{name1} should not contain {name2}', (name1: string, name2: string): string => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});