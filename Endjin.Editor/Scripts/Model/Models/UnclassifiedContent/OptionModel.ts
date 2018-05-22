/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="TextModel.ts" />

namespace Endjin.Editor.Model {
    export class OptionModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.UnclassifiedContent}.option`;

        isDisabled: boolean | null = null;
        isSelected: boolean | null = null;
        label: string | null = null;
        value: string | null = null;

        get contentType(): string {
            return OptionModel.ContentType;
        }

        readonly acceptsTypes: string[] = [TextModel.ContentType];
    }
}