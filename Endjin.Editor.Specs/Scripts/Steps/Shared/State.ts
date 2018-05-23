/// <reference path="../../../../built/local/editor.d.ts" />
import { World } from "cucumber";

export class State implements World {
    models: Map<string, Endjin.Editor.Model.IModel>;
    result: Selection | null;

    constructor() {
        this.models = new Map<string, Endjin.Editor.Model.IModel>();
        this.result = null;
    }
}
