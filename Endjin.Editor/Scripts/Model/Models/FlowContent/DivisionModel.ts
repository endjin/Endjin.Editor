/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class DivisionModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.FlowContent}.division`;



        get contentType(): string {
            return DivisionModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.FlowContent];
    }
}