/// <reference path='InputModelBase.ts' />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class InputRangeModel extends InputModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.input.range`;

        step: number | "any" = "any";

        get contentType(): string {
            return InputRangeModel.ContentType;
        }
    }
}