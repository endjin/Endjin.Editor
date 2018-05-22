/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="../PhrasingContent/AnchorModel.ts" />
/// <reference path="../PhrasingContent/ButtonModel.ts" />
/// <reference path="../PhrasingContent/InputCheckboxModel.ts" />
/// <reference path="../PhrasingContent/InputRadioModel.ts" />
/// <reference path="../PhrasingContent/InputButtonModel.ts" />

namespace Endjin.Editor.Model {
    export class CanvasModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.EmbeddedContent}.canvas`;

        height: number = 150;
        width: number = 300;

        get contentType(): string {
            return CanvasModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.FlowContent];

        canAccept(index: number, child: IModel): boolean {
            if (child.anyInTree((c) => {
                return c.isInteractive && c.contentType !== AnchorModel.ContentType && c.contentType !== ButtonModel.ContentType &&
                    c.contentType !== InputCheckboxModel.ContentType && c.contentType !== InputRadioModel.ContentType && c.contentType !== InputButtonModel.ContentType;
            })) {
                return false;
            }

            return super.canAccept(index, child);
        }
    }
}