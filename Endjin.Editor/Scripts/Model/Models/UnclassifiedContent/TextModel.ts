/// <reference path="../EmptyContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class TextModel extends EmptyContentModelBase implements IModel {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.text`;
        private _textRun: string;

        readonly acceptsTypes: Array<string> = [TextModel.ContentType];

        constructor(textRun: string) {
            super();
            this.textRun = this.normalizeValue(textRun);
        }

        get textRun(): string {
            return this._textRun;
        }

        get normalizedTextRun(): string {
            return this.normalizeValue(this.textRun);
        }

        set textRun(value: string) {
            this._textRun = value;
        }

        get contentType(): string {
            return TextModel.ContentType;
        }

        canRemoveRange(startIndex: number, endIndex: number): boolean {
            return true;
        }

        removeRange(startIndex: number, endIndex: number): Array<IModel> {
            if (startIndex > endIndex || startIndex === this.textRun.length) {
                // nothing to remove here
                return [];
            }

            let removedRun = this.textRun.substring(startIndex, endIndex + 1);
            this.textRun = (startIndex > 0 ? this.normalizeValue(this.textRun.substring(0, startIndex), true, false) : "") + (endIndex < this.textRun.length - 1 ? this.normalizeValue(this.textRun.substring(endIndex + 1), false, true) : "");
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

            this.textRun = this.textRun.slice(0, index) + model.normalizedTextRun + this.textRun.slice(index)
            return new Selection(this, new Location(this, index), new Location(this, index + model.normalizedTextRun.length));
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

        private trimWhitespace(value: string): string {
            value = value.trim();

            if (value[0] === String.fromCharCode(160)) {
                value = value.substr(1);
            }

            if (value[value.length - 1] === String.fromCharCode(160)) {
                value = value.substr(0, value.length - 1);
            }

            value = value.trim();
            return value;
        }

        private normalizeValue(value: string, useNbspAtStart: boolean = false, useNbspAtEnd: boolean = false): string {
            if (value.length === 0) {
                return value;
            }

            let startsWithWhitespace = /^[\s\u00A0]/.test(value);
            let endsWithWhitespace = /[\s\u00A0]$/.test(value);

            let padCharStart = useNbspAtStart ? String.fromCharCode(160) : " ";
            let padCharEnd = useNbspAtEnd ? String.fromCharCode(160) : " ";

            value = this.trimWhitespace(value);

            if (value.length === 0) {
                return padCharStart;
            }

            if (startsWithWhitespace) {
                value = padCharStart + value;
            }

            if (endsWithWhitespace) {
                value = value + padCharEnd;
            }

            return value;
        }
    }
}