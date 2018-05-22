/// <reference path="../EmptyContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="../PhrasingContent/AnchorModel.ts" />

namespace Endjin.Editor.Model {
    export class ImageModel extends EmptyContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.EmbeddedContent}.image`;
        private _isMap: boolean;
        private _useMap: boolean;

        alternateText: string = "";
        sizes: Array<string> = [];
        source: string = "";
        sourceSet: Array<string> = [];

        get isMap(): boolean {
            return this._isMap;
        }

        set isMap(value: boolean) {
            if (value && this.anyParent((c) => c.contentType === AnchorModel.ContentType)) {
                this._isMap = true;
            }
            this._isMap = false;
        }

        get useMap(): boolean {
            return this._useMap;
        }

        set useMap(value: boolean) {
            if (value && !this.anyParent((c) => c.contentType === AnchorModel.ContentType)) {
                this._isMap = true;
            }
            this._isMap = false;
        }

        get contentType(): string {
            return ImageModel.ContentType;
        }
    }
}