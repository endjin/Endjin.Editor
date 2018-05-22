/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class AsideModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.SectioningContent}.aside`;

        get contentType(): string {
            return AsideModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.FlowContent];
    }
}