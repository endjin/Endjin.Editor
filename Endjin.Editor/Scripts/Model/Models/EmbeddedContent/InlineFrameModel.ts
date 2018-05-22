/// <reference path="../EmptyContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class InlineFrameModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.EmbeddedContent}.inlineframe`;

        allowFullscreen: boolean = false;
        allowPaymentRequest: boolean = false;
        height: number | null = null;
        width: number | null = null;
        name: string = "";
        source: string = "";
        sourceDocument: string| null = null;

        get contentType(): string {
            return InlineFrameModel.ContentType;
        }

        readonly isInteractive: boolean = true;

        readonly acceptsTypes: string[] = [CommonModelTypes.FlowContent];
    }
}