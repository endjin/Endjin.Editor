/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class HeadingLevel1Model extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.SectioningContent}.headinglevel1`;

        get contentType(): string {
            return HeadingLevel1Model.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.PhrasingContent];
    }
}