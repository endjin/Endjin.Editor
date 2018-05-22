/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="../FlowContent/FormModel.ts" />

namespace Endjin.Editor.Model {
    export enum ButtonType {
        Submit = "submit",
        Reset = "reset",
        Button = "button"
    }

    export class ButtonModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.button`;

        readonly isInteractive: boolean = true;

        autofocus: boolean = false;
        isDisabled: boolean | null = null;
        formActionUri: string | null = null;
        formMethod: FormSubmitMethod | string | null = null;
        formEncodingType: FormEncodingType | null = null;
        formNoValidation: boolean | null = null;
        formTarget: FormTarget | string | null = null;
        buttonType: ButtonType = ButtonType.Submit;
        value: string = "";
        name: string = "";

        get contentType(): string {
            return ButtonModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.PhrasingContent];
    }
}