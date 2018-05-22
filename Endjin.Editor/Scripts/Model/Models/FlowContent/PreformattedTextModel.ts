/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="../UnclassifiedContent/TextModel.ts" />

namespace Endjin.Editor.Model {
    export class PreformattedTextModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.FlowContent}.preformattedtext`;

        get contentType(): string {
            return PreformattedTextModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.PhrasingContent];
    }
}