/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="../UnclassifiedContent/OptionModel.ts" />
/// <reference path="../UnclassifiedContent/OptionGroupModel.ts" />
/// <reference path="../UnclassifiedContent/TextModel.ts" />

namespace Endjin.Editor.Model {
    export class SelectModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.select`;

        get contentType(): string {
            return SelectModel.ContentType;
        }

        autofocus: boolean | null = null;
        isDisabled: boolean | null = null;
        allowMultiple: boolean | null = null;
        name: string = "";
        isRequired: boolean | null = null;
        size: number | null = null;

        readonly isInteractive: boolean = true;

        readonly acceptsTypes: string[] = [OptionModel.ContentType, OptionGroupModel.ContentType, TextModel.ContentType];
    }
}