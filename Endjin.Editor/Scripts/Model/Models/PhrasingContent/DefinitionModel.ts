/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class DefinitionModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.definition`;

        get contentType(): string {
            return DefinitionModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.PhrasingContent];

        canAccept(index: number, child: IModel): boolean {
            if (child.anyInTree((c) => c.contentType === DefinitionModel.ContentType)) {
                return false;
            }

            return super.canAccept(index, child);
        }
    }
}