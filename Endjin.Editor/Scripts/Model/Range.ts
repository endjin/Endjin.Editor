/// <reference path="IModel.ts" />

namespace Endjin.Editor.Model {
    /** Represents a selection range in the model */
    export class Range {
        /**
         * 
         * @param start - the location of the range start
         * @param end - the location of the range end
         */
        constructor(public readonly start: number, public readonly end: number) {
        }
    }
}