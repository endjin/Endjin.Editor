/// <reference path="TextDirection.ts" />


namespace Endjin.Editor.Model {
    /** 
     * Interface implemented by a model 
     * 
     * The model is effectively a shadow-DOM model for the view.
     * 
     * All operations in the editing model are executed against the Model
     * 
     * An HTMLElement is then rendered for the Model. This is the View. The rendering is carried
     * out by a singleton IViewAdapter which has been registered for the model. The ViewAdapter
     * uses the ViewEngine to carry out its responsibilities, including registering event handlers
     * for the View.
     *
     * Only changes are rendered allowing updates to be relatively efficient.
     * 
     * The model isn't manipulated directly, but through IModelCommands which themselves call on the
     * model's methods. The Model can registed event handlers on the model side, through the ModelEngine
     * and execute, enable or disable commands accordingly.
     * 
     * These commands are batched through a command handler which makes merging the event stream, winding back
     * and replaying operations relatively straightforward, both for shared editing sessions and undo/redo.
     * 
     */
    export interface IModel {
        /**
         * Get or sets the unique id of the model model
         */
        id: string;

        /**
         * Get the content type of the model
         */
        readonly contentType: string;

        /**
         * Gets the types of children accepted by the model
         */
        readonly acceptsTypes: string[];

        /**
         * Gets the parent of the model
         */
        parent: IModel | null;

        /**
         * Gets or sets a value which indicates whether the model needs to be rendered
         */
        // isDirty: boolean;

        /**
         * Gets a value which indicates whether the model has dirty children
         * */
        // readonly hasDirtyChildren: boolean;

        /**
         * Get a value which indicates whether the model is an interactive model
         */ 
        readonly isInteractive: boolean;

        /**
         * Indicates whether this model is editable for selection
         * 
         * Note that this does not imply that its children are disabled
         */
        isEditable: boolean;

        /**
         * The class of the model (for e.g. stylinh)
         * */
        classList: Array<string>;

        /**
         * A hint as to the access key(s) that should be used
         * to activate the item
         * */
        accessKeys: Array<string>;

        /**
         * The text direction in the control.
         * */
        textDirection: TextDirection | null;

        /**
         * Indicates whether the item is hidden
         * */
        isHidden: boolean | null;

        /**
         * Gets the tab index for the item, or null if the item is not focusable
         * */
        tabIndex: number | null;

        /**
         * Gets the title for the model
         * */
        title: string | null;
        
        
        /**
         * Gets the number of children of the model
         */
        readonly childCount: number;

        /**
         * Enumerate the children of this model
         */
        forEachChild(func: (child: IModel) => void): void;

        /**
         * Indicates whether any model in the tree matches the specified predicate
         */
        anyInTree(func: (child: IModel) => boolean): boolean;

        /**
         * Indicates whether any parent model matches the specified predicate
         * @param func - the predicate to test
         * @param includeSelf - whether to include the model itself in the search
         */
         anyParent(func: (parent: IModel) => boolean, includeSelf?: boolean): boolean;

        /**
         * Get the index of a particular child
         * @param child
         * @returns - the index of the child, or -1 if the model is not a direct child
         */
        getIndex(child: IModel): number;

        /**
         * Get the index of the child in this container whose (inclusive) subtree includes the specified child
         * @param child - the index of the direct child, or -1 if the model is not in the (inclusive) subtree of any children
         */
        getDirectChildIndex(child: IModel): number;

        /**
         * Get the child at a particular index
         * @param index - the index of the child
         * @returns - the model at that index
         */
        getChildAtIndex(index: number): IModel;

        /**
         * Accept a child into the model at the specified index
         * @param index - the index at which to accept the child
         * @param child - the child to accept
         * @returns - the selection containing the accepted child
         */
        acceptChild(index: number, child: IModel): Selection | null;

        /**
         * Indicates whether we can remove a child from the model at the specified index
         * @param index - the index at which to remove the child
         * @returns - true if the child can be removed
         */
        canRemoveChildAtIndex(index: number): boolean

        /**
         * Remove a child from the model at the specified index
         * @param index - the index at which to remove the child
         * @returns - the model that was removed
         */
        removeChildAtIndex(index: number): IModel | null

        /**
         * Determine if the seleciton can be removed
         * @param selection - the selection to remove
         * @returns - true if the selection can be removed
         */
        canRemoveSelection(selection: Selection): boolean;

        /**
         * Remove the specificed selection
         * @param selection - the selection to remove
         * @returns - The affected models
         */
        removeSelection(selection: Selection): Array<IModel>;

        /**
         * Indicates whether we can remove a range of children from the model
         * @param startIndex - the start index at which to remove children (inclusive)
         * @param endIndex - the end index at which to remove children (inclusive)
         */
        canRemoveRange(startIndex: number, endIndex: number): boolean;

        /**
         * Remove a range of children from the model
         * @param startIndex - the start index at which to remove children
         * @param endIndex - the end index at which to remove children
         * @returns - the models that were removed
         */
        removeRange(startIndex: number, endIndex: number): Array<IModel>;

        /**
         * Indicates whether this model can accept the specified model
         * as a child at the specified index
         */
        canAccept(index: number, child: IModel): boolean;

        /**
         * Indicates whether this model can be accepted into the parent
         * at the specified index
         * @param index - the index at which the child is to be accepted
         * @param parent - the parent into which it is to be accepted
         */
        canBeAccepted(index: number, parent: IModel): boolean;
    }
}