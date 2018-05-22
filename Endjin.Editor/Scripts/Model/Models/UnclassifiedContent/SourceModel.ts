/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class SourceModel extends EmptyContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.UnclassifiedContent}.source`;

        type: string = "";
        sizes: Array<string> = [];
        source: string = "";
        sourceSet: Array<string> = [];

        get contentType(): string {
            return SourceModel.ContentType;
        }
    }
}