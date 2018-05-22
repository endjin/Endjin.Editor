/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/UserContent/GoogleMapsModel.ts" />

namespace Endjin.Editor.View {
    export class GoogleMapsAdapter extends ViewAdapterBase<HTMLIFrameElement, Model.GoogleMapsModel> {
        readonly priority: number = 1000;

        protected readonly adapterDisplayName: string = "google maps adapter";
        protected readonly modelContentType: string = Model.GoogleMapsModel.ContentType;
        protected readonly viewTagName: string = "IFRAME";

        protected createModelInstance(): Model.GoogleMapsModel {
            return new Model.GoogleMapsModel();
        }

        canParseView(element: HTMLElement): boolean {
            return super.canParseView(element) && element.hasAttribute("data-googlemaps-embedcode");
        }

        protected applyCustomAttributes(model: Model.GoogleMapsModel, view: HTMLIFrameElement): void {
            view.allowFullscreen = true;
            view.frameBorder = "0";
            view.scrolling = "no";
            view.marginHeight = "0";
            view.marginWidth = "0";
            view.setAttribute("data-googlemaps-embedcode", model.embedCode);
            view.src = this.getSrcFromEmbedCode(model.embedCode);
            view.style.width = model.width;
            view.style.height = model.height;
        }

        protected parseCustomAttributes(model: Model.GoogleMapsModel, view: HTMLIFrameElement): void {
            model.embedCode = view.getAttribute("data-googlemaps-embedcode") || "";
            model.height = view.style.height || "15rem";
            model.width = view.style.width || "100%";
        }

        private getSrcFromEmbedCode(embedCode: string): string {
            let mappedUri = "";

            var index = embedCode.indexOf(`src="`);
            if (index >= 0) {
                index += 5;
                var endIndex = embedCode.indexOf(`"`, index);
                mappedUri = embedCode.substr(index, endIndex - index);
            }

            return mappedUri;
        }
    }
}