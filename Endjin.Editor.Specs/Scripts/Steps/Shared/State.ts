/// <reference path="../../../../built/local/editor.d.ts" />
import * as assert from "assert";
import { World } from "cucumber";

export class State implements World {
    models: Map<string, Endjin.Editor.Model.IModel>;
    result: Endjin.Editor.Model.Selection | null;

    constructor() {
        this.models = new Map<string, Endjin.Editor.Model.IModel>();
        this.result = null;
    }

    getNamedModel(name: string): Endjin.Editor.Model.IModel {
        if (!this.models.has(name)) {
            assert.fail(`No model named ${name} has been created`);
        }

        return this.models.get(name);
    }
}
