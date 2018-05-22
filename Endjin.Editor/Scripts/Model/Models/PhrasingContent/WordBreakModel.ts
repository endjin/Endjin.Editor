/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class WordBreakModel extends EmptyContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.wordbreak`;

        get contentType(): string {
            return WordBreakModel.ContentType;
        }
    }
}