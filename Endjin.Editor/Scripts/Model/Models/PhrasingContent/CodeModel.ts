/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class CodeModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.code`;

        get contentType(): string {
            return CodeModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.PhrasingContent];
    }
}