/// <reference path="../EmptyContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class TextModel extends EmptyContentModelBase implements IModel {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.text`;

        readonly acceptsTypes: Array<string> = [TextModel.ContentType];

        constructor(public textRun: string) {
            super();
        }

        get contentType(): string {
            return TextModel.ContentType;
        }

        canRemoveRange(startIndex: number, endIndex: number): boolean {
            if (startIndex < 0 || startIndex > this.textRun.length - 1 ||
                endIndex < 0 || endIndex > this.textRun.length - 1 ||
                startIndex > endIndex) {
                return false;
            }

            return true;
        }

        removeRange(startIndex: number, endIndex: number): Array<IModel> {
            if (!this.canRemoveRange(startIndex, endIndex)) {
                return [];
            }

            let removedRun = this.textRun.substring(startIndex, endIndex);
            this.textRun = (startIndex > 0 ? this.textRun.substring(0, startIndex) : "") + (endIndex < this.textRun.length - 1 ? this.textRun.substring(endIndex + 1) : "");
            return [new TextModel(removedRun)];
        }

        canAccept(index: number, child: IModel): boolean {
            return index >= 0 && index <= this.textRun.length && child.contentType === TextModel.ContentType;
        }

        acceptChild(index: number, child: IModel): Selection | null {
            if (!this.canAccept(index, child)) {
                return null;
            }

            let model = <TextModel>child;

            this.textRun = this.textRun.slice(0, index) + model.textRun + this.textRun.slice(index)
            return new Selection(this, new Location(this, index), new Location(this, index + model.textRun.length));
        }

        canRemoveSelection(selection: Selection): boolean {
            let normalizedSelection = selection.normalize();
            let startIndex = normalizedSelection.selectionStart.model === this ? normalizedSelection.selectionStart.index : 0;
            let endIndex = normalizedSelection.selectionEnd.model === this ? normalizedSelection.selectionEnd.index : this.textRun.length;
            return this.canRemoveRange(startIndex, endIndex - 1);
        }

        removeSelection(selection: Selection): Array<IModel> {
            let normalizedSelection = selection.normalize();
            let startIndex = normalizedSelection.selectionStart.model === this ? normalizedSelection.selectionStart.index : 0;
            let endIndex = normalizedSelection.selectionEnd.model === this ? normalizedSelection.selectionEnd.index : this.textRun.length;
            return this.removeRange(startIndex, endIndex - 1);
        }
    }
}