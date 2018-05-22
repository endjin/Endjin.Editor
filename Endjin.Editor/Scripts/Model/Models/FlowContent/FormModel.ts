/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export enum FormAutoComplete {
        Off = "off",
        On = "on"
    }

    export enum FormEncodingType {
        FormUrlEncoded = "application/x-www-form-urlencoded",
        MultipartFormData = "multipart/form-data",
        PlainText = "text/plain"
    }

    export enum FormSubmitMethod {
        Post = "post",
        Get = "get"
    }

    export enum FormTarget {
        Self = "_self",
        Blank = "_blank",
        Parent = "_parent",
        Top = "_top"
    }

    export class FormModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.FlowContent}.form`;

        acceptCharset: Array<string> = ["UNKNOWN"];
        actionUri: string = "";
        autocomplete: FormAutoComplete = FormAutoComplete.Off;
        encodingType: FormEncodingType = FormEncodingType.FormUrlEncoded;
        method: FormSubmitMethod | string = FormSubmitMethod.Post;
        noValidation: boolean = false;
        target: FormTarget | string = FormTarget.Self;

        get contentType(): string {
            return FormModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.FlowContent];

        canAccept(index: number, child: IModel): boolean {
            if (child.anyInTree((c) => c.contentType === FormModel.ContentType)) {
                return false;
            }

            return super.canAccept(index, child);
        }
    }
}