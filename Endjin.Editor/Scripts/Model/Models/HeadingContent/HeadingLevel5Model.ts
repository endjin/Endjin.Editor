/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class HeadingLevel5Model extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.SectioningContent}.headinglevel5`;

        get contentType(): string {
            return HeadingLevel5Model.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.PhrasingContent];
    }
}