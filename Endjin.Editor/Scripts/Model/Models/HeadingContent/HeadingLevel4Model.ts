/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class HeadingLevel4Model extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.SectioningContent}.headinglevel4`;

        get contentType(): string {
            return HeadingLevel4Model.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.PhrasingContent];
    }
}