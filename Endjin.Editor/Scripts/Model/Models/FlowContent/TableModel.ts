/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="../UnclassifiedContent/TableCaptionModel.ts" />
/// <reference path="../UnclassifiedContent/TableColumnGroupModel.ts" />
/// <reference path="../UnclassifiedContent/TableHeaderModel.ts" />
/// <reference path="../UnclassifiedContent/TableBodyModel.ts" />
/// <reference path="../UnclassifiedContent/TableRowModel.ts" />
/// <reference path="../UnclassifiedContent/TableFooterModel.ts" />
/// <reference path="../UnclassifiedContent/TextModel.ts" />

namespace Endjin.Editor.Model {
    export class TableModel extends ChildContentModelBase {
        private static readonly ErrorState: string = "Error";
        static readonly ContentType: string = `${CommonModelTypes.FlowContent}.table`;

        get contentType(): string {
            return TableModel.ContentType;
        }

        readonly acceptsTypes: string[] = [TableCaptionModel.ContentType, TableColumnGroupModel.ContentType, TableHeaderModel.ContentType, TableBodyModel.ContentType, TableRowModel.ContentType, TableFooterModel.ContentType, TextModel.ContentType];

        canAccept(index: number, child: IModel): boolean {
            // Use a simple state machine to determine whether the child of this type can be inserted into the table at this point
            // Invariants: we assume that we have valid children at the start of evaluation

            // First, establish the initial state as it would be if we had iterated to this index (null if we are inserting at the start)
            let state = index > 0 ? this.children[index - 1].contentType : null;

            // Can we insert this child, given this location? If so, update the state, otherwise fail
            state = this.updateAcceptanceState(state, child);
            if (state === TableModel.ErrorState) {
                return false;
            }

            // If there are any subsequent children, determine if they are still valid after inserting the child
            // by validating that we could insert the next child given the new state.
            if (index < this.children.length) {
                state = this.updateAcceptanceState(state, this.children[index]);
                if (state === TableModel.ErrorState) {
                    return false;
                }
            }

            return super.canAccept(index, child);
        }

        private updateAcceptanceState(state: string | null, child: IModel): string | null {
            switch (state) {
                case null:
                    // Anyone can be accepted at the start, exception for a footer
                    if (child.contentType === TableFooterModel.ContentType) {
                        return TableModel.ErrorState;
                    } else {
                        return child.contentType;
                    }
                case TableCaptionModel.ContentType:
                    // Anyone can be accepted after a caption apart from a 
                    // caption or a footer
                    if (child.contentType === TableFooterModel.ContentType || child.contentType === TableCaptionModel.ContentType) {
                        return TableModel.ErrorState;
                    } else {
                        return child.contentType;
                    }
                case TableColumnGroupModel.ContentType:
                    // Anyone but a caption or a footer can be accepted after a column group
                    if (child.contentType === TableFooterModel.ContentType || child.contentType === TableCaptionModel.ContentType) {
                        return TableModel.ErrorState;
                    } else {
                        return child.contentType;
                    }
                case TableHeaderModel.ContentType:
                    // Anyone but a header, caption or footer can be accepted after a header
                    if (child.contentType === TableHeaderModel.ContentType || child.contentType === TableFooterModel.ContentType || child.contentType === TableCaptionModel.ContentType) {
                        return TableModel.ErrorState;
                    } else {
                        return child.contentType;
                    }
                case TableBodyModel.ContentType:
                    // You can only have another body, or footer after a body
                    if (child.contentType !== TableBodyModel.ContentType && child.contentType !== TableFooterModel.ContentType) {
                        return TableModel.ErrorState;
                    } else {
                        return child.contentType;
                    }
                case TableRowModel.ContentType:
                    // You can only have another row, or a footer after a row
                    if (child.contentType !== TableRowModel.ContentType && child.contentType !== TableFooterModel.ContentType) {
                        return TableModel.ErrorState;
                    } else {
                        return child.contentType;
                    }
                case TableFooterModel.ContentType:
                    // You cannot insert anything after a footer
                    return TableModel.ErrorState;
            }

            throw new Error(`Unknown state: ${state}`);
        }
    }
}