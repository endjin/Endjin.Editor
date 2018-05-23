/// <reference path="../../../../built/local/editor.d.ts" />
import { World } from "cucumber";
export declare class State implements World {
    models: Map<string, Endjin.Editor.Model.IModel>;
    result: Endjin.Editor.Model.Selection | null;
    constructor();
    getNamedModel(name: string): Endjin.Editor.Model.IModel;
}
