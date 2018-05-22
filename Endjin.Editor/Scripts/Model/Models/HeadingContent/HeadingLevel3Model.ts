/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class HeadingLevel3Model extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.SectioningContent}.headinglevel3`;

        get contentType(): string {
            return HeadingLevel3Model.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.PhrasingContent];
    }
}