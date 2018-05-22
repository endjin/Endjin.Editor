/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class NavigationModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.SectioningContent}.navigation`;

        get contentType(): string {
            return NavigationModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.FlowContent];
    }
}