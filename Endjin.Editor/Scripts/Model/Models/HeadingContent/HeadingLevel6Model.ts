/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class HeadingLevel6Model extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.SectioningContent}.headinglevel6`;

        get contentType(): string {
            return HeadingLevel6Model.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.PhrasingContent];
    }
}