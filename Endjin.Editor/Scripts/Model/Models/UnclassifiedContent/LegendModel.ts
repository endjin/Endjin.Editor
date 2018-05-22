/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class LegendModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.UnclassifiedContent}.legend`;

        get contentType(): string {
            return LegendModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.PhrasingContent];
    }
}