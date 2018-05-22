/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="../UnclassifiedContent/TextModel.ts" />

namespace Endjin.Editor.Model {
    export enum TextWrapping {
        Soft = "soft",
        Hard = "hard",
        Off = "off"
    }
    export class TextAreaModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.textarea`;

        get contentType(): string {
            return TextAreaModel.ContentType;
        }

        autofocus: boolean = false;
        columns: number = 20;
        rows: number | null = null; 
        isDisabled: boolean | null = null;
        maximumLength: number | null = null;
        minimumLength: number | null = null;
        isReadOnly: boolean | null = null;
        spellCheck: boolean | null = null;
        wrap: TextWrapping | null = null;

        readonly isInteractive: boolean = true;

        readonly acceptsTypes: string[] = [TextModel.ContentType];
    }
}