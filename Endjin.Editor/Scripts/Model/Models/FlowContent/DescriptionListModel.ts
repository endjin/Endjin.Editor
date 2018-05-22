/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="../UnclassifiedContent/DescriptionListDefinitionModel.ts" />
/// <reference path="../UnclassifiedContent/DescriptionListTermModel.ts" />
/// <reference path="../UnclassifiedContent/TextModel.ts" />


namespace Endjin.Editor.Model {
    export class DescriptionListModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.FlowContent}.descriptionlist`;

        get contentType(): string {
            return DescriptionListModel.ContentType;
        }

        readonly acceptsTypes: string[] = [DescriptionListDefinitionModel.ContentType, DescriptionListTermModel.ContentType, TextModel.ContentType];
    }
}