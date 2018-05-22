/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class SectionModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.SectioningContent}.section`;

        get contentType(): string {
            return SectionModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.FlowContent];
    }
}