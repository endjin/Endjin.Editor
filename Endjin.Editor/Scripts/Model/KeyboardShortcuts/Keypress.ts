/// <reference path="../Selection.ts" />


namespace Endjin.Editor.Model {
    /** 
     * Represents a key press in a sequence
     */
    export class Keypress {
        constructor(
            public keyCode: number,
            public shiftKey: boolean = false,
            public altKey: boolean = false,
            public controlKey: boolean = true,
            public metaKey: boolean = false) { }

        equals(other: Keypress): boolean {
            return this.keyCode === other.keyCode &&
                this.shiftKey === other.shiftKey &&
                this.altKey === other.altKey &&
                this.controlKey === other.controlKey &&
                this.metaKey === other.metaKey;
        }
    }
}