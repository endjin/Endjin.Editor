/// <reference path="ViewEngine.ts" />
/// <reference path="IViewAdapter.ts" />

namespace Endjin.Editor.View {
    export abstract class ViewAdapterBase<TView extends HTMLElement, TModel extends Model.IModel> implements IViewAdapter {
        readonly priority: number = 0;

        protected abstract readonly adapterDisplayName: string;
        protected abstract readonly modelContentType: string;
        protected abstract readonly viewTagName: string;

        protected abstract createModelInstance(): TModel;

        protected applyCustomAttributes(model: TModel, view: TView): void { }
        protected parseCustomAttributes(model: TModel, view: TView): void { }

        viewEngine: ViewEngine;

        render(model: Model.IModel, existingView: HTMLElement | null): HTMLElement {
            if (model.contentType !== this.modelContentType) {
                throw new Error(`The ${this.adapterDisplayName} cannot render a '${model.contentType}'`);
            }

            // Let's not optimize the rerender and see what happens
            // if (!model.isDirty && !model.hasDirtyChildren && existingView !== null) {
            //    return existingView;
            // }

            let view = <TView>existingView || document.createElement(this.viewTagName.toLowerCase());

            let stronglyTypedModel = <TModel>model;

//            if (stronglyTypedModel.isDirty || existingView === null) {
                applyGlobalAttributes(stronglyTypedModel, view);
                this.applyCustomAttributes(stronglyTypedModel, view);
//          }

            view.innerHTML = "";

            model.forEachChild((c) => {
                this.viewEngine.renderAndAppend(view, c);
            });

            return view;

        }

        canParseView(element: HTMLElement): boolean {
            return element.nodeName === this.viewTagName.toUpperCase();
        }

        parseView(element: HTMLElement): Model.IModel {
            let model = this.createModelInstance();

            parseGlobalAttributes(model, element);

            let view = <TView>element;

            this.parseCustomAttributes(model, view);

            this.viewEngine.parseChildren(model, element);

            return model;
        } 
    }
}