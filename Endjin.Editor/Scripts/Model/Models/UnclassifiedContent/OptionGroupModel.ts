/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="OptionModel.ts" />
/// <reference path="TextModel.ts" />

namespace Endjin.Editor.Model {
    export class OptionGroupModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.UnclassifiedContent}.optiongroup`;

        isDisabled: boolean | null = null;
        label: string | null = null;

        get contentType(): string {
            return OptionGroupModel.ContentType;
        }

        readonly acceptsTypes: string[] = [OptionModel.ContentType, TextModel.ContentType];
    }
}