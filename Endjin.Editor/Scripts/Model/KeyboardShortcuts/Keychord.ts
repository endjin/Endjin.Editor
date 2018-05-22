/// <reference path="Keypress.ts" />


namespace Endjin.Editor.Model {
    /** 
     * Represents a sequence of key presses
     */
    export class Keychord {
        constructor(
            public first: Keypress,
            public second: Keypress | null = null) { }

        equals(other: Keychord): boolean {
            return this.first.equals(other.first) &&
                ((this.second === null && other.second === null) ||
                    (this.second !== null && other.second !== null && this.second.equals(other.second)));
        }
    }
}