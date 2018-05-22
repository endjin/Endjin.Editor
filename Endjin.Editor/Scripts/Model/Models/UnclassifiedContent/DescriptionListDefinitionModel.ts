/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class DescriptionListDefinitionModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.UnclassifiedContent}.descriptionlistdefinition`;

        get contentType(): string {
            return DescriptionListDefinitionModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.FlowContent];
    }
}