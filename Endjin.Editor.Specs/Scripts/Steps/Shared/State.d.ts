/// <reference path="../../../built/local/editor.d.ts" />
import { World } from "cucumber";
export declare class State implements World {
    models: Map<string, Endjin.Editor.Model.IModel>;
    result: Selection | null;
    constructor();
}
