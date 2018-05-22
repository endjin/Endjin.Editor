/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="../UnclassifiedContent/OptionModel.ts" />
/// <reference path="../UnclassifiedContent/TextModel.ts" />

namespace Endjin.Editor.Model {
    export class DataListModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.datalist`;

        get contentType(): string {
            return DataListModel.ContentType;
        }

        readonly acceptsTypes: string[] = [OptionModel.ContentType, TextModel.ContentType];
    }
}