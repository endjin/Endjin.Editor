/// <reference path="IModel.ts" />
/// <reference path="Location.ts" />

namespace Endjin.Editor.Model {
    /** Represents a selection range in the model */
    export class Selection {
        /**
         * 
         * @param selectionScope - the outermost element in which the selection is contained
         * @param selectionStart - the location of the selection start
         * @param selectionEnd - the location of the selection end
         */
        constructor(public readonly selectionScope: IModel, public readonly selectionStart: Location, public readonly selectionEnd: Location) {
        }

        /**
         * Indicates whether the selection is collapsed
         * @returns - true if the selection is collapsed
         */
        get isCollapsed(): boolean {
            return this.selectionStart.equals(this.selectionEnd);
        }

        /**
         * Collapse the selection to the selection start
         * @returns - the collapsed selection
         */
        collapseToStart(): Selection {
            if (this.isCollapsed) {
                return this;
            }

            return new Selection(this.selectionStart.model, this.selectionStart, this.selectionStart);
        }

        /**
         * Collapse the selection to the selection end
         * @returns - the collapsed selection
         */
        collapseToEnd(): Selection {
            if (this.isCollapsed) {
                return this;
            }

            return new Selection(this.selectionEnd.model, this.selectionEnd, this.selectionEnd);
        }

        /**
         * Collapse the selection to the position earliest in the document
         * */
        collapseToFirst(): Selection {
            if (this.selectionStart.isAfter(this.selectionEnd)) {
                return new Selection(this.selectionEnd.model, this.selectionEnd, this.selectionEnd);
            }
            return new Selection(this.selectionStart.model, this.selectionStart, this.selectionStart);
        }

        /**
         * Collapse the selection to the position latest in the document
         * */
        collapseToLast(): Selection {
            if (this.selectionStart.isAfter(this.selectionEnd)) {
                return new Selection(this.selectionStart.model, this.selectionStart, this.selectionStart);
            }
            return new Selection(this.selectionEnd.model, this.selectionEnd, this.selectionEnd);
        }

        /**
         * Normalizes the selection, swapping start and end if they are "backwards"
         * @returns - a selection with selectionStart before selectionEnd
         */
        normalize(): Selection {
            if (this.selectionStart.isAfter(this.selectionEnd)) {
                return new Selection(this.selectionScope, this.selectionEnd, this.selectionStart);
            }

            return this;
        }
    }
}