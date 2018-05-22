/// <reference path='InputModelBase.ts' />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class InputImageModel extends InputModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.input.image`;

        sourceUri: string = "";
        alternateText: string = "";

        get contentType(): string {
            return InputImageModel.ContentType;
        }
    }
}