var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var TextDirection;
            (function (TextDirection) {
                TextDirection["Auto"] = "auto";
                TextDirection["LeftToRight"] = "ltr";
                TextDirection["RightToLeft"] = "rtl";
            })(TextDirection = Model.TextDirection || (Model.TextDirection = {}));
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            function applyGlobalAttributes(model, view) {
                view.id = model.id;
                if (model.classList.length > 0) {
                    (_a = view.classList).add.apply(_a, model.classList);
                }
                if (model.accessKeys.length > 0) {
                    view.accessKey = model.accessKeys.join(" ");
                }
                if (model.textDirection === null) {
                    view.removeAttribute("dir");
                }
                else {
                    view.dir = model.textDirection;
                }
                if (model.isHidden === null) {
                    view.removeAttribute("hidden");
                }
                else {
                    view.hidden = model.isHidden;
                }
                if (model.tabIndex === null) {
                    view.removeAttribute("tabIndex");
                }
                else {
                    view.tabIndex = model.tabIndex;
                }
                if (model.title === null) {
                    view.removeAttribute("title");
                }
                else {
                    view.title = model.title;
                }
                var _a;
            }
            View.applyGlobalAttributes = applyGlobalAttributes;
            function parseGlobalAttributes(model, view) {
                if (view.id) {
                    model.id = view.id;
                }
                for (var i = 0; i < view.classList.length; ++i) {
                    model.classList.push(view.classList[i]);
                }
                if (view.hasAttribute("accessKey")) {
                    var accessKeys = view.accessKey.split(" ");
                    (_a = model.accessKeys).push.apply(_a, accessKeys);
                }
                if (view.hasAttribute("dir")) {
                    model.textDirection = view.dir;
                }
                if (view.hasAttribute("hidden")) {
                    model.isHidden = view.hidden;
                }
                if (view.hasAttribute("tabIndex")) {
                    model.tabIndex = view.tabIndex;
                }
                if (view.hasAttribute("title")) {
                    model.title = view.title;
                }
                var _a;
            }
            View.parseGlobalAttributes = parseGlobalAttributes;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var ContentModelBase = (function () {
                function ContentModelBase() {
                    this.id = (ContentModelBase.NextId++).toString(10);
                    this.parent = null;
                    this.isInteractive = false;
                    this.isEditable = true;
                    this.classList = [];
                    this.accessKeys = [];
                    this.textDirection = null;
                    this.isHidden = null;
                    this.tabIndex = null;
                    this.title = null;
                }
                ContentModelBase.prototype.anyParent = function (func, includeSelf) {
                    if (includeSelf === void 0) { includeSelf = true; }
                    var result = false;
                    var current = includeSelf ? this : this.parent;
                    while (current !== null) {
                        if (func(current)) {
                            return true;
                        }
                        current = current.parent;
                    }
                    return false;
                };
                ContentModelBase.NextId = 0;
                return ContentModelBase;
            }());
            Model.ContentModelBase = ContentModelBase;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var CommonModelTypes = (function () {
                function CommonModelTypes() {
                }
                CommonModelTypes.FlowContent = "application/vnd.endjin.editor.model.flow";
                CommonModelTypes.PhrasingContent = CommonModelTypes.FlowContent + ".phrasing";
                CommonModelTypes.SectioningContent = CommonModelTypes.FlowContent + ".sectioning";
                CommonModelTypes.HeadingContent = CommonModelTypes.FlowContent + ".heading";
                CommonModelTypes.EmbeddedContent = CommonModelTypes.PhrasingContent + ".embedded";
                CommonModelTypes.UnclassifiedContent = "application/vnd.endjin.editor.model.unclassified";
                return CommonModelTypes;
            }());
            Model.CommonModelTypes = CommonModelTypes;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var EmptyContentModelBase = (function (_super) {
                __extends(EmptyContentModelBase, _super);
                function EmptyContentModelBase() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.childCount = 0;
                    return _this;
                }
                Object.defineProperty(EmptyContentModelBase.prototype, "acceptsTypes", {
                    get: function () { return []; },
                    enumerable: true,
                    configurable: true
                });
                EmptyContentModelBase.prototype.forEachChild = function (func) {
                };
                EmptyContentModelBase.prototype.anyInTree = function (func) {
                    return func(this);
                };
                EmptyContentModelBase.prototype.getIndex = function (child) {
                    return -1;
                };
                EmptyContentModelBase.prototype.getDirectChildIndex = function (child) {
                    return -1;
                };
                EmptyContentModelBase.prototype.getChildAtIndex = function (index) {
                    throw new Error("Index out of range");
                };
                EmptyContentModelBase.prototype.canAccept = function (index, child) {
                    return false;
                };
                EmptyContentModelBase.prototype.acceptChild = function (index, child) {
                    return null;
                };
                EmptyContentModelBase.prototype.canRemoveSelection = function (selection) {
                    return false;
                };
                EmptyContentModelBase.prototype.removeSelection = function (selection) {
                    return [];
                };
                EmptyContentModelBase.prototype.canRemoveChildAtIndex = function (index) {
                    return false;
                };
                EmptyContentModelBase.prototype.canRemoveRange = function (startIndex, endIndex) {
                    return false;
                };
                EmptyContentModelBase.prototype.removeRange = function (startIndex, endIndex) {
                    return [];
                };
                EmptyContentModelBase.prototype.removeChildAtIndex = function (index) {
                    return null;
                };
                EmptyContentModelBase.prototype.canBeAccepted = function (index, parent) {
                    return true;
                };
                return EmptyContentModelBase;
            }(Model.ContentModelBase));
            Model.EmptyContentModelBase = EmptyContentModelBase;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var TextModel = (function (_super) {
                __extends(TextModel, _super);
                function TextModel(textRun) {
                    var _this = _super.call(this) || this;
                    _this.textRun = textRun;
                    _this.acceptsTypes = [TextModel.ContentType];
                    return _this;
                }
                Object.defineProperty(TextModel.prototype, "contentType", {
                    get: function () {
                        return TextModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                TextModel.prototype.canRemoveRange = function (startIndex, endIndex) {
                    if (startIndex < 0 || startIndex > this.textRun.length - 1 ||
                        endIndex < 0 || endIndex > this.textRun.length - 1 ||
                        startIndex > endIndex) {
                        return false;
                    }
                    return true;
                };
                TextModel.prototype.removeRange = function (startIndex, endIndex) {
                    if (!this.canRemoveRange(startIndex, endIndex)) {
                        return [];
                    }
                    var removedRun = this.textRun.substring(startIndex, endIndex);
                    this.textRun = (startIndex > 0 ? this.textRun.substring(0, startIndex) : "") + (endIndex < this.textRun.length - 1 ? this.textRun.substring(endIndex + 1) : "");
                    return [new TextModel(removedRun)];
                };
                TextModel.prototype.canAccept = function (index, child) {
                    return index >= 0 && index <= this.textRun.length && child.contentType === TextModel.ContentType;
                };
                TextModel.prototype.acceptChild = function (index, child) {
                    if (!this.canAccept(index, child)) {
                        return null;
                    }
                    var model = child;
                    this.textRun = this.textRun.slice(0, index) + model.textRun + this.textRun.slice(index);
                    return new Model.Selection(this, new Model.Location(this, index), new Model.Location(this, index + model.textRun.length));
                };
                TextModel.prototype.canRemoveSelection = function (selection) {
                    var normalizedSelection = selection.normalize();
                    var startIndex = normalizedSelection.selectionStart.model === this ? normalizedSelection.selectionStart.index : 0;
                    var endIndex = normalizedSelection.selectionEnd.model === this ? normalizedSelection.selectionEnd.index : this.textRun.length - 1;
                    return this.canRemoveRange(startIndex, endIndex);
                };
                TextModel.prototype.removeSelection = function (selection) {
                    var normalizedSelection = selection.normalize();
                    var startIndex = normalizedSelection.selectionStart.model === this ? normalizedSelection.selectionStart.index : 0;
                    var endIndex = normalizedSelection.selectionEnd.model === this ? normalizedSelection.selectionEnd.index : this.textRun.length - 1;
                    return this.removeRange(startIndex, endIndex);
                };
                TextModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".text";
                return TextModel;
            }(Model.EmptyContentModelBase));
            Model.TextModel = TextModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var ViewEngine = (function () {
                function ViewEngine(editor) {
                    this.editor = editor;
                    this.viewAdapters = new Array();
                    this.modelToViewAdapter = new Map();
                    this.modelToView = new Map();
                    this.viewToModel = new Map();
                    this.modelToViewEventHandlers = new Map();
                }
                ViewEngine.prototype.destroy = function () {
                    this.modelToViewEventHandlers.forEach(function (l) {
                        l.forEach(function (v) { return v.destroy(); });
                    });
                };
                ViewEngine.prototype.destroyModels = function () {
                    var _this = this;
                    var models = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        models[_i] = arguments[_i];
                    }
                    models.forEach(function (m) {
                        m.forEachChild(function (c) {
                            _this.destroyModels(c);
                        });
                        var l = _this.modelToViewEventHandlers.get(m.id) || [];
                        l.forEach(function (v) { return v.destroy(); });
                        _this.modelToViewEventHandlers.delete(m.id);
                        var view = _this.modelToView.get(m.id) || null;
                        _this.modelToView.delete(m.id);
                        if (view !== null) {
                            _this.viewToModel.delete(view);
                        }
                    });
                };
                ViewEngine.prototype.addViewEventHandler = function (handler, model) {
                    var view = this.getViewForModel(model);
                    var handlers = this.modelToViewEventHandlers.get(model.id) || null;
                    if (handlers === null) {
                        handlers = [];
                        this.modelToViewEventHandlers.set(model.id, handlers);
                    }
                    handlers.push(handler);
                    handler.attachToView(view);
                    handler.editor = this.editor;
                };
                ViewEngine.prototype.render = function (model) {
                    var existingView = this.getViewForModel(model);
                    var view;
                    if (model.contentType === Editor.Model.TextModel.ContentType) {
                        if (existingView !== null) {
                            view = existingView;
                            var textNode = view;
                            textNode.textContent = model.textRun;
                        }
                        else {
                            view = document.createTextNode(model.textRun);
                        }
                    }
                    else {
                        var viewAdapter = this.getViewAdapterForModel(model);
                        view = viewAdapter.render(model, existingView);
                        if (model.isEditable) {
                            if (model !== this.editor.document.root) {
                                view.removeAttribute("contenteditable");
                            }
                        }
                        else {
                            view.contentEditable = "false";
                        }
                    }
                    if (existingView !== view) {
                        if (existingView !== null) {
                            this.viewToModel.delete(existingView);
                        }
                        this.viewToModel.set(view, model);
                        this.modelToView.set(model.id, view);
                    }
                    return view;
                };
                ViewEngine.prototype.renderAndAppend = function (view, model) {
                    var childView = this.render(model);
                    view.appendChild(childView);
                };
                ViewEngine.prototype.canParse = function (view) {
                    if (view.nodeName === "#text") {
                        return true;
                    }
                    if (view.nodeName === "#comment" || view.nodeName === "#document") {
                        return false;
                    }
                    return this.viewAdapters.some(function (v) {
                        return v.canParseView(view);
                    });
                };
                ViewEngine.prototype.parseChildren = function (model, view) {
                    var totalSuccess = true;
                    for (var i = 0; i < view.childNodes.length; ++i) {
                        var node = view.childNodes[i];
                        if (this.canParse(node)) {
                            var child = this.parse(node);
                            var acceptedChild = model.acceptChild(model.childCount, child);
                            if (acceptedChild === null) {
                                console.log("Failed to accept child");
                            }
                            totalSuccess = totalSuccess && (acceptedChild !== null);
                        }
                        else {
                            totalSuccess = false;
                        }
                    }
                    return totalSuccess;
                };
                ViewEngine.prototype.parse = function (view) {
                    if (view.nodeName === "#text") {
                        return new Editor.Model.TextModel(view.textContent || "");
                    }
                    if (view.nodeName === "#comment" || view.nodeName === "#document") {
                        throw new Error("Unable to parse a " + view.nodeName);
                    }
                    var htmlElement = view;
                    var matchedAdapters = this.viewAdapters.filter(function (v) {
                        return v.canParseView(htmlElement);
                    }).sort(function (a, b) { return a.priority > b.priority ? -1 : a.priority === b.priority ? 0 : 1; });
                    if (matchedAdapters.length === 0) {
                        throw new Error("Unable to parse the specified view.");
                    }
                    return matchedAdapters[0].parseView(htmlElement);
                };
                ViewEngine.prototype.findContainingModel = function (view) {
                    var current = view;
                    var previous = view;
                    while (current !== null && !this.viewToModel.has(current)) {
                        previous = current;
                        current = current.parentElement;
                    }
                    if (current === null) {
                        return null;
                    }
                    return this.viewToModel.get(current) || null;
                };
                ViewEngine.prototype.addViewAdapter = function (modelType, viewAdapter) {
                    if (this.modelToViewAdapter.has(modelType)) {
                        throw new Error("A view adapter has already been registered for '" + modelType + "'");
                    }
                    this.modelToViewAdapter.set(modelType, viewAdapter);
                    this.viewAdapters.push(viewAdapter);
                    viewAdapter.viewEngine = this;
                };
                ViewEngine.prototype.deleteViewAdapter = function (modelType) {
                    var viewAdapter = this.modelToViewAdapter.get(modelType) || null;
                    if (viewAdapter === null) {
                        return false;
                    }
                    var index = this.viewAdapters.indexOf(viewAdapter);
                    this.viewAdapters.splice(index, 1);
                    return this.modelToViewAdapter.delete(modelType);
                };
                ViewEngine.prototype.getSelection = function () {
                    var sel = document.getSelection();
                    if (sel.rangeCount === 0) {
                        return null;
                    }
                    var range = sel.getRangeAt(0);
                    var selectionScope = this.findContainingModel(range.commonAncestorContainer);
                    var startModel = this.findContainingModel(range.startContainer);
                    var endModel = this.findContainingModel(range.endContainer);
                    if (startModel === null || endModel === null || selectionScope === null) {
                        return null;
                    }
                    return new Editor.Model.Selection(selectionScope, new Editor.Model.Location(startModel, range.startOffset), new Editor.Model.Location(endModel, range.endOffset));
                };
                ViewEngine.prototype.setSelection = function (selection) {
                    var sel = document.getSelection();
                    sel.removeAllRanges();
                    if (selection === null) {
                        return true;
                    }
                    var range = document.createRange();
                    var startNode = this.getViewForModel(selection.selectionStart.model);
                    if (startNode === null) {
                        return false;
                    }
                    range.setStart(startNode, selection.selectionStart.index);
                    var endNode = this.getViewForModel(selection.selectionEnd.model);
                    if (endNode === null) {
                        return false;
                    }
                    range.setEnd(endNode, selection.selectionEnd.index);
                    sel.addRange(range);
                    return true;
                };
                ViewEngine.prototype.getViewAdapterForModel = function (model) {
                    var viewAdapter = this.modelToViewAdapter.get(model.contentType);
                    if (!viewAdapter) {
                        throw new Error("No view adapter found for '" + model.contentType + "'");
                    }
                    return viewAdapter;
                };
                ViewEngine.prototype.getViewForModel = function (model) {
                    return this.modelToView.get(model.id) || null;
                };
                return ViewEngine;
            }());
            View.ViewEngine = ViewEngine;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var Document = (function () {
                function Document() {
                }
                return Document;
            }());
            Model.Document = Document;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var Location = (function () {
                function Location(model, index) {
                    this.model = model;
                    this.index = index;
                }
                Location.prototype.equals = function (other) {
                    return this.model === other.model && this.index === other.index;
                };
                Location.prototype.isBefore = function (other) {
                    if (this.model === other.model) {
                        return this.index < other.index;
                    }
                    return Model.isModelElementBefore(this.model, other.model);
                };
                Location.prototype.isAfter = function (other) {
                    if (this.model === other.model) {
                        return this.index > other.index;
                    }
                    return Model.isModelElementAfter(this.model, other.model);
                };
                return Location;
            }());
            Model.Location = Location;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var Selection = (function () {
                function Selection(selectionScope, selectionStart, selectionEnd) {
                    this.selectionScope = selectionScope;
                    this.selectionStart = selectionStart;
                    this.selectionEnd = selectionEnd;
                }
                Object.defineProperty(Selection.prototype, "isCollapsed", {
                    get: function () {
                        return this.selectionStart.equals(this.selectionEnd);
                    },
                    enumerable: true,
                    configurable: true
                });
                Selection.prototype.collapseToStart = function () {
                    if (this.isCollapsed) {
                        return this;
                    }
                    return new Selection(this.selectionStart.model, this.selectionStart, this.selectionStart);
                };
                Selection.prototype.collapseToEnd = function () {
                    if (this.isCollapsed) {
                        return this;
                    }
                    return new Selection(this.selectionEnd.model, this.selectionEnd, this.selectionEnd);
                };
                Selection.prototype.collapseToFirst = function () {
                    if (this.selectionStart.isAfter(this.selectionEnd)) {
                        return new Selection(this.selectionEnd.model, this.selectionEnd, this.selectionEnd);
                    }
                    return new Selection(this.selectionStart.model, this.selectionStart, this.selectionStart);
                };
                Selection.prototype.collapseToLast = function () {
                    if (this.selectionStart.isAfter(this.selectionEnd)) {
                        return new Selection(this.selectionStart.model, this.selectionStart, this.selectionStart);
                    }
                    return new Selection(this.selectionEnd.model, this.selectionEnd, this.selectionEnd);
                };
                Selection.prototype.normalize = function () {
                    if (this.selectionStart.isAfter(this.selectionEnd)) {
                        return new Selection(this.selectionScope, this.selectionEnd, this.selectionStart);
                    }
                    return this;
                };
                return Selection;
            }());
            Model.Selection = Selection;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var KeyState;
            (function (KeyState) {
                KeyState[KeyState["AwaitingFirst"] = 0] = "AwaitingFirst";
                KeyState[KeyState["AwaitingSecond"] = 1] = "AwaitingSecond";
            })(KeyState || (KeyState = {}));
            ;
            var KeyboardShortcutEngine = (function () {
                function KeyboardShortcutEngine(editor) {
                    this.editor = editor;
                    this.bindings = [];
                    this.keyState = KeyState.AwaitingFirst;
                    this.candidateBindings = [];
                }
                KeyboardShortcutEngine.prototype.registerKeychord = function (keychord, command) {
                    this.bindings = this.bindings.filter(function (k) { return !keychord.equals(k.keychord); });
                    this.bindings.push({ keychord: keychord, command: command });
                };
                KeyboardShortcutEngine.prototype.registerKeypress = function (keypress, command) {
                    var keychord = new Model.Keychord(keypress, null);
                    this.bindings = this.bindings.filter(function (k) { return !keychord.equals(k.keychord); });
                    this.bindings.push({ keychord: keychord, command: command });
                };
                KeyboardShortcutEngine.prototype.dispatchKeyboardShortcut = function (keypress) {
                    var result = false;
                    if (this.keyState === KeyState.AwaitingFirst) {
                        for (var i = 0; i < this.bindings.length; ++i) {
                            var binding = this.bindings[i];
                            if (binding.keychord.first.equals(keypress)) {
                                result = true;
                                if (binding.keychord.second === null) {
                                    this.editor.executeCommand(binding.command);
                                    this.keyState = KeyState.AwaitingFirst;
                                    this.candidateBindings.length = 0;
                                    break;
                                }
                                else {
                                    this.keyState = KeyState.AwaitingSecond;
                                    this.candidateBindings.push(binding);
                                }
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < this.candidateBindings.length; ++i) {
                            var binding = this.candidateBindings[i];
                            if (binding.keychord.second !== null && binding.keychord.second.equals(keypress)) {
                                this.editor.executeCommand(binding.command);
                                break;
                            }
                        }
                        this.keyState = KeyState.AwaitingFirst;
                        this.candidateBindings.length = 0;
                        return true;
                    }
                    return false;
                };
                return KeyboardShortcutEngine;
            }());
            Model.KeyboardShortcutEngine = KeyboardShortcutEngine;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var ViewAdapterBase = (function () {
                function ViewAdapterBase() {
                    this.priority = 0;
                }
                ViewAdapterBase.prototype.applyCustomAttributes = function (model, view) { };
                ViewAdapterBase.prototype.parseCustomAttributes = function (model, view) { };
                ViewAdapterBase.prototype.render = function (model, existingView) {
                    var _this = this;
                    if (model.contentType !== this.modelContentType) {
                        throw new Error("The " + this.adapterDisplayName + " cannot render a '" + model.contentType + "'");
                    }
                    var view = existingView || document.createElement(this.viewTagName.toLowerCase());
                    var stronglyTypedModel = model;
                    View.applyGlobalAttributes(stronglyTypedModel, view);
                    this.applyCustomAttributes(stronglyTypedModel, view);
                    view.innerHTML = "";
                    model.forEachChild(function (c) {
                        _this.viewEngine.renderAndAppend(view, c);
                    });
                    return view;
                };
                ViewAdapterBase.prototype.canParseView = function (element) {
                    return element.nodeName === this.viewTagName.toUpperCase();
                };
                ViewAdapterBase.prototype.parseView = function (element) {
                    var model = this.createModelInstance();
                    View.parseGlobalAttributes(model, element);
                    var view = element;
                    this.parseCustomAttributes(model, view);
                    this.viewEngine.parseChildren(model, element);
                    return model;
                };
                return ViewAdapterBase;
            }());
            View.ViewAdapterBase = ViewAdapterBase;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var ChildContentModelBase = (function (_super) {
                __extends(ChildContentModelBase, _super);
                function ChildContentModelBase() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.children = [];
                    return _this;
                }
                Object.defineProperty(ChildContentModelBase.prototype, "childCount", {
                    get: function () {
                        return this.children.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                ChildContentModelBase.prototype.forEachChild = function (func) {
                    this.children.forEach(function (child) { return func(child); });
                };
                ChildContentModelBase.prototype.anyInTree = function (func) {
                    return func(this) || this.children.some(function (v) { return func(v); });
                };
                ChildContentModelBase.prototype.getIndex = function (child) {
                    return this.children.indexOf(child);
                };
                ChildContentModelBase.prototype.getChildAtIndex = function (index) {
                    if (index < 0 || index > this.children.length - 1) {
                        throw new Error("Index out of range");
                    }
                    return this.children[index];
                };
                ChildContentModelBase.prototype.getDirectChildIndex = function (model) {
                    var currentCandidate = model;
                    var index = this.children.indexOf(currentCandidate);
                    while (currentCandidate !== null && currentCandidate !== this) {
                        var index_1 = this.children.indexOf(currentCandidate);
                        if (index_1 === -1) {
                            currentCandidate = currentCandidate.parent;
                        }
                        else {
                            return index_1;
                        }
                    }
                    return -1;
                };
                ChildContentModelBase.prototype.anyParent = function (func, includeSelf) {
                    if (includeSelf === void 0) { includeSelf = true; }
                    var result = false;
                    var current = includeSelf ? this : this.parent;
                    while (current !== null) {
                        if (func(current)) {
                            return true;
                        }
                        current = current.parent;
                    }
                    return false;
                };
                ChildContentModelBase.prototype.acceptChild = function (index, child) {
                    if (!this.canAccept(index, child)) {
                        return null;
                    }
                    if (index == this.children.length) {
                        this.children.push(child);
                    }
                    else {
                        this.children.splice(index, 0, child);
                    }
                    child.parent = this;
                    return new Model.Selection(this, new Model.Location(this, index), new Model.Location(this, index + 1));
                };
                ChildContentModelBase.prototype.canRemoveChildAtIndex = function (index) {
                    return this.canRemoveRange(index, index);
                };
                ChildContentModelBase.prototype.canRemoveRange = function (startIndex, endIndex) {
                    if (startIndex < 0 || startIndex > this.children.length - 1 ||
                        endIndex < 0 || endIndex > this.children.length - 1 ||
                        startIndex > endIndex) {
                        return false;
                    }
                    return true;
                };
                ChildContentModelBase.prototype.removeRange = function (startIndex, endIndex) {
                    if (!this.canRemoveRange(startIndex, endIndex)) {
                        return [];
                    }
                    return this.children.splice(startIndex, (endIndex - startIndex) + 1);
                };
                ChildContentModelBase.prototype.removeChildAtIndex = function (index) {
                    var removed = this.removeRange(index, index);
                    if (removed.length === 0) {
                        return null;
                    }
                    return removed[0];
                };
                ChildContentModelBase.prototype.canRemoveSelection = function (selection) {
                    if (selection.selectionScope !== this) {
                        return false;
                    }
                    if (selection.isCollapsed) {
                        return true;
                    }
                    if (selection.selectionStart.model.contentType !== Model.TextModel.ContentType ||
                        selection.selectionEnd.model.contentType !== Model.TextModel.ContentType) {
                        return false;
                    }
                    var normalizedSelection = selection.normalize();
                    var startTextModel = normalizedSelection.selectionStart.model;
                    var endTextModel = normalizedSelection.selectionEnd.model;
                    var startIndex = normalizedSelection.selectionStart.index;
                    var endIndex = normalizedSelection.selectionEnd.index;
                    if (startTextModel === endTextModel) {
                        return startTextModel.canRemoveRange(startIndex, endIndex);
                    }
                    if (!startTextModel.canRemoveRange(startIndex, startTextModel.textRun.length - 1)) {
                        return false;
                    }
                    if (!endTextModel.canRemoveRange(0, endIndex)) {
                        return false;
                    }
                    return true;
                };
                ChildContentModelBase.prototype.removeSelection = function (selection) {
                    var removedModels = [];
                    if (!this.canRemoveSelection(selection)) {
                        return removedModels;
                    }
                    var normalizedSelection = selection.normalize();
                    var startTextModel = normalizedSelection.selectionStart.model;
                    var endTextModel = normalizedSelection.selectionEnd.model;
                    var startIndex = normalizedSelection.selectionStart.index;
                    var endIndex = normalizedSelection.selectionEnd.index;
                    var startTextModelParent = startTextModel.parent;
                    var endTextModelParent = endTextModel.parent;
                    if (startTextModel === endTextModel) {
                        return startTextModel.removeRange(startIndex, endIndex);
                    }
                    removedModels.push.apply(removedModels, startTextModel.removeRange(startIndex, startTextModel.textRun.length - 1));
                    endTextModel.removeRange(0, endIndex - 1);
                    var currentModel = endTextModel;
                    while (currentModel !== null && currentModel !== this && currentModel.parent !== null && currentModel !== startTextModel) {
                        var previousModelInTree = Model.getPreviousModel(currentModel);
                        if (currentModel.childCount === 0) {
                            removedModels.push(currentModel);
                            Model.removeChildFromParent(currentModel);
                        }
                        currentModel = previousModelInTree;
                    }
                    startTextModel.acceptChild(startTextModel.textRun.length, endTextModel);
                    if (startTextModelParent !== endTextModelParent) {
                        var currentCandidate = endTextModelParent;
                        while (currentCandidate !== null && currentCandidate.contentType.lastIndexOf(Model.CommonModelTypes.PhrasingContent, 0) > -1) {
                            currentCandidate = currentCandidate.parent;
                        }
                        if (currentCandidate !== null && currentCandidate !== startTextModelParent) {
                            var removedItems = currentCandidate.removeRange(0, currentCandidate.childCount - 1);
                            var insertionIndex = startTextModelParent.getIndex(startTextModel) + 1;
                            for (var i = 0; i < removedItems.length; ++i) {
                                startTextModelParent.acceptChild(insertionIndex++, removedItems[i]);
                            }
                            var currentCandidateParent = currentCandidate.parent;
                            var indexToRemove = currentCandidateParent.getIndex(currentCandidate);
                            currentCandidateParent.removeChildAtIndex(indexToRemove);
                            removedModels.push(currentCandidate);
                        }
                    }
                    return removedModels;
                };
                ChildContentModelBase.prototype.canAccept = function (index, child) {
                    if (index < 0 || index > this.children.length) {
                        return false;
                    }
                    return this.acceptsTypes.some(function (v) {
                        return child.contentType.lastIndexOf(v, 0) === 0;
                    });
                };
                ChildContentModelBase.prototype.canBeAccepted = function (index, parent) {
                    return true;
                };
                return ChildContentModelBase;
            }(Model.ContentModelBase));
            Model.ChildContentModelBase = ChildContentModelBase;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var TrackModel = (function (_super) {
                __extends(TrackModel, _super);
                function TrackModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(TrackModel.prototype, "contentType", {
                    get: function () {
                        return TrackModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                TrackModel.ContentType = Model.CommonModelTypes.UnclassifiedContent + ".track";
                return TrackModel;
            }(Model.EmptyContentModelBase));
            Model.TrackModel = TrackModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var SourceModel = (function (_super) {
                __extends(SourceModel, _super);
                function SourceModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.type = "";
                    _this.sizes = [];
                    _this.source = "";
                    _this.sourceSet = [];
                    return _this;
                }
                Object.defineProperty(SourceModel.prototype, "contentType", {
                    get: function () {
                        return SourceModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                SourceModel.ContentType = Model.CommonModelTypes.UnclassifiedContent + ".source";
                return SourceModel;
            }(Model.EmptyContentModelBase));
            Model.SourceModel = SourceModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var VideoModel = (function (_super) {
                __extends(VideoModel, _super);
                function VideoModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.SourceModel.ContentType, Model.TrackModel.ContentType, Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(VideoModel.prototype, "contentType", {
                    get: function () {
                        return VideoModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(VideoModel.prototype, "isInteractive", {
                    get: function () {
                        return this.showControls;
                    },
                    enumerable: true,
                    configurable: true
                });
                VideoModel.prototype.canAccept = function (index, child) {
                    if (child.anyInTree(function (c) { return c.contentType === Model.AudioModel.ContentType || c.contentType === VideoModel.ContentType; })) {
                        return false;
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                VideoModel.ContentType = Model.CommonModelTypes.EmbeddedContent + ".video";
                return VideoModel;
            }(Model.ChildContentModelBase));
            Model.VideoModel = VideoModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var AudioModel = (function (_super) {
                __extends(AudioModel, _super);
                function AudioModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._volume = 1.0;
                    _this.acceptsTypes = [Model.SourceModel.ContentType, Model.TrackModel.ContentType, Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(AudioModel.prototype, "volume", {
                    get: function () {
                        return this._volume;
                    },
                    set: function (value) {
                        this._volume = Math.min(Math.max(0, value), 1);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AudioModel.prototype, "contentType", {
                    get: function () {
                        return AudioModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AudioModel.prototype, "isInteractive", {
                    get: function () {
                        return this.showControls;
                    },
                    enumerable: true,
                    configurable: true
                });
                AudioModel.prototype.canAccept = function (index, child) {
                    if (child.anyInTree(function (c) { return c.contentType === AudioModel.ContentType || c.contentType === Model.VideoModel.ContentType; })) {
                        return false;
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                AudioModel.ContentType = Model.CommonModelTypes.EmbeddedContent + ".audio";
                return AudioModel;
            }(Model.ChildContentModelBase));
            Model.AudioModel = AudioModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var AudioAdapter = (function (_super) {
                __extends(AudioAdapter, _super);
                function AudioAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "audio adapter";
                    _this.modelContentType = Editor.Model.AudioModel.ContentType;
                    _this.viewTagName = "AUDIO";
                    return _this;
                }
                AudioAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.AudioModel();
                };
                AudioAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.autoplay = model.autoplay;
                    view.controls = model.showControls;
                    view.loop = model.loop;
                    view.muted = model.isMuted;
                    view.src = model.source;
                };
                AudioAdapter.prototype.parseCustomAttributes = function (model, view) {
                    model.autoplay = view.autoplay;
                    model.showControls = view.controls;
                    model.loop = view.loop;
                    model.isMuted = view.muted;
                    model.source = view.src;
                };
                return AudioAdapter;
            }(View.ViewAdapterBase));
            View.AudioAdapter = AudioAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var AnchorTarget;
            (function (AnchorTarget) {
                AnchorTarget["Self"] = "_self";
                AnchorTarget["Blank"] = "_blank";
                AnchorTarget["Parent"] = "_parent";
                AnchorTarget["Top"] = "_top";
            })(AnchorTarget = Model.AnchorTarget || (Model.AnchorTarget = {}));
            var AnchorModel = (function (_super) {
                __extends(AnchorModel, _super);
                function AnchorModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.isInteractive = true;
                    _this.href = "";
                    _this.rel = [];
                    _this.target = "";
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(AnchorModel.prototype, "contentType", {
                    get: function () {
                        return AnchorModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                AnchorModel.prototype.canAccept = function (index, child) {
                    if (child.anyInTree(function (c) { return c.contentType === AnchorModel.ContentType; })) {
                        return false;
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                AnchorModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".anchor";
                return AnchorModel;
            }(Model.ChildContentModelBase));
            Model.AnchorModel = AnchorModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var FormAutoComplete;
            (function (FormAutoComplete) {
                FormAutoComplete["Off"] = "off";
                FormAutoComplete["On"] = "on";
            })(FormAutoComplete = Model.FormAutoComplete || (Model.FormAutoComplete = {}));
            var FormEncodingType;
            (function (FormEncodingType) {
                FormEncodingType["FormUrlEncoded"] = "application/x-www-form-urlencoded";
                FormEncodingType["MultipartFormData"] = "multipart/form-data";
                FormEncodingType["PlainText"] = "text/plain";
            })(FormEncodingType = Model.FormEncodingType || (Model.FormEncodingType = {}));
            var FormSubmitMethod;
            (function (FormSubmitMethod) {
                FormSubmitMethod["Post"] = "post";
                FormSubmitMethod["Get"] = "get";
            })(FormSubmitMethod = Model.FormSubmitMethod || (Model.FormSubmitMethod = {}));
            var FormTarget;
            (function (FormTarget) {
                FormTarget["Self"] = "_self";
                FormTarget["Blank"] = "_blank";
                FormTarget["Parent"] = "_parent";
                FormTarget["Top"] = "_top";
            })(FormTarget = Model.FormTarget || (Model.FormTarget = {}));
            var FormModel = (function (_super) {
                __extends(FormModel, _super);
                function FormModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptCharset = ["UNKNOWN"];
                    _this.actionUri = "";
                    _this.autocomplete = FormAutoComplete.Off;
                    _this.encodingType = FormEncodingType.FormUrlEncoded;
                    _this.method = FormSubmitMethod.Post;
                    _this.noValidation = false;
                    _this.target = FormTarget.Self;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(FormModel.prototype, "contentType", {
                    get: function () {
                        return FormModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                FormModel.prototype.canAccept = function (index, child) {
                    if (child.anyInTree(function (c) { return c.contentType === FormModel.ContentType; })) {
                        return false;
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                FormModel.ContentType = Model.CommonModelTypes.FlowContent + ".form";
                return FormModel;
            }(Model.ChildContentModelBase));
            Model.FormModel = FormModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var ButtonType;
            (function (ButtonType) {
                ButtonType["Submit"] = "submit";
                ButtonType["Reset"] = "reset";
                ButtonType["Button"] = "button";
            })(ButtonType = Model.ButtonType || (Model.ButtonType = {}));
            var ButtonModel = (function (_super) {
                __extends(ButtonModel, _super);
                function ButtonModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.isInteractive = true;
                    _this.autofocus = false;
                    _this.isDisabled = null;
                    _this.formActionUri = null;
                    _this.formMethod = null;
                    _this.formEncodingType = null;
                    _this.formNoValidation = null;
                    _this.formTarget = null;
                    _this.buttonType = ButtonType.Submit;
                    _this.value = "";
                    _this.name = "";
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(ButtonModel.prototype, "contentType", {
                    get: function () {
                        return ButtonModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                ButtonModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".button";
                return ButtonModel;
            }(Model.ChildContentModelBase));
            Model.ButtonModel = ButtonModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var AutocompleteOptions;
            (function (AutocompleteOptions) {
                AutocompleteOptions["Off"] = "off";
                AutocompleteOptions["On"] = "on";
                AutocompleteOptions["Name"] = "name";
                AutocompleteOptions["HonorificPrefix"] = "honorific-prefix";
                AutocompleteOptions["GivenName"] = "given-name";
                AutocompleteOptions["AdditionalName"] = "additional-name";
                AutocompleteOptions["FamilyName"] = "family-name";
                AutocompleteOptions["HonorificSuffix"] = "honorific-suffix";
                AutocompleteOptions["Nickname"] = "nickname";
                AutocompleteOptions["Email"] = "email";
                AutocompleteOptions["Username"] = "username";
                AutocompleteOptions["NewPassword"] = "new-password";
                AutocompleteOptions["CurrentPassword"] = "current-password";
                AutocompleteOptions["OrganizationTitle"] = "organization-title";
                AutocompleteOptions["Organization"] = "organization";
                AutocompleteOptions["StreetAddress"] = "street-address";
                AutocompleteOptions["AddressLine1"] = "address-line1";
                AutocompleteOptions["AddressLine2"] = "address-line2";
                AutocompleteOptions["AddressLine3"] = "address-line3";
                AutocompleteOptions["AddressLevel1"] = "address-level1";
                AutocompleteOptions["AddressLevel2"] = "address-level2";
                AutocompleteOptions["AddressLevel3"] = "address-level3";
                AutocompleteOptions["AddressLevel4"] = "address-level4";
                AutocompleteOptions["Country"] = "country";
                AutocompleteOptions["CountryName"] = "country-name";
                AutocompleteOptions["PostalCode"] = "postal-code";
                AutocompleteOptions["CCName"] = "cc-name";
                AutocompleteOptions["CCGivenName"] = "cc-given-name";
                AutocompleteOptions["CCAdditionalName"] = "cc-additional-name";
                AutocompleteOptions["CCFamilyName"] = "cc-family-name";
                AutocompleteOptions["CCNumber"] = "cc-number";
                AutocompleteOptions["CCExpiryDate"] = "cc-expiry";
                AutocompleteOptions["CCExpiryMonth"] = "cc-expiry-month";
                AutocompleteOptions["CCExpiryYear"] = "cc-expiry-year";
                AutocompleteOptions["CCCSC"] = "cc-csc";
                AutocompleteOptions["CCType"] = "cc-type";
                AutocompleteOptions["TransactionCurrency"] = "transaction-currency";
                AutocompleteOptions["TransactionAmount"] = "transaction-amount";
                AutocompleteOptions["Language"] = "language";
                AutocompleteOptions["Birthday"] = "bday";
                AutocompleteOptions["BirthdayMonth"] = "bday-month";
                AutocompleteOptions["BirthdayYear"] = "bday-year";
                AutocompleteOptions["Sex"] = "sex";
                AutocompleteOptions["Telephone"] = "tel";
                AutocompleteOptions["TelephoneCountryCode"] = "tel-country-code";
                AutocompleteOptions["TelephoneNational"] = "tel-national";
                AutocompleteOptions["TelephoneAreaCode"] = "tel-area-code";
                AutocompleteOptions["TelephoneLocal"] = "tel-local";
                AutocompleteOptions["TelephoneLocalPrefix"] = "tel-local-prefix";
                AutocompleteOptions["TelephoneLocalSuffix"] = "tel-local-suffix";
                AutocompleteOptions["TelephoneExtension"] = "tel-extension";
                AutocompleteOptions["Url"] = "url";
                AutocompleteOptions["Photo"] = "photo";
            })(AutocompleteOptions = Model.AutocompleteOptions || (Model.AutocompleteOptions = {}));
            var SelectionDirection;
            (function (SelectionDirection) {
                SelectionDirection["None"] = "none";
                SelectionDirection["Forward"] = "forward";
                SelectionDirection["Backward"] = "backward";
            })(SelectionDirection = Model.SelectionDirection || (Model.SelectionDirection = {}));
            var InputModelBase = (function (_super) {
                __extends(InputModelBase, _super);
                function InputModelBase() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.value = "";
                    _this.autocomplete = AutocompleteOptions.On;
                    _this.isDisabled = false;
                    _this.autofocus = false;
                    _this.formActionUri = null;
                    _this.formMethod = null;
                    _this.formEncodingType = null;
                    _this.formNoValidation = null;
                    _this.formTarget = null;
                    _this.minimum = null;
                    _this.maximum = null;
                    _this.minimumLength = null;
                    _this.maximumLength = null;
                    _this.pattern = null;
                    _this.placeholder = null;
                    _this.isReadOnly = null;
                    _this.isRequired = null;
                    _this.selectionDirection = null;
                    _this.selectionStart = null;
                    _this.selectionEnd = null;
                    _this.spellCheck = null;
                    return _this;
                }
                Object.defineProperty(InputModelBase.prototype, "isInteractive", {
                    get: function () {
                        return !this.isHidden;
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                return InputModelBase;
            }(Model.EmptyContentModelBase));
            Model.InputModelBase = InputModelBase;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputCheckboxModel = (function (_super) {
                __extends(InputCheckboxModel, _super);
                function InputCheckboxModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.isChecked = false;
                    return _this;
                }
                Object.defineProperty(InputCheckboxModel.prototype, "value", {
                    get: function () {
                        return this.isChecked.toString();
                    },
                    set: function (value) {
                        this.isChecked = value.toLowerCase() === "true";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InputCheckboxModel.prototype, "contentType", {
                    get: function () {
                        return InputCheckboxModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputCheckboxModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.checkbox";
                return InputCheckboxModel;
            }(Model.InputModelBase));
            Model.InputCheckboxModel = InputCheckboxModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputRadioModel = (function (_super) {
                __extends(InputRadioModel, _super);
                function InputRadioModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.isChecked = false;
                    return _this;
                }
                Object.defineProperty(InputRadioModel.prototype, "value", {
                    get: function () {
                        return this.isChecked.toString();
                    },
                    set: function (value) {
                        this.isChecked = value.toLowerCase() === "true";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InputRadioModel.prototype, "contentType", {
                    get: function () {
                        return InputRadioModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputRadioModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.radio";
                return InputRadioModel;
            }(Model.InputModelBase));
            Model.InputRadioModel = InputRadioModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputButtonModel = (function (_super) {
                __extends(InputButtonModel, _super);
                function InputButtonModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(InputButtonModel.prototype, "contentType", {
                    get: function () {
                        return InputButtonModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputButtonModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.button";
                return InputButtonModel;
            }(Model.InputModelBase));
            Model.InputButtonModel = InputButtonModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var CanvasModel = (function (_super) {
                __extends(CanvasModel, _super);
                function CanvasModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.height = 150;
                    _this.width = 300;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(CanvasModel.prototype, "contentType", {
                    get: function () {
                        return CanvasModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                CanvasModel.prototype.canAccept = function (index, child) {
                    if (child.anyInTree(function (c) {
                        return c.isInteractive && c.contentType !== Model.AnchorModel.ContentType && c.contentType !== Model.ButtonModel.ContentType &&
                            c.contentType !== Model.InputCheckboxModel.ContentType && c.contentType !== Model.InputRadioModel.ContentType && c.contentType !== Model.InputButtonModel.ContentType;
                    })) {
                        return false;
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                CanvasModel.ContentType = Model.CommonModelTypes.EmbeddedContent + ".canvas";
                return CanvasModel;
            }(Model.ChildContentModelBase));
            Model.CanvasModel = CanvasModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var CanvasAdapter = (function (_super) {
                __extends(CanvasAdapter, _super);
                function CanvasAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "canvas adapter";
                    _this.modelContentType = Editor.Model.CanvasModel.ContentType;
                    _this.viewTagName = "CANVAS";
                    return _this;
                }
                CanvasAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.CanvasModel();
                };
                CanvasAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.height = model.height;
                    view.width = model.width;
                };
                CanvasAdapter.prototype.parseCustomAttributes = function (model, view) {
                    model.height = view.height;
                    model.width = view.width;
                };
                return CanvasAdapter;
            }(View.ViewAdapterBase));
            View.CanvasAdapter = CanvasAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var ImageModel = (function (_super) {
                __extends(ImageModel, _super);
                function ImageModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.alternateText = "";
                    _this.sizes = [];
                    _this.source = "";
                    _this.sourceSet = [];
                    return _this;
                }
                Object.defineProperty(ImageModel.prototype, "isMap", {
                    get: function () {
                        return this._isMap;
                    },
                    set: function (value) {
                        if (value && this.anyParent(function (c) { return c.contentType === Model.AnchorModel.ContentType; })) {
                            this._isMap = true;
                        }
                        this._isMap = false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ImageModel.prototype, "useMap", {
                    get: function () {
                        return this._useMap;
                    },
                    set: function (value) {
                        if (value && !this.anyParent(function (c) { return c.contentType === Model.AnchorModel.ContentType; })) {
                            this._isMap = true;
                        }
                        this._isMap = false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ImageModel.prototype, "contentType", {
                    get: function () {
                        return ImageModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                ImageModel.ContentType = Model.CommonModelTypes.EmbeddedContent + ".image";
                return ImageModel;
            }(Model.EmptyContentModelBase));
            Model.ImageModel = ImageModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var ImageAdapter = (function (_super) {
                __extends(ImageAdapter, _super);
                function ImageAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "image adapter";
                    _this.modelContentType = Editor.Model.ImageModel.ContentType;
                    _this.viewTagName = "IMAGE";
                    return _this;
                }
                ImageAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.ImageModel();
                };
                ImageAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.src = model.source;
                    view.alt = model.alternateText;
                    if (model.sizes.length === 0) {
                        view.removeAttribute("sizes");
                    }
                    else {
                        view.sizes = model.sizes.join(",");
                    }
                    if (model.sourceSet.length === 0) {
                        view.removeAttribute("srcset");
                    }
                    else {
                        view.srcset = model.sourceSet.join(",");
                    }
                };
                ImageAdapter.prototype.parseCustomAttributes = function (model, view) {
                    model.alternateText = view.alt;
                    model.source = view.src;
                    if (view.sizes) {
                        (_a = model.sizes).push.apply(_a, view.sizes.split(","));
                    }
                    if (view.srcset) {
                        (_b = model.sizes).push.apply(_b, view.srcset.split(","));
                    }
                    var _a, _b;
                };
                return ImageAdapter;
            }(View.ViewAdapterBase));
            View.ImageAdapter = ImageAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InlineFrameModel = (function (_super) {
                __extends(InlineFrameModel, _super);
                function InlineFrameModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.allowFullscreen = false;
                    _this.allowPaymentRequest = false;
                    _this.height = null;
                    _this.width = null;
                    _this.name = "";
                    _this.source = "";
                    _this.sourceDocument = null;
                    _this.isInteractive = true;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(InlineFrameModel.prototype, "contentType", {
                    get: function () {
                        return InlineFrameModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InlineFrameModel.ContentType = Model.CommonModelTypes.EmbeddedContent + ".inlineframe";
                return InlineFrameModel;
            }(Model.ChildContentModelBase));
            Model.InlineFrameModel = InlineFrameModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InlineFrameAdapter = (function (_super) {
                __extends(InlineFrameAdapter, _super);
                function InlineFrameAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "inline frame adapter";
                    _this.modelContentType = Editor.Model.InlineFrameModel.ContentType;
                    _this.viewTagName = "IFRAME";
                    return _this;
                }
                InlineFrameAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InlineFrameModel();
                };
                InlineFrameAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.allowFullscreen = model.allowFullscreen;
                    view.allowPaymentRequest = model.allowPaymentRequest;
                    if (model.height !== null) {
                        view.height = model.height + "px";
                    }
                    else {
                        view.removeAttribute("height");
                    }
                    if (model.width !== null) {
                        view.width = model.width + "px";
                    }
                    else {
                        view.removeAttribute("width");
                    }
                    view.name = model.name;
                    view.src = model.source;
                    if (model.sourceDocument !== null) {
                        view.srcdoc = model.sourceDocument;
                    }
                    else {
                        view.removeAttribute("srcdoc");
                    }
                };
                InlineFrameAdapter.prototype.parseCustomAttributes = function (model, view) {
                    model.allowFullscreen = view.allowFullscreen;
                    model.allowPaymentRequest = view.allowPaymentRequest;
                    if (view.hasAttribute("height")) {
                        model.height = parseFloat(view.height.substr(0, view.height.length - 2));
                    }
                    if (view.hasAttribute("width")) {
                        model.width = parseFloat(view.width.substr(0, view.width.length - 2));
                    }
                    model.name = view.name;
                    model.source = view.src;
                    if (view.hasAttribute("srcdoc")) {
                        model.sourceDocument = view.srcdoc;
                    }
                };
                return InlineFrameAdapter;
            }(View.ViewAdapterBase));
            View.InlineFrameAdapter = InlineFrameAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var VideoAdapter = (function (_super) {
                __extends(VideoAdapter, _super);
                function VideoAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "video adapter";
                    _this.modelContentType = Editor.Model.VideoModel.ContentType;
                    _this.viewTagName = "VIDEO";
                    return _this;
                }
                VideoAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.VideoModel();
                };
                VideoAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.autoplay = model.autoplay;
                    view.controls = model.showControls;
                    view.loop = model.loop;
                    view.muted = model.isMuted;
                    view.src = model.source;
                    view.poster = model.poster;
                    if (model.width !== null) {
                        view.width = model.width;
                    }
                    if (model.height !== null) {
                        view.height = model.height;
                    }
                };
                VideoAdapter.prototype.parseCustomAttributes = function (model, view) {
                    model.autoplay = view.autoplay;
                    model.showControls = view.controls;
                    model.loop = view.loop;
                    model.isMuted = view.muted;
                    model.source = view.src;
                    model.poster = view.poster;
                    if (view.hasAttribute("height")) {
                        model.height = view.height;
                    }
                    if (view.hasAttribute("width")) {
                        model.width = view.width;
                    }
                };
                return VideoAdapter;
            }(View.ViewAdapterBase));
            View.VideoAdapter = VideoAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var FooterModel = (function (_super) {
                __extends(FooterModel, _super);
                function FooterModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(FooterModel.prototype, "contentType", {
                    get: function () {
                        return FooterModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                FooterModel.prototype.canAccept = function (index, child) {
                    if (child.anyInTree(function (c) { return c.contentType === FooterModel.ContentType || c.contentType === FooterModel.ContentType; })) {
                        return false;
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                FooterModel.ContentType = Model.CommonModelTypes.FlowContent + ".footer";
                return FooterModel;
            }(Model.ChildContentModelBase));
            Model.FooterModel = FooterModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var HeaderModel = (function (_super) {
                __extends(HeaderModel, _super);
                function HeaderModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(HeaderModel.prototype, "contentType", {
                    get: function () {
                        return HeaderModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                HeaderModel.prototype.canAccept = function (index, child) {
                    if (child.anyInTree(function (c) { return c.contentType === HeaderModel.ContentType || c.contentType === Model.FooterModel.ContentType; })) {
                        return false;
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                HeaderModel.ContentType = Model.CommonModelTypes.FlowContent + ".header";
                return HeaderModel;
            }(Model.ChildContentModelBase));
            Model.HeaderModel = HeaderModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var AsideModel = (function (_super) {
                __extends(AsideModel, _super);
                function AsideModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(AsideModel.prototype, "contentType", {
                    get: function () {
                        return AsideModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                AsideModel.ContentType = Model.CommonModelTypes.SectioningContent + ".aside";
                return AsideModel;
            }(Model.ChildContentModelBase));
            Model.AsideModel = AsideModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var ArticleModel = (function (_super) {
                __extends(ArticleModel, _super);
                function ArticleModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(ArticleModel.prototype, "contentType", {
                    get: function () {
                        return ArticleModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                ArticleModel.ContentType = Model.CommonModelTypes.SectioningContent + ".article";
                return ArticleModel;
            }(Model.ChildContentModelBase));
            Model.ArticleModel = ArticleModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var AddressModel = (function (_super) {
                __extends(AddressModel, _super);
                function AddressModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(AddressModel.prototype, "contentType", {
                    get: function () {
                        return AddressModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                AddressModel.prototype.canAccept = function (index, child) {
                    if (child.anyInTree(function (c) {
                        return c.contentType === AddressModel.ContentType ||
                            c.contentType === Model.HeaderModel.ContentType ||
                            c.contentType === Model.AsideModel.ContentType ||
                            c.contentType === Model.FooterModel.ContentType ||
                            c.contentType === Model.ArticleModel.ContentType ||
                            c.contentType.lastIndexOf(Model.CommonModelTypes.HeadingContent, 0) === 0 ||
                            c.contentType.lastIndexOf(Model.CommonModelTypes.SectioningContent, 0) === 0;
                    })) {
                        return false;
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                AddressModel.ContentType = Model.CommonModelTypes.FlowContent + ".address";
                return AddressModel;
            }(Model.ChildContentModelBase));
            Model.AddressModel = AddressModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var AddressAdapter = (function (_super) {
                __extends(AddressAdapter, _super);
                function AddressAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "address adapter";
                    _this.modelContentType = Editor.Model.AddressModel.ContentType;
                    _this.viewTagName = "ADDRESS";
                    return _this;
                }
                AddressAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.AddressModel();
                };
                return AddressAdapter;
            }(View.ViewAdapterBase));
            View.AddressAdapter = AddressAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var BlockQuoteModel = (function (_super) {
                __extends(BlockQuoteModel, _super);
                function BlockQuoteModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.cite = "";
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(BlockQuoteModel.prototype, "contentType", {
                    get: function () {
                        return BlockQuoteModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                BlockQuoteModel.ContentType = Model.CommonModelTypes.FlowContent + ".blockquote";
                return BlockQuoteModel;
            }(Model.ChildContentModelBase));
            Model.BlockQuoteModel = BlockQuoteModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var BlockQuoteAdapter = (function (_super) {
                __extends(BlockQuoteAdapter, _super);
                function BlockQuoteAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "block quote adapter";
                    _this.modelContentType = Editor.Model.BlockQuoteModel.ContentType;
                    _this.viewTagName = "BLOCKQUOTE";
                    return _this;
                }
                BlockQuoteAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.BlockQuoteModel();
                };
                BlockQuoteAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.cite = model.cite;
                };
                BlockQuoteAdapter.prototype.parseCustomAttributes = function (model, view) {
                    model.cite = view.cite;
                };
                return BlockQuoteAdapter;
            }(View.ViewAdapterBase));
            View.BlockQuoteAdapter = BlockQuoteAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var DescriptionListDefinitionModel = (function (_super) {
                __extends(DescriptionListDefinitionModel, _super);
                function DescriptionListDefinitionModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(DescriptionListDefinitionModel.prototype, "contentType", {
                    get: function () {
                        return DescriptionListDefinitionModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                DescriptionListDefinitionModel.ContentType = Model.CommonModelTypes.UnclassifiedContent + ".descriptionlistdefinition";
                return DescriptionListDefinitionModel;
            }(Model.ChildContentModelBase));
            Model.DescriptionListDefinitionModel = DescriptionListDefinitionModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var DescriptionListTermModel = (function (_super) {
                __extends(DescriptionListTermModel, _super);
                function DescriptionListTermModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(DescriptionListTermModel.prototype, "contentType", {
                    get: function () {
                        return DescriptionListTermModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                DescriptionListTermModel.prototype.canAccept = function (index, child) {
                    if (child.anyInTree(function (c) {
                        return c.contentType.lastIndexOf(Model.CommonModelTypes.HeadingContent, 0) === 0 ||
                            c.contentType.lastIndexOf(Model.CommonModelTypes.SectioningContent, 0) === 0 ||
                            c.contentType === Model.HeaderModel.ContentType ||
                            c.contentType === Model.FooterModel.ContentType;
                    })) {
                        return false;
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                DescriptionListTermModel.ContentType = Model.CommonModelTypes.UnclassifiedContent + ".descriptionlistterm";
                return DescriptionListTermModel;
            }(Model.ChildContentModelBase));
            Model.DescriptionListTermModel = DescriptionListTermModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var DescriptionListModel = (function (_super) {
                __extends(DescriptionListModel, _super);
                function DescriptionListModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.DescriptionListDefinitionModel.ContentType, Model.DescriptionListTermModel.ContentType, Model.TextModel.ContentType];
                    return _this;
                }
                Object.defineProperty(DescriptionListModel.prototype, "contentType", {
                    get: function () {
                        return DescriptionListModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                DescriptionListModel.ContentType = Model.CommonModelTypes.FlowContent + ".descriptionlist";
                return DescriptionListModel;
            }(Model.ChildContentModelBase));
            Model.DescriptionListModel = DescriptionListModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var DescriptionListAdapter = (function (_super) {
                __extends(DescriptionListAdapter, _super);
                function DescriptionListAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "description list adapter";
                    _this.modelContentType = Editor.Model.DescriptionListModel.ContentType;
                    _this.viewTagName = "DL";
                    return _this;
                }
                DescriptionListAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.DescriptionListModel();
                };
                return DescriptionListAdapter;
            }(View.ViewAdapterBase));
            View.DescriptionListAdapter = DescriptionListAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var DetailsModel = (function (_super) {
                __extends(DetailsModel, _super);
                function DetailsModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.isOpen = false;
                    _this.isInteractive = true;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent, Model.CommonModelTypes.HeadingContent];
                    return _this;
                }
                Object.defineProperty(DetailsModel.prototype, "contentType", {
                    get: function () {
                        return DetailsModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                DetailsModel.prototype.canAccept = function (index, child) {
                    if (child.contentType.lastIndexOf(Model.CommonModelTypes.HeadingContent, 0) === 0) {
                        if (this.children.length !== 0) {
                            return false;
                        }
                    }
                    if (this.children.length === 1 && this.children[0].contentType.lastIndexOf(Model.CommonModelTypes.HeadingContent) === 0) {
                        return false;
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                DetailsModel.ContentType = Model.CommonModelTypes.FlowContent + ".details";
                return DetailsModel;
            }(Model.ChildContentModelBase));
            Model.DetailsModel = DetailsModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var DetailsAdapter = (function (_super) {
                __extends(DetailsAdapter, _super);
                function DetailsAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "details adapter";
                    _this.modelContentType = Editor.Model.DetailsModel.ContentType;
                    _this.viewTagName = "DETAILS";
                    return _this;
                }
                DetailsAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.DetailsModel();
                };
                DetailsAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.open = model.isOpen;
                };
                DetailsAdapter.prototype.parseCustomAttributes = function (model, view) {
                    model.isOpen = view.open;
                };
                return DetailsAdapter;
            }(View.ViewAdapterBase));
            View.DetailsAdapter = DetailsAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var DivisionModel = (function (_super) {
                __extends(DivisionModel, _super);
                function DivisionModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(DivisionModel.prototype, "contentType", {
                    get: function () {
                        return DivisionModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                DivisionModel.ContentType = Model.CommonModelTypes.FlowContent + ".division";
                return DivisionModel;
            }(Model.ChildContentModelBase));
            Model.DivisionModel = DivisionModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var DivisionAdapter = (function (_super) {
                __extends(DivisionAdapter, _super);
                function DivisionAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "division adapter";
                    _this.modelContentType = Editor.Model.DivisionModel.ContentType;
                    _this.viewTagName = "DIV";
                    return _this;
                }
                DivisionAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.DivisionModel();
                };
                return DivisionAdapter;
            }(View.ViewAdapterBase));
            View.DivisionAdapter = DivisionAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var LegendModel = (function (_super) {
                __extends(LegendModel, _super);
                function LegendModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(LegendModel.prototype, "contentType", {
                    get: function () {
                        return LegendModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                LegendModel.ContentType = Model.CommonModelTypes.UnclassifiedContent + ".legend";
                return LegendModel;
            }(Model.ChildContentModelBase));
            Model.LegendModel = LegendModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var FieldSetModel = (function (_super) {
                __extends(FieldSetModel, _super);
                function FieldSetModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.isDisabled = null;
                    _this.name = null;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent, Model.LegendModel.ContentType];
                    return _this;
                }
                Object.defineProperty(FieldSetModel.prototype, "contentType", {
                    get: function () {
                        return FieldSetModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                FieldSetModel.prototype.canAccept = function (index, child) {
                    if (child.contentType === Model.LegendModel.ContentType) {
                        if (this.children.length === 0) {
                            return true;
                        }
                        if (index > 0) {
                            return false;
                        }
                        if (this.children.length > 0 && this.children[0].contentType === Model.LegendModel.ContentType) {
                            return false;
                        }
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                FieldSetModel.ContentType = Model.CommonModelTypes.FlowContent + ".fieldset";
                return FieldSetModel;
            }(Model.ChildContentModelBase));
            Model.FieldSetModel = FieldSetModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var FieldSetAdapter = (function (_super) {
                __extends(FieldSetAdapter, _super);
                function FieldSetAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "field set adapter";
                    _this.modelContentType = Editor.Model.FieldSetModel.ContentType;
                    _this.viewTagName = "FIELDSET";
                    return _this;
                }
                FieldSetAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.FieldSetModel();
                };
                FieldSetAdapter.prototype.applyCustomAttributes = function (model, view) {
                    if (model.name === null) {
                        view.removeAttribute("name");
                    }
                    else {
                        view.name = model.name;
                    }
                    if (model.isDisabled === null) {
                        view.removeAttribute("disabled");
                    }
                    else {
                        view.disabled = model.isDisabled;
                    }
                };
                FieldSetAdapter.prototype.parseCustomAttributes = function (model, view) {
                    if (view.hasAttribute("name")) {
                        model.name = view.name;
                    }
                    if (view.hasAttribute("disabled")) {
                        model.isDisabled = view.disabled;
                    }
                };
                return FieldSetAdapter;
            }(View.ViewAdapterBase));
            View.FieldSetAdapter = FieldSetAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var FigureCaptionModel = (function (_super) {
                __extends(FigureCaptionModel, _super);
                function FigureCaptionModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(FigureCaptionModel.prototype, "contentType", {
                    get: function () {
                        return FigureCaptionModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                FigureCaptionModel.prototype.canBeAccepted = function (index, parent) {
                    return parent.contentType === Model.FigureModel.ContentType;
                };
                FigureCaptionModel.ContentType = Model.CommonModelTypes.UnclassifiedContent + ".figurecaption";
                return FigureCaptionModel;
            }(Model.ChildContentModelBase));
            Model.FigureCaptionModel = FigureCaptionModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var FigureModel = (function (_super) {
                __extends(FigureModel, _super);
                function FigureModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent, Model.FigureCaptionModel.ContentType];
                    return _this;
                }
                Object.defineProperty(FigureModel.prototype, "contentType", {
                    get: function () {
                        return FigureModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                FigureModel.prototype.canAccept = function (index, child) {
                    if (child.contentType === Model.FigureCaptionModel.ContentType) {
                        if (this.children.length === 0) {
                            return true;
                        }
                        if (index > 0 || index < this.children.length) {
                            return false;
                        }
                        if (this.children.length > 0 && this.children[0].contentType === Model.FigureCaptionModel.ContentType || this.children[this.children.length - 1].contentType === Model.FigureCaptionModel.ContentType) {
                            return false;
                        }
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                FigureModel.ContentType = Model.CommonModelTypes.FlowContent + ".figure";
                return FigureModel;
            }(Model.ChildContentModelBase));
            Model.FigureModel = FigureModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var FigureAdapter = (function (_super) {
                __extends(FigureAdapter, _super);
                function FigureAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "figure adapter";
                    _this.modelContentType = Editor.Model.FigureModel.ContentType;
                    _this.viewTagName = "FIGURE";
                    return _this;
                }
                FigureAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.FigureModel();
                };
                return FigureAdapter;
            }(View.ViewAdapterBase));
            View.FigureAdapter = FigureAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var FooterAdapter = (function (_super) {
                __extends(FooterAdapter, _super);
                function FooterAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "footer adapter";
                    _this.modelContentType = Editor.Model.FooterModel.ContentType;
                    _this.viewTagName = "FOOTER";
                    return _this;
                }
                FooterAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.FooterModel();
                };
                return FooterAdapter;
            }(View.ViewAdapterBase));
            View.FooterAdapter = FooterAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var FormAdapter = (function (_super) {
                __extends(FormAdapter, _super);
                function FormAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "form adapter";
                    _this.modelContentType = Editor.Model.FormModel.ContentType;
                    _this.viewTagName = "FORM";
                    return _this;
                }
                FormAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.FormModel();
                };
                FormAdapter.prototype.applyCustomAttributes = function (model, view) {
                    if (model.acceptCharset.length > 0) {
                        view.acceptCharset = model.acceptCharset.join(" ");
                    }
                    else {
                        view.removeAttribute("acceptcharset");
                    }
                    view.action = model.actionUri;
                    view.autocomplete = model.autocomplete;
                    view.enctype = model.encodingType;
                    view.method = model.method;
                    view.noValidate = model.noValidation;
                    view.target = model.target;
                };
                FormAdapter.prototype.parseCustomAttributes = function (model, view) {
                    if (view.hasAttribute("acceptcharset")) {
                        (_a = model.acceptCharset).push.apply(_a, view.acceptCharset.split(" "));
                    }
                    model.actionUri = view.action;
                    model.autocomplete = view.autocomplete;
                    model.encodingType = view.enctype;
                    model.method = view.method;
                    model.noValidation = view.noValidate;
                    model.target = view.target;
                    var _a;
                };
                return FormAdapter;
            }(View.ViewAdapterBase));
            View.FormAdapter = FormAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var HeaderAdapter = (function (_super) {
                __extends(HeaderAdapter, _super);
                function HeaderAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "header adapter";
                    _this.modelContentType = Editor.Model.HeaderModel.ContentType;
                    _this.viewTagName = "HEADER";
                    return _this;
                }
                HeaderAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.HeaderModel();
                };
                return HeaderAdapter;
            }(View.ViewAdapterBase));
            View.HeaderAdapter = HeaderAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var MainModel = (function (_super) {
                __extends(MainModel, _super);
                function MainModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(MainModel.prototype, "contentType", {
                    get: function () {
                        return MainModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                MainModel.ContentType = Model.CommonModelTypes.FlowContent + ".main";
                return MainModel;
            }(Model.ChildContentModelBase));
            Model.MainModel = MainModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var MainAdapter = (function (_super) {
                __extends(MainAdapter, _super);
                function MainAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "main adapter";
                    _this.modelContentType = Editor.Model.MainModel.ContentType;
                    _this.viewTagName = "MAIN";
                    return _this;
                }
                MainAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.MainModel();
                };
                return MainAdapter;
            }(View.ViewAdapterBase));
            View.MainAdapter = MainAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var ListItemModel = (function (_super) {
                __extends(ListItemModel, _super);
                function ListItemModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.value = null;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(ListItemModel.prototype, "contentType", {
                    get: function () {
                        return ListItemModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                ListItemModel.ContentType = Model.CommonModelTypes.UnclassifiedContent + ".listitem";
                return ListItemModel;
            }(Model.ChildContentModelBase));
            Model.ListItemModel = ListItemModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var NumberingType;
            (function (NumberingType) {
                NumberingType["Numbers"] = "1";
                NumberingType["LowerCaseLetters"] = "a";
                NumberingType["UpperCaseLetters"] = "A";
                NumberingType["LowerCaseRomanNumerals"] = "i";
                NumberingType["UpperCaseRomanNumerals"] = "I";
            })(NumberingType = Model.NumberingType || (Model.NumberingType = {}));
            var OrderedListModel = (function (_super) {
                __extends(OrderedListModel, _super);
                function OrderedListModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.start = null;
                    _this.type = null;
                    _this.acceptsTypes = [Model.ListItemModel.ContentType, Model.TextModel.ContentType];
                    return _this;
                }
                Object.defineProperty(OrderedListModel.prototype, "contentType", {
                    get: function () {
                        return OrderedListModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                OrderedListModel.ContentType = Model.CommonModelTypes.FlowContent + ".orderedlist";
                return OrderedListModel;
            }(Model.ChildContentModelBase));
            Model.OrderedListModel = OrderedListModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var OrderedListAdapter = (function (_super) {
                __extends(OrderedListAdapter, _super);
                function OrderedListAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "ordered list adapter";
                    _this.modelContentType = Editor.Model.OrderedListModel.ContentType;
                    _this.viewTagName = "OL";
                    return _this;
                }
                OrderedListAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.OrderedListModel();
                };
                OrderedListAdapter.prototype.applyCustomAttributes = function (model, view) {
                    if (model.start === null) {
                        view.removeAttribute("start");
                    }
                    else {
                        view.start = model.start;
                    }
                    if (model.type === null) {
                        view.removeAttribute("type");
                    }
                    else {
                        view.type = model.type;
                    }
                };
                OrderedListAdapter.prototype.parseCustomAttributes = function (model, view) {
                    if (view.hasAttribute("start")) {
                        model.start = view.start;
                    }
                    if (view.hasAttribute("type")) {
                        model.type = view.type;
                    }
                };
                return OrderedListAdapter;
            }(View.ViewAdapterBase));
            View.OrderedListAdapter = OrderedListAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var ParagraphModel = (function (_super) {
                __extends(ParagraphModel, _super);
                function ParagraphModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(ParagraphModel.prototype, "contentType", {
                    get: function () {
                        return ParagraphModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                ParagraphModel.ContentType = Model.CommonModelTypes.FlowContent + ".paragraph";
                return ParagraphModel;
            }(Model.ChildContentModelBase));
            Model.ParagraphModel = ParagraphModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var ParagraphAdapter = (function (_super) {
                __extends(ParagraphAdapter, _super);
                function ParagraphAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "paragraph adapter";
                    _this.modelContentType = Editor.Model.ParagraphModel.ContentType;
                    _this.viewTagName = "P";
                    return _this;
                }
                ParagraphAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.ParagraphModel();
                };
                return ParagraphAdapter;
            }(View.ViewAdapterBase));
            View.ParagraphAdapter = ParagraphAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var PreformattedTextModel = (function (_super) {
                __extends(PreformattedTextModel, _super);
                function PreformattedTextModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(PreformattedTextModel.prototype, "contentType", {
                    get: function () {
                        return PreformattedTextModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                PreformattedTextModel.ContentType = Model.CommonModelTypes.FlowContent + ".preformattedtext";
                return PreformattedTextModel;
            }(Model.ChildContentModelBase));
            Model.PreformattedTextModel = PreformattedTextModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var PreformattedTextAdapter = (function (_super) {
                __extends(PreformattedTextAdapter, _super);
                function PreformattedTextAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "preformatted text adapter";
                    _this.modelContentType = Editor.Model.PreformattedTextModel.ContentType;
                    _this.viewTagName = "PRE";
                    return _this;
                }
                PreformattedTextAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.PreformattedTextModel();
                };
                return PreformattedTextAdapter;
            }(View.ViewAdapterBase));
            View.PreformattedTextAdapter = PreformattedTextAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var TableCaptionModel = (function (_super) {
                __extends(TableCaptionModel, _super);
                function TableCaptionModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(TableCaptionModel.prototype, "contentType", {
                    get: function () {
                        return TableCaptionModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                TableCaptionModel.ContentType = Model.CommonModelTypes.UnclassifiedContent + ".tablecaption";
                return TableCaptionModel;
            }(Model.ChildContentModelBase));
            Model.TableCaptionModel = TableCaptionModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var TableColumnModel = (function (_super) {
                __extends(TableColumnModel, _super);
                function TableColumnModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.span = null;
                    return _this;
                }
                Object.defineProperty(TableColumnModel.prototype, "contentType", {
                    get: function () {
                        return TableColumnModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                TableColumnModel.ContentType = Model.CommonModelTypes.UnclassifiedContent + ".tablecolumn";
                return TableColumnModel;
            }(Model.EmptyContentModelBase));
            Model.TableColumnModel = TableColumnModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var TableColumnGroupModel = (function (_super) {
                __extends(TableColumnGroupModel, _super);
                function TableColumnGroupModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._span = null;
                    _this.acceptsTypes = [Model.TableColumnModel.ContentType, Model.TextModel.ContentType];
                    return _this;
                }
                Object.defineProperty(TableColumnGroupModel.prototype, "span", {
                    get: function () {
                        return this._span;
                    },
                    set: function (value) {
                        if (this.childCount > 0 && value !== null) {
                            return;
                        }
                        this._span = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(TableColumnGroupModel.prototype, "contentType", {
                    get: function () {
                        return TableColumnGroupModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                TableColumnGroupModel.prototype.canAccept = function (index, child) {
                    if (this.span !== null) {
                        return false;
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                TableColumnGroupModel.ContentType = Model.CommonModelTypes.UnclassifiedContent + ".tablecolumngroup";
                return TableColumnGroupModel;
            }(Model.ChildContentModelBase));
            Model.TableColumnGroupModel = TableColumnGroupModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var TableCellModel = (function (_super) {
                __extends(TableCellModel, _super);
                function TableCellModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.columnSpan = null;
                    _this.rowSpan = null;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(TableCellModel.prototype, "contentType", {
                    get: function () {
                        return TableCellModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                TableCellModel.ContentType = Model.CommonModelTypes.UnclassifiedContent + ".tablecell";
                return TableCellModel;
            }(Model.ChildContentModelBase));
            Model.TableCellModel = TableCellModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var TableFooterModel = (function (_super) {
                __extends(TableFooterModel, _super);
                function TableFooterModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.TableRowModel.ContentType, Model.TextModel.ContentType];
                    return _this;
                }
                Object.defineProperty(TableFooterModel.prototype, "contentType", {
                    get: function () {
                        return TableFooterModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                TableFooterModel.ContentType = Model.CommonModelTypes.UnclassifiedContent + ".tablefooter";
                return TableFooterModel;
            }(Model.ChildContentModelBase));
            Model.TableFooterModel = TableFooterModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var TableHeaderCellScope;
            (function (TableHeaderCellScope) {
                TableHeaderCellScope["Row"] = "row";
                TableHeaderCellScope["Column"] = "col";
                TableHeaderCellScope["RowGroup"] = "rowgroup";
                TableHeaderCellScope["ColumnGroup"] = "colgroup";
                TableHeaderCellScope["Auto"] = "auto";
            })(TableHeaderCellScope = Model.TableHeaderCellScope || (Model.TableHeaderCellScope = {}));
            var TableHeaderCellModel = (function (_super) {
                __extends(TableHeaderCellModel, _super);
                function TableHeaderCellModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.columnSpan = null;
                    _this.rowSpan = null;
                    _this.abbreviation = null;
                    _this.scope = null;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(TableHeaderCellModel.prototype, "contentType", {
                    get: function () {
                        return Model.TableCellModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                TableHeaderCellModel.prototype.canAccept = function (index, child) {
                    if (child.anyInTree(function (c) {
                        return c.contentType.lastIndexOf(Model.CommonModelTypes.HeadingContent, 0) >= 0 ||
                            c.contentType.lastIndexOf(Model.CommonModelTypes.SectioningContent, 0) >= 0 ||
                            c.contentType === Model.TableHeaderModel.ContentType ||
                            c.contentType === Model.TableFooterModel.ContentType;
                    })) {
                        return false;
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                TableHeaderCellModel.ContentType = Model.CommonModelTypes.UnclassifiedContent + ".tableheadercell";
                return TableHeaderCellModel;
            }(Model.ChildContentModelBase));
            Model.TableHeaderCellModel = TableHeaderCellModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var TableRowModel = (function (_super) {
                __extends(TableRowModel, _super);
                function TableRowModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.TableCellModel.ContentType, Model.TableHeaderCellModel.ContentType, Model.TextModel.ContentType];
                    return _this;
                }
                Object.defineProperty(TableRowModel.prototype, "contentType", {
                    get: function () {
                        return TableRowModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                TableRowModel.ContentType = Model.CommonModelTypes.UnclassifiedContent + ".tablerow";
                return TableRowModel;
            }(Model.ChildContentModelBase));
            Model.TableRowModel = TableRowModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var TableHeaderModel = (function (_super) {
                __extends(TableHeaderModel, _super);
                function TableHeaderModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.TableRowModel.ContentType, Model.TextModel.ContentType];
                    return _this;
                }
                Object.defineProperty(TableHeaderModel.prototype, "contentType", {
                    get: function () {
                        return TableHeaderModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                TableHeaderModel.ContentType = Model.CommonModelTypes.UnclassifiedContent + ".tableheader";
                return TableHeaderModel;
            }(Model.ChildContentModelBase));
            Model.TableHeaderModel = TableHeaderModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var TableBodyModel = (function (_super) {
                __extends(TableBodyModel, _super);
                function TableBodyModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.TableRowModel.ContentType, Model.TextModel.ContentType];
                    return _this;
                }
                Object.defineProperty(TableBodyModel.prototype, "contentType", {
                    get: function () {
                        return TableBodyModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                TableBodyModel.ContentType = Model.CommonModelTypes.UnclassifiedContent + ".tablebody";
                return TableBodyModel;
            }(Model.ChildContentModelBase));
            Model.TableBodyModel = TableBodyModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var TableModel = (function (_super) {
                __extends(TableModel, _super);
                function TableModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.TableCaptionModel.ContentType, Model.TableColumnGroupModel.ContentType, Model.TableHeaderModel.ContentType, Model.TableBodyModel.ContentType, Model.TableRowModel.ContentType, Model.TableFooterModel.ContentType, Model.TextModel.ContentType];
                    return _this;
                }
                Object.defineProperty(TableModel.prototype, "contentType", {
                    get: function () {
                        return TableModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                TableModel.prototype.canAccept = function (index, child) {
                    var state = index > 0 ? this.children[index - 1].contentType : null;
                    state = this.updateAcceptanceState(state, child);
                    if (state === TableModel.ErrorState) {
                        return false;
                    }
                    if (index < this.children.length) {
                        state = this.updateAcceptanceState(state, this.children[index]);
                        if (state === TableModel.ErrorState) {
                            return false;
                        }
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                TableModel.prototype.updateAcceptanceState = function (state, child) {
                    switch (state) {
                        case null:
                            if (child.contentType === Model.TableFooterModel.ContentType) {
                                return TableModel.ErrorState;
                            }
                            else {
                                return child.contentType;
                            }
                        case Model.TableCaptionModel.ContentType:
                            if (child.contentType === Model.TableFooterModel.ContentType || child.contentType === Model.TableCaptionModel.ContentType) {
                                return TableModel.ErrorState;
                            }
                            else {
                                return child.contentType;
                            }
                        case Model.TableColumnGroupModel.ContentType:
                            if (child.contentType === Model.TableFooterModel.ContentType || child.contentType === Model.TableCaptionModel.ContentType) {
                                return TableModel.ErrorState;
                            }
                            else {
                                return child.contentType;
                            }
                        case Model.TableHeaderModel.ContentType:
                            if (child.contentType === Model.TableHeaderModel.ContentType || child.contentType === Model.TableFooterModel.ContentType || child.contentType === Model.TableCaptionModel.ContentType) {
                                return TableModel.ErrorState;
                            }
                            else {
                                return child.contentType;
                            }
                        case Model.TableBodyModel.ContentType:
                            if (child.contentType !== Model.TableBodyModel.ContentType && child.contentType !== Model.TableFooterModel.ContentType) {
                                return TableModel.ErrorState;
                            }
                            else {
                                return child.contentType;
                            }
                        case Model.TableRowModel.ContentType:
                            if (child.contentType !== Model.TableRowModel.ContentType && child.contentType !== Model.TableFooterModel.ContentType) {
                                return TableModel.ErrorState;
                            }
                            else {
                                return child.contentType;
                            }
                        case Model.TableFooterModel.ContentType:
                            return TableModel.ErrorState;
                    }
                    throw new Error("Unknown state: " + state);
                };
                TableModel.ErrorState = "Error";
                TableModel.ContentType = Model.CommonModelTypes.FlowContent + ".table";
                return TableModel;
            }(Model.ChildContentModelBase));
            Model.TableModel = TableModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var TableAdapter = (function (_super) {
                __extends(TableAdapter, _super);
                function TableAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "table adapter";
                    _this.modelContentType = Editor.Model.TableModel.ContentType;
                    _this.viewTagName = "TABLE";
                    return _this;
                }
                TableAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.TableModel();
                };
                return TableAdapter;
            }(View.ViewAdapterBase));
            View.TableAdapter = TableAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var UnorderedListModel = (function (_super) {
                __extends(UnorderedListModel, _super);
                function UnorderedListModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.ListItemModel.ContentType, Model.TextModel.ContentType];
                    return _this;
                }
                Object.defineProperty(UnorderedListModel.prototype, "contentType", {
                    get: function () {
                        return UnorderedListModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                UnorderedListModel.ContentType = Model.CommonModelTypes.FlowContent + ".unorderedlist";
                return UnorderedListModel;
            }(Model.ChildContentModelBase));
            Model.UnorderedListModel = UnorderedListModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var UnorderedListAdapter = (function (_super) {
                __extends(UnorderedListAdapter, _super);
                function UnorderedListAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "unordered list adapter";
                    _this.modelContentType = Editor.Model.UnorderedListModel.ContentType;
                    _this.viewTagName = "UL";
                    return _this;
                }
                UnorderedListAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.UnorderedListModel();
                };
                return UnorderedListAdapter;
            }(View.ViewAdapterBase));
            View.UnorderedListAdapter = UnorderedListAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var HeadingLevel1Model = (function (_super) {
                __extends(HeadingLevel1Model, _super);
                function HeadingLevel1Model() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(HeadingLevel1Model.prototype, "contentType", {
                    get: function () {
                        return HeadingLevel1Model.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                HeadingLevel1Model.ContentType = Model.CommonModelTypes.SectioningContent + ".headinglevel1";
                return HeadingLevel1Model;
            }(Model.ChildContentModelBase));
            Model.HeadingLevel1Model = HeadingLevel1Model;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var HeadingLevel1Adapter = (function (_super) {
                __extends(HeadingLevel1Adapter, _super);
                function HeadingLevel1Adapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "heading level 1 adapter";
                    _this.modelContentType = Editor.Model.HeadingLevel1Model.ContentType;
                    _this.viewTagName = "H1";
                    return _this;
                }
                HeadingLevel1Adapter.prototype.createModelInstance = function () {
                    return new Editor.Model.HeadingLevel1Model();
                };
                return HeadingLevel1Adapter;
            }(View.ViewAdapterBase));
            View.HeadingLevel1Adapter = HeadingLevel1Adapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var HeadingLevel2Model = (function (_super) {
                __extends(HeadingLevel2Model, _super);
                function HeadingLevel2Model() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(HeadingLevel2Model.prototype, "contentType", {
                    get: function () {
                        return HeadingLevel2Model.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                HeadingLevel2Model.ContentType = Model.CommonModelTypes.SectioningContent + ".headinglevel2";
                return HeadingLevel2Model;
            }(Model.ChildContentModelBase));
            Model.HeadingLevel2Model = HeadingLevel2Model;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var HeadingLevel2Adapter = (function (_super) {
                __extends(HeadingLevel2Adapter, _super);
                function HeadingLevel2Adapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "heading level 2 adapter";
                    _this.modelContentType = Editor.Model.HeadingLevel2Model.ContentType;
                    _this.viewTagName = "H2";
                    return _this;
                }
                HeadingLevel2Adapter.prototype.createModelInstance = function () {
                    return new Editor.Model.HeadingLevel2Model();
                };
                return HeadingLevel2Adapter;
            }(View.ViewAdapterBase));
            View.HeadingLevel2Adapter = HeadingLevel2Adapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var HeadingLevel3Model = (function (_super) {
                __extends(HeadingLevel3Model, _super);
                function HeadingLevel3Model() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(HeadingLevel3Model.prototype, "contentType", {
                    get: function () {
                        return HeadingLevel3Model.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                HeadingLevel3Model.ContentType = Model.CommonModelTypes.SectioningContent + ".headinglevel3";
                return HeadingLevel3Model;
            }(Model.ChildContentModelBase));
            Model.HeadingLevel3Model = HeadingLevel3Model;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var HeadingLevel3Adapter = (function (_super) {
                __extends(HeadingLevel3Adapter, _super);
                function HeadingLevel3Adapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "heading level 3 adapter";
                    _this.modelContentType = Editor.Model.HeadingLevel3Model.ContentType;
                    _this.viewTagName = "H3";
                    return _this;
                }
                HeadingLevel3Adapter.prototype.createModelInstance = function () {
                    return new Editor.Model.HeadingLevel3Model();
                };
                return HeadingLevel3Adapter;
            }(View.ViewAdapterBase));
            View.HeadingLevel3Adapter = HeadingLevel3Adapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var HeadingLevel4Model = (function (_super) {
                __extends(HeadingLevel4Model, _super);
                function HeadingLevel4Model() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(HeadingLevel4Model.prototype, "contentType", {
                    get: function () {
                        return HeadingLevel4Model.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                HeadingLevel4Model.ContentType = Model.CommonModelTypes.SectioningContent + ".headinglevel4";
                return HeadingLevel4Model;
            }(Model.ChildContentModelBase));
            Model.HeadingLevel4Model = HeadingLevel4Model;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var HeadingLevel4Adapter = (function (_super) {
                __extends(HeadingLevel4Adapter, _super);
                function HeadingLevel4Adapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "heading level 4 adapter";
                    _this.modelContentType = Editor.Model.HeadingLevel4Model.ContentType;
                    _this.viewTagName = "H4";
                    return _this;
                }
                HeadingLevel4Adapter.prototype.createModelInstance = function () {
                    return new Editor.Model.HeadingLevel4Model();
                };
                return HeadingLevel4Adapter;
            }(View.ViewAdapterBase));
            View.HeadingLevel4Adapter = HeadingLevel4Adapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var HeadingLevel5Model = (function (_super) {
                __extends(HeadingLevel5Model, _super);
                function HeadingLevel5Model() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(HeadingLevel5Model.prototype, "contentType", {
                    get: function () {
                        return HeadingLevel5Model.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                HeadingLevel5Model.ContentType = Model.CommonModelTypes.SectioningContent + ".headinglevel5";
                return HeadingLevel5Model;
            }(Model.ChildContentModelBase));
            Model.HeadingLevel5Model = HeadingLevel5Model;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var HeadingLevel5Adapter = (function (_super) {
                __extends(HeadingLevel5Adapter, _super);
                function HeadingLevel5Adapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "heading level 5 adapter";
                    _this.modelContentType = Editor.Model.HeadingLevel5Model.ContentType;
                    _this.viewTagName = "H5";
                    return _this;
                }
                HeadingLevel5Adapter.prototype.createModelInstance = function () {
                    return new Editor.Model.HeadingLevel5Model();
                };
                return HeadingLevel5Adapter;
            }(View.ViewAdapterBase));
            View.HeadingLevel5Adapter = HeadingLevel5Adapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var HeadingLevel6Model = (function (_super) {
                __extends(HeadingLevel6Model, _super);
                function HeadingLevel6Model() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(HeadingLevel6Model.prototype, "contentType", {
                    get: function () {
                        return HeadingLevel6Model.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                HeadingLevel6Model.ContentType = Model.CommonModelTypes.SectioningContent + ".headinglevel6";
                return HeadingLevel6Model;
            }(Model.ChildContentModelBase));
            Model.HeadingLevel6Model = HeadingLevel6Model;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var HeadingLevel6Adapter = (function (_super) {
                __extends(HeadingLevel6Adapter, _super);
                function HeadingLevel6Adapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "heading level 6 adapter";
                    _this.modelContentType = Editor.Model.HeadingLevel6Model.ContentType;
                    _this.viewTagName = "H6";
                    return _this;
                }
                HeadingLevel6Adapter.prototype.createModelInstance = function () {
                    return new Editor.Model.HeadingLevel6Model();
                };
                return HeadingLevel6Adapter;
            }(View.ViewAdapterBase));
            View.HeadingLevel6Adapter = HeadingLevel6Adapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var AbbreviationModel = (function (_super) {
                __extends(AbbreviationModel, _super);
                function AbbreviationModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(AbbreviationModel.prototype, "contentType", {
                    get: function () {
                        return AbbreviationModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                AbbreviationModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".abbreviation";
                return AbbreviationModel;
            }(Model.ChildContentModelBase));
            Model.AbbreviationModel = AbbreviationModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var AbbreviationAdapter = (function (_super) {
                __extends(AbbreviationAdapter, _super);
                function AbbreviationAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "abbreviation adapter";
                    _this.modelContentType = Editor.Model.AbbreviationModel.ContentType;
                    _this.viewTagName = "ABBR";
                    return _this;
                }
                AbbreviationAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.AbbreviationModel();
                };
                return AbbreviationAdapter;
            }(View.ViewAdapterBase));
            View.AbbreviationAdapter = AbbreviationAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var AnchorAdapter = (function (_super) {
                __extends(AnchorAdapter, _super);
                function AnchorAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "anchor adapter";
                    _this.modelContentType = Editor.Model.AnchorModel.ContentType;
                    _this.viewTagName = "A";
                    return _this;
                }
                AnchorAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.AnchorModel();
                };
                AnchorAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.href = model.href;
                    if (model.rel.length === 0) {
                        view.removeAttribute("rel");
                    }
                    else {
                        view.rel = model.rel.join(" ");
                    }
                    if (model.target === null) {
                        view.removeAttribute("target");
                    }
                    else {
                        view.target = model.target;
                    }
                };
                AnchorAdapter.prototype.parseCustomAttributes = function (model, view) {
                    model.href = view.getAttribute("href") || "";
                    if (view.hasAttribute("rel")) {
                        (_a = model.rel).push.apply(_a, view.rel.split(" "));
                    }
                    if (view.hasAttribute("target")) {
                        model.target = view.target;
                    }
                    var _a;
                };
                return AnchorAdapter;
            }(View.ViewAdapterBase));
            View.AnchorAdapter = AnchorAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var AreaShape;
            (function (AreaShape) {
                AreaShape["Default"] = "default";
                AreaShape["Rectangle"] = "rect";
                AreaShape["Circle"] = "circle";
                AreaShape["Polygon"] = "poly";
            })(AreaShape = Model.AreaShape || (Model.AreaShape = {}));
            var AreaTarget;
            (function (AreaTarget) {
                AreaTarget["Self"] = "_self";
                AreaTarget["Blank"] = "_blank";
                AreaTarget["Parent"] = "_parent";
                AreaTarget["Top"] = "_top";
            })(AreaTarget = Model.AreaTarget || (Model.AreaTarget = {}));
            var AreaModel = (function (_super) {
                __extends(AreaModel, _super);
                function AreaModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.alternateText = "";
                    _this.href = "";
                    _this.shape = AreaShape.Default;
                    _this.rel = [];
                    _this.target = "";
                    return _this;
                }
                Object.defineProperty(AreaModel.prototype, "contentType", {
                    get: function () {
                        return AreaModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                AreaModel.prototype.canBeAccepted = function (index, parent) {
                    return parent.anyParent(function (p) { return p.contentType === Model.MapModel.ContentType; });
                };
                AreaModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".area";
                return AreaModel;
            }(Model.EmptyContentModelBase));
            Model.AreaModel = AreaModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var AreaAdapter = (function (_super) {
                __extends(AreaAdapter, _super);
                function AreaAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "area adapter";
                    _this.modelContentType = Editor.Model.AreaModel.ContentType;
                    _this.viewTagName = "AREA";
                    return _this;
                }
                AreaAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.AreaModel();
                };
                AreaAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.alt = model.alternateText;
                    view.href = model.href;
                    view.shape = model.shape;
                    if (model.rel.length > 0) {
                        view.rel = model.rel.join(" ");
                    }
                    else {
                        view.removeAttribute("rel");
                    }
                    view.target = model.target;
                };
                AreaAdapter.prototype.parseCustomAttributes = function (model, view) {
                    model.alternateText = view.alt;
                    model.href = view.getAttribute("href") || "";
                    model.shape = view.shape;
                    if (view.hasAttribute("rel")) {
                        (_a = model.rel).push.apply(_a, view.rel.split(" "));
                    }
                    model.target = view.target;
                    var _a;
                };
                return AreaAdapter;
            }(View.ViewAdapterBase));
            View.AreaAdapter = AreaAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var BidirectionalIsolationModel = (function (_super) {
                __extends(BidirectionalIsolationModel, _super);
                function BidirectionalIsolationModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(BidirectionalIsolationModel.prototype, "contentType", {
                    get: function () {
                        return BidirectionalIsolationModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                BidirectionalIsolationModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".bidirectionalisolation";
                return BidirectionalIsolationModel;
            }(Model.ChildContentModelBase));
            Model.BidirectionalIsolationModel = BidirectionalIsolationModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var BidirectionalIsolationAdapter = (function (_super) {
                __extends(BidirectionalIsolationAdapter, _super);
                function BidirectionalIsolationAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "bidirectional isolation adapter";
                    _this.modelContentType = Editor.Model.BidirectionalIsolationModel.ContentType;
                    _this.viewTagName = "BDI";
                    return _this;
                }
                BidirectionalIsolationAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.BidirectionalIsolationModel();
                };
                return BidirectionalIsolationAdapter;
            }(View.ViewAdapterBase));
            View.BidirectionalIsolationAdapter = BidirectionalIsolationAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var BidirectionalTextOverrideModel = (function (_super) {
                __extends(BidirectionalTextOverrideModel, _super);
                function BidirectionalTextOverrideModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(BidirectionalTextOverrideModel.prototype, "contentType", {
                    get: function () {
                        return BidirectionalTextOverrideModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                BidirectionalTextOverrideModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".bidirectionaltextoverride";
                return BidirectionalTextOverrideModel;
            }(Model.ChildContentModelBase));
            Model.BidirectionalTextOverrideModel = BidirectionalTextOverrideModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var BidirectionalTextOverrideAdapter = (function (_super) {
                __extends(BidirectionalTextOverrideAdapter, _super);
                function BidirectionalTextOverrideAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "bidirectional text override adapter";
                    _this.modelContentType = Editor.Model.BidirectionalTextOverrideModel.ContentType;
                    _this.viewTagName = "BDI";
                    return _this;
                }
                BidirectionalTextOverrideAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.BidirectionalTextOverrideModel();
                };
                return BidirectionalTextOverrideAdapter;
            }(View.ViewAdapterBase));
            View.BidirectionalTextOverrideAdapter = BidirectionalTextOverrideAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var BreakModel = (function (_super) {
                __extends(BreakModel, _super);
                function BreakModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(BreakModel.prototype, "contentType", {
                    get: function () {
                        return BreakModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                BreakModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".break";
                return BreakModel;
            }(Model.EmptyContentModelBase));
            Model.BreakModel = BreakModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var BreakAdapter = (function (_super) {
                __extends(BreakAdapter, _super);
                function BreakAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "break adapter";
                    _this.modelContentType = Editor.Model.BreakModel.ContentType;
                    _this.viewTagName = "BR";
                    return _this;
                }
                BreakAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.BreakModel();
                };
                return BreakAdapter;
            }(View.ViewAdapterBase));
            View.BreakAdapter = BreakAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var BringToAttentionModel = (function (_super) {
                __extends(BringToAttentionModel, _super);
                function BringToAttentionModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(BringToAttentionModel.prototype, "contentType", {
                    get: function () {
                        return BringToAttentionModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                BringToAttentionModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".bringtoattention";
                return BringToAttentionModel;
            }(Model.ChildContentModelBase));
            Model.BringToAttentionModel = BringToAttentionModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var BringToAttentionAdapter = (function (_super) {
                __extends(BringToAttentionAdapter, _super);
                function BringToAttentionAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "bring to attention adapter";
                    _this.modelContentType = Editor.Model.BringToAttentionModel.ContentType;
                    _this.viewTagName = "B";
                    return _this;
                }
                BringToAttentionAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.BringToAttentionModel();
                };
                return BringToAttentionAdapter;
            }(View.ViewAdapterBase));
            View.BringToAttentionAdapter = BringToAttentionAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var ButtonAdapter = (function (_super) {
                __extends(ButtonAdapter, _super);
                function ButtonAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "button adapter";
                    _this.modelContentType = Editor.Model.ButtonModel.ContentType;
                    _this.viewTagName = "BUTTON";
                    return _this;
                }
                ButtonAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.ButtonModel();
                };
                ButtonAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.autofocus = model.autofocus;
                    if (model.formActionUri === null) {
                        view.removeAttribute("formaction");
                    }
                    else {
                        view.formAction = model.formActionUri;
                    }
                    if (model.formMethod === null) {
                        view.removeAttribute("formmethod");
                    }
                    else {
                        view.formMethod = model.formMethod;
                    }
                    if (model.formNoValidation === null) {
                        view.removeAttribute("formnovalidate");
                    }
                    else {
                        view.formNoValidate = model.formNoValidation;
                    }
                    if (model.formTarget === null) {
                        view.removeAttribute("formtarget");
                    }
                    else {
                        view.formTarget = model.formTarget;
                    }
                    if (model.formEncodingType === null) {
                        view.removeAttribute("formenctype");
                    }
                    else {
                        view.formEnctype = model.formEncodingType;
                    }
                    if (model.isDisabled === null) {
                        view.removeAttribute("disabled");
                    }
                    else {
                        view.disabled = model.isDisabled;
                    }
                    view.name = model.name;
                    view.type = model.buttonType;
                    view.value = model.value;
                };
                ButtonAdapter.prototype.parseCustomAttributes = function (model, view) {
                    model.autofocus = view.autofocus;
                    if (view.hasAttribute("formaction")) {
                        model.formActionUri = view.formAction;
                    }
                    if (view.hasAttribute("formmethod")) {
                        model.formMethod = view.formMethod;
                    }
                    if (view.hasAttribute("formnovalidate")) {
                        model.formNoValidation = view.formNoValidate;
                    }
                    if (view.hasAttribute("formtarget")) {
                        model.formTarget = view.formTarget;
                    }
                    if (view.hasAttribute("formenctype")) {
                        model.formEncodingType = view.formEnctype;
                    }
                    if (view.hasAttribute("disabled")) {
                        model.isDisabled = view.disabled;
                    }
                    model.name = view.name;
                    model.buttonType = view.type;
                    model.value = view.value;
                };
                return ButtonAdapter;
            }(View.ViewAdapterBase));
            View.ButtonAdapter = ButtonAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var CiteModel = (function (_super) {
                __extends(CiteModel, _super);
                function CiteModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(CiteModel.prototype, "contentType", {
                    get: function () {
                        return CiteModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                CiteModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".cite";
                return CiteModel;
            }(Model.ChildContentModelBase));
            Model.CiteModel = CiteModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var CiteAdapter = (function (_super) {
                __extends(CiteAdapter, _super);
                function CiteAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "cite adapter";
                    _this.modelContentType = Editor.Model.CiteModel.ContentType;
                    _this.viewTagName = "CITE";
                    return _this;
                }
                CiteAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.CiteModel();
                };
                return CiteAdapter;
            }(View.ViewAdapterBase));
            View.CiteAdapter = CiteAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var CodeModel = (function (_super) {
                __extends(CodeModel, _super);
                function CodeModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(CodeModel.prototype, "contentType", {
                    get: function () {
                        return CodeModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                CodeModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".code";
                return CodeModel;
            }(Model.ChildContentModelBase));
            Model.CodeModel = CodeModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var CodeAdapter = (function (_super) {
                __extends(CodeAdapter, _super);
                function CodeAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "code adapter";
                    _this.modelContentType = Editor.Model.CodeModel.ContentType;
                    _this.viewTagName = "CODE";
                    return _this;
                }
                CodeAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.CodeModel();
                };
                return CodeAdapter;
            }(View.ViewAdapterBase));
            View.CodeAdapter = CodeAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var OptionModel = (function (_super) {
                __extends(OptionModel, _super);
                function OptionModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.isDisabled = null;
                    _this.isSelected = null;
                    _this.label = null;
                    _this.value = null;
                    _this.acceptsTypes = [Model.TextModel.ContentType];
                    return _this;
                }
                Object.defineProperty(OptionModel.prototype, "contentType", {
                    get: function () {
                        return OptionModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                OptionModel.ContentType = Model.CommonModelTypes.UnclassifiedContent + ".option";
                return OptionModel;
            }(Model.ChildContentModelBase));
            Model.OptionModel = OptionModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var DataListModel = (function (_super) {
                __extends(DataListModel, _super);
                function DataListModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.OptionModel.ContentType, Model.TextModel.ContentType];
                    return _this;
                }
                Object.defineProperty(DataListModel.prototype, "contentType", {
                    get: function () {
                        return DataListModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                DataListModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".datalist";
                return DataListModel;
            }(Model.ChildContentModelBase));
            Model.DataListModel = DataListModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var DataListAdapter = (function (_super) {
                __extends(DataListAdapter, _super);
                function DataListAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "data list adapter";
                    _this.modelContentType = Editor.Model.DataListModel.ContentType;
                    _this.viewTagName = "DATALIST";
                    return _this;
                }
                DataListAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.DataListModel();
                };
                return DataListAdapter;
            }(View.ViewAdapterBase));
            View.DataListAdapter = DataListAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var DataModel = (function (_super) {
                __extends(DataModel, _super);
                function DataModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(DataModel.prototype, "contentType", {
                    get: function () {
                        return DataModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                DataModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".data";
                return DataModel;
            }(Model.ChildContentModelBase));
            Model.DataModel = DataModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var DataAdapter = (function (_super) {
                __extends(DataAdapter, _super);
                function DataAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "data adapter";
                    _this.modelContentType = Editor.Model.DataModel.ContentType;
                    _this.viewTagName = "DATA";
                    return _this;
                }
                DataAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.DataModel();
                };
                DataAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.value = model.value;
                };
                DataAdapter.prototype.parseCustomAttributes = function (model, view) {
                    model.value = view.value;
                };
                return DataAdapter;
            }(View.ViewAdapterBase));
            View.DataAdapter = DataAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var DefinitionModel = (function (_super) {
                __extends(DefinitionModel, _super);
                function DefinitionModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(DefinitionModel.prototype, "contentType", {
                    get: function () {
                        return DefinitionModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                DefinitionModel.prototype.canAccept = function (index, child) {
                    if (child.anyInTree(function (c) { return c.contentType === DefinitionModel.ContentType; })) {
                        return false;
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                DefinitionModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".definition";
                return DefinitionModel;
            }(Model.ChildContentModelBase));
            Model.DefinitionModel = DefinitionModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var DefinitionAdapter = (function (_super) {
                __extends(DefinitionAdapter, _super);
                function DefinitionAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "definition adapter";
                    _this.modelContentType = Editor.Model.DefinitionModel.ContentType;
                    _this.viewTagName = "DFN";
                    return _this;
                }
                DefinitionAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.DefinitionModel();
                };
                return DefinitionAdapter;
            }(View.ViewAdapterBase));
            View.DefinitionAdapter = DefinitionAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var DeleteModel = (function (_super) {
                __extends(DeleteModel, _super);
                function DeleteModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(DeleteModel.prototype, "contentType", {
                    get: function () {
                        return DeleteModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                DeleteModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".delete";
                return DeleteModel;
            }(Model.ChildContentModelBase));
            Model.DeleteModel = DeleteModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var DeleteAdapter = (function (_super) {
                __extends(DeleteAdapter, _super);
                function DeleteAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "delete adapter";
                    _this.modelContentType = Editor.Model.DeleteModel.ContentType;
                    _this.viewTagName = "DEL";
                    return _this;
                }
                DeleteAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.DeleteModel();
                };
                DeleteAdapter.prototype.applyCustomAttributes = function (model, view) {
                    if (model.citeUri === null) {
                        view.removeAttribute("cite");
                    }
                    else {
                        view.cite = model.citeUri;
                    }
                    if (model.dateTime === null) {
                        view.removeAttribute("datetime");
                    }
                    else {
                        view.dateTime = model.dateTime;
                    }
                };
                DeleteAdapter.prototype.parseCustomAttributes = function (model, view) {
                    if (view.hasAttribute("cite")) {
                        model.citeUri = view.cite;
                    }
                    if (view.hasAttribute("datetime")) {
                        model.dateTime = view.dateTime;
                    }
                };
                return DeleteAdapter;
            }(View.ViewAdapterBase));
            View.DeleteAdapter = DeleteAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var EmphasisModel = (function (_super) {
                __extends(EmphasisModel, _super);
                function EmphasisModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(EmphasisModel.prototype, "contentType", {
                    get: function () {
                        return EmphasisModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                EmphasisModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".emphasis";
                return EmphasisModel;
            }(Model.ChildContentModelBase));
            Model.EmphasisModel = EmphasisModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var EmphasisAdapter = (function (_super) {
                __extends(EmphasisAdapter, _super);
                function EmphasisAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "emphasis adapter";
                    _this.modelContentType = Editor.Model.EmphasisModel.ContentType;
                    _this.viewTagName = "EM";
                    return _this;
                }
                EmphasisAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.EmphasisModel();
                };
                return EmphasisAdapter;
            }(View.ViewAdapterBase));
            View.EmphasisAdapter = EmphasisAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputAdapterBase = (function (_super) {
                __extends(InputAdapterBase, _super);
                function InputAdapterBase() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.viewTagName = "INPUT";
                    return _this;
                }
                InputAdapterBase.prototype.canParseView = function (element) {
                    return _super.prototype.canParseView.call(this, element) && element.type === this.inputElementType;
                };
                InputAdapterBase.prototype.applyCustomAttributes = function (model, view) {
                    view.type = this.inputElementType;
                    view.autocomplete = model.autocomplete;
                    view.autofocus = model.autofocus;
                    view.value = model.value;
                    if (model.formActionUri === null) {
                        view.removeAttribute("formaction");
                    }
                    else {
                        view.formAction = model.formActionUri;
                    }
                    if (model.formMethod === null) {
                        view.removeAttribute("formmethod");
                    }
                    else {
                        view.formMethod = model.formMethod;
                    }
                    if (model.formNoValidation === null) {
                        view.removeAttribute("formnovalidate");
                    }
                    else {
                        view.formNoValidate = model.formNoValidation;
                    }
                    if (model.formTarget === null) {
                        view.removeAttribute("formtarget");
                    }
                    else {
                        view.formTarget = model.formTarget;
                    }
                    if (model.formEncodingType === null) {
                        view.removeAttribute("formenctype");
                    }
                    else {
                        view.formEnctype = model.formEncodingType;
                    }
                    if (model.isDisabled === null) {
                        view.removeAttribute("disabled");
                    }
                    else {
                        view.disabled = model.isDisabled;
                    }
                    if (model.minimum === null) {
                        view.removeAttribute("min");
                    }
                    else {
                        view.min = model.minimum;
                    }
                    if (model.maximum === null) {
                        view.removeAttribute("max");
                    }
                    else {
                        view.max = model.maximum;
                    }
                    if (model.minimumLength === null) {
                        view.removeAttribute("minlength");
                    }
                    else {
                        view.minLength = model.minimumLength;
                    }
                    if (model.maximumLength === null) {
                        view.removeAttribute("maxlength");
                    }
                    else {
                        view.maxLength = model.maximumLength;
                    }
                    if (model.pattern === null) {
                        view.removeAttribute("pattern");
                    }
                    else {
                        view.pattern = model.pattern;
                    }
                    if (model.placeholder === null) {
                        view.removeAttribute("placeholder");
                    }
                    else {
                        view.placeholder = model.placeholder;
                    }
                    if (model.isReadOnly === null) {
                        view.removeAttribute("readonly");
                    }
                    else {
                        view.readOnly = model.isReadOnly;
                    }
                    if (model.isRequired === null) {
                        view.removeAttribute("required");
                    }
                    else {
                        view.required = model.isRequired;
                    }
                    if (model.selectionDirection === null) {
                        view.removeAttribute("selectiondirection");
                    }
                    else {
                        view.selectionDirection = model.selectionDirection;
                    }
                    view.selectionStart = model.selectionStart;
                    view.selectionEnd = model.selectionEnd;
                    if (model.spellCheck === null) {
                        view.removeAttribute("spellcheck");
                    }
                    else {
                        view.spellcheck = model.spellCheck;
                    }
                };
                InputAdapterBase.prototype.parseCustomAttributes = function (model, view) {
                    model.autocomplete = view.autocomplete;
                    model.autofocus = view.autofocus;
                    model.value = view.value;
                    if (view.hasAttribute("formaction")) {
                        model.formActionUri = view.formAction;
                    }
                    if (view.hasAttribute("formmethod")) {
                        model.formMethod = view.formMethod;
                    }
                    if (view.hasAttribute("formnovalidate")) {
                        model.formNoValidation = view.formNoValidate;
                    }
                    if (view.hasAttribute("formtarget")) {
                        model.formTarget = view.formTarget;
                    }
                    if (view.hasAttribute("disabled")) {
                        model.isDisabled = view.disabled;
                    }
                    if (view.hasAttribute("min")) {
                        model.minimum = view.min;
                    }
                    if (view.hasAttribute("max")) {
                        model.maximum = view.max;
                    }
                    if (view.hasAttribute("minlength")) {
                        model.minimumLength = view.minLength;
                    }
                    if (view.hasAttribute("maxlength")) {
                        model.maximumLength = view.maxLength;
                    }
                    if (view.hasAttribute("pattern")) {
                        model.pattern = view.pattern;
                    }
                    if (view.hasAttribute("placeholder")) {
                        model.placeholder = view.placeholder;
                    }
                    if (view.hasAttribute("readonly")) {
                        model.isReadOnly = view.readOnly;
                    }
                    if (view.hasAttribute("required")) {
                        model.isRequired = view.required;
                    }
                    if (view.hasAttribute("selectiondirection")) {
                        model.selectionDirection = view.selectionDirection;
                    }
                    if (view.hasAttribute("spellcheck")) {
                        model.spellCheck = view.spellcheck;
                    }
                };
                return InputAdapterBase;
            }(View.ViewAdapterBase));
            View.InputAdapterBase = InputAdapterBase;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputButtonAdapter = (function (_super) {
                __extends(InputButtonAdapter, _super);
                function InputButtonAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputButtonModel.ContentType;
                    _this.adapterDisplayName = "input button";
                    _this.inputElementType = "button";
                    return _this;
                }
                InputButtonAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputButtonModel();
                };
                return InputButtonAdapter;
            }(View.InputAdapterBase));
            View.InputButtonAdapter = InputButtonAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputCheckboxAdapter = (function (_super) {
                __extends(InputCheckboxAdapter, _super);
                function InputCheckboxAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputCheckboxModel.ContentType;
                    _this.adapterDisplayName = "input checkbox";
                    _this.inputElementType = "checkbox";
                    return _this;
                }
                InputCheckboxAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputCheckboxModel();
                };
                InputCheckboxAdapter.prototype.applyCustomAttributes = function (model, view) {
                    _super.prototype.applyCustomAttributes.call(this, model, view);
                    view.checked = model.isChecked;
                };
                InputCheckboxAdapter.prototype.parseCustomAttributes = function (model, view) {
                    _super.prototype.parseCustomAttributes.call(this, model, view);
                    model.isChecked = view.checked;
                };
                return InputCheckboxAdapter;
            }(View.InputAdapterBase));
            View.InputCheckboxAdapter = InputCheckboxAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputColorModel = (function (_super) {
                __extends(InputColorModel, _super);
                function InputColorModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(InputColorModel.prototype, "contentType", {
                    get: function () {
                        return InputColorModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputColorModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.color";
                return InputColorModel;
            }(Model.InputModelBase));
            Model.InputColorModel = InputColorModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputColorAdapter = (function (_super) {
                __extends(InputColorAdapter, _super);
                function InputColorAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputColorModel.ContentType;
                    _this.adapterDisplayName = "input color";
                    _this.inputElementType = "color";
                    return _this;
                }
                InputColorAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputColorModel();
                };
                return InputColorAdapter;
            }(View.InputAdapterBase));
            View.InputColorAdapter = InputColorAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputDateModel = (function (_super) {
                __extends(InputDateModel, _super);
                function InputDateModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(InputDateModel.prototype, "contentType", {
                    get: function () {
                        return InputDateModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputDateModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.date";
                return InputDateModel;
            }(Model.InputModelBase));
            Model.InputDateModel = InputDateModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputDateAdapter = (function (_super) {
                __extends(InputDateAdapter, _super);
                function InputDateAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputDateModel.ContentType;
                    _this.adapterDisplayName = "input date";
                    _this.inputElementType = "date";
                    return _this;
                }
                InputDateAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputDateModel();
                };
                return InputDateAdapter;
            }(View.InputAdapterBase));
            View.InputDateAdapter = InputDateAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputEmailModel = (function (_super) {
                __extends(InputEmailModel, _super);
                function InputEmailModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(InputEmailModel.prototype, "contentType", {
                    get: function () {
                        return InputEmailModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputEmailModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.email";
                return InputEmailModel;
            }(Model.InputModelBase));
            Model.InputEmailModel = InputEmailModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputEmailAdapter = (function (_super) {
                __extends(InputEmailAdapter, _super);
                function InputEmailAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputEmailModel.ContentType;
                    _this.adapterDisplayName = "input email";
                    _this.inputElementType = "email";
                    return _this;
                }
                InputEmailAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputEmailModel();
                };
                return InputEmailAdapter;
            }(View.InputAdapterBase));
            View.InputEmailAdapter = InputEmailAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputFileModel = (function (_super) {
                __extends(InputFileModel, _super);
                function InputFileModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.accept = [];
                    return _this;
                }
                Object.defineProperty(InputFileModel.prototype, "contentType", {
                    get: function () {
                        return InputFileModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputFileModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.file";
                return InputFileModel;
            }(Model.InputModelBase));
            Model.InputFileModel = InputFileModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputFileAdapter = (function (_super) {
                __extends(InputFileAdapter, _super);
                function InputFileAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputFileModel.ContentType;
                    _this.adapterDisplayName = "input file";
                    _this.inputElementType = "file";
                    return _this;
                }
                InputFileAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputFileModel();
                };
                InputFileAdapter.prototype.applyCustomAttributes = function (model, view) {
                    _super.prototype.applyCustomAttributes.call(this, model, view);
                    view.accept = model.accept.join(",");
                };
                InputFileAdapter.prototype.parseCustomAttributes = function (model, view) {
                    _super.prototype.parseCustomAttributes.call(this, model, view);
                    (_a = model.accept).push.apply(_a, view.accept.split(","));
                    var _a;
                };
                return InputFileAdapter;
            }(View.InputAdapterBase));
            View.InputFileAdapter = InputFileAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputImageModel = (function (_super) {
                __extends(InputImageModel, _super);
                function InputImageModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.sourceUri = "";
                    _this.alternateText = "";
                    return _this;
                }
                Object.defineProperty(InputImageModel.prototype, "contentType", {
                    get: function () {
                        return InputImageModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputImageModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.image";
                return InputImageModel;
            }(Model.InputModelBase));
            Model.InputImageModel = InputImageModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputImageAdapter = (function (_super) {
                __extends(InputImageAdapter, _super);
                function InputImageAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputImageModel.ContentType;
                    _this.adapterDisplayName = "input image";
                    _this.inputElementType = "image";
                    return _this;
                }
                InputImageAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputImageModel();
                };
                InputImageAdapter.prototype.applyCustomAttributes = function (model, view) {
                    _super.prototype.applyCustomAttributes.call(this, model, view);
                    view.src = model.sourceUri;
                    view.alt = model.alternateText;
                };
                InputImageAdapter.prototype.parseCustomAttributes = function (model, view) {
                    _super.prototype.parseCustomAttributes.call(this, model, view);
                    model.sourceUri = view.src;
                    model.alternateText = view.alt;
                };
                return InputImageAdapter;
            }(View.InputAdapterBase));
            View.InputImageAdapter = InputImageAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputMonthModel = (function (_super) {
                __extends(InputMonthModel, _super);
                function InputMonthModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(InputMonthModel.prototype, "contentType", {
                    get: function () {
                        return InputMonthModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputMonthModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.month";
                return InputMonthModel;
            }(Model.InputModelBase));
            Model.InputMonthModel = InputMonthModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputMonthAdapter = (function (_super) {
                __extends(InputMonthAdapter, _super);
                function InputMonthAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputMonthModel.ContentType;
                    _this.adapterDisplayName = "input month";
                    _this.inputElementType = "month";
                    return _this;
                }
                InputMonthAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputMonthModel();
                };
                return InputMonthAdapter;
            }(View.InputAdapterBase));
            View.InputMonthAdapter = InputMonthAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputNumberModel = (function (_super) {
                __extends(InputNumberModel, _super);
                function InputNumberModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(InputNumberModel.prototype, "valueAsInteger", {
                    get: function () {
                        return parseInt(this.value);
                    },
                    set: function (value) {
                        this.value = value.toFixed(0);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InputNumberModel.prototype, "valueAsFloat", {
                    get: function () {
                        return parseFloat(this.value);
                    },
                    set: function (value) {
                        this.value = value.toString(10);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InputNumberModel.prototype, "contentType", {
                    get: function () {
                        return InputNumberModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputNumberModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.number";
                return InputNumberModel;
            }(Model.InputModelBase));
            Model.InputNumberModel = InputNumberModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputNumberAdapter = (function (_super) {
                __extends(InputNumberAdapter, _super);
                function InputNumberAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputNumberModel.ContentType;
                    _this.adapterDisplayName = "input number";
                    _this.inputElementType = "number";
                    return _this;
                }
                InputNumberAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputNumberModel();
                };
                return InputNumberAdapter;
            }(View.InputAdapterBase));
            View.InputNumberAdapter = InputNumberAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputPasswordModel = (function (_super) {
                __extends(InputPasswordModel, _super);
                function InputPasswordModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(InputPasswordModel.prototype, "contentType", {
                    get: function () {
                        return InputPasswordModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputPasswordModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.password";
                return InputPasswordModel;
            }(Model.InputModelBase));
            Model.InputPasswordModel = InputPasswordModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputPasswordAdapter = (function (_super) {
                __extends(InputPasswordAdapter, _super);
                function InputPasswordAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputPasswordModel.ContentType;
                    _this.adapterDisplayName = "input password";
                    _this.inputElementType = "password";
                    return _this;
                }
                InputPasswordAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputPasswordModel();
                };
                return InputPasswordAdapter;
            }(View.InputAdapterBase));
            View.InputPasswordAdapter = InputPasswordAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputRadioAdapter = (function (_super) {
                __extends(InputRadioAdapter, _super);
                function InputRadioAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputRadioModel.ContentType;
                    _this.adapterDisplayName = "input radio";
                    _this.inputElementType = "radio";
                    return _this;
                }
                InputRadioAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputRadioModel();
                };
                InputRadioAdapter.prototype.applyCustomAttributes = function (model, view) {
                    _super.prototype.applyCustomAttributes.call(this, model, view);
                    view.checked = model.isChecked;
                };
                InputRadioAdapter.prototype.parseCustomAttributes = function (model, view) {
                    _super.prototype.parseCustomAttributes.call(this, model, view);
                    model.isChecked = view.checked;
                };
                return InputRadioAdapter;
            }(View.InputAdapterBase));
            View.InputRadioAdapter = InputRadioAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputRangeModel = (function (_super) {
                __extends(InputRangeModel, _super);
                function InputRangeModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.step = "any";
                    return _this;
                }
                Object.defineProperty(InputRangeModel.prototype, "contentType", {
                    get: function () {
                        return InputRangeModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputRangeModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.range";
                return InputRangeModel;
            }(Model.InputModelBase));
            Model.InputRangeModel = InputRangeModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputRangeAdapter = (function (_super) {
                __extends(InputRangeAdapter, _super);
                function InputRangeAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputRangeModel.ContentType;
                    _this.adapterDisplayName = "input range";
                    _this.inputElementType = "range";
                    return _this;
                }
                InputRangeAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputRangeModel();
                };
                InputRangeAdapter.prototype.applyCustomAttributes = function (model, view) {
                    _super.prototype.applyCustomAttributes.call(this, model, view);
                    view.step = model.step.toString();
                };
                InputRangeAdapter.prototype.parseCustomAttributes = function (model, view) {
                    _super.prototype.parseCustomAttributes.call(this, model, view);
                    model.step = view.step === "any" ? "any" : parseInt(view.step, 10);
                };
                return InputRangeAdapter;
            }(View.InputAdapterBase));
            View.InputRangeAdapter = InputRangeAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputSearchModel = (function (_super) {
                __extends(InputSearchModel, _super);
                function InputSearchModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(InputSearchModel.prototype, "contentType", {
                    get: function () {
                        return InputSearchModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputSearchModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.search";
                return InputSearchModel;
            }(Model.InputModelBase));
            Model.InputSearchModel = InputSearchModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputSearchAdapter = (function (_super) {
                __extends(InputSearchAdapter, _super);
                function InputSearchAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputSearchModel.ContentType;
                    _this.adapterDisplayName = "input search";
                    _this.inputElementType = "search";
                    return _this;
                }
                InputSearchAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputSearchModel();
                };
                return InputSearchAdapter;
            }(View.InputAdapterBase));
            View.InputSearchAdapter = InputSearchAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputSubmitModel = (function (_super) {
                __extends(InputSubmitModel, _super);
                function InputSubmitModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(InputSubmitModel.prototype, "contentType", {
                    get: function () {
                        return InputSubmitModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputSubmitModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.submit";
                return InputSubmitModel;
            }(Model.InputModelBase));
            Model.InputSubmitModel = InputSubmitModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputSubmitAdapter = (function (_super) {
                __extends(InputSubmitAdapter, _super);
                function InputSubmitAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputSubmitModel.ContentType;
                    _this.adapterDisplayName = "input submit";
                    _this.inputElementType = "submit";
                    return _this;
                }
                InputSubmitAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputSubmitModel();
                };
                return InputSubmitAdapter;
            }(View.InputAdapterBase));
            View.InputSubmitAdapter = InputSubmitAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputTelephoneModel = (function (_super) {
                __extends(InputTelephoneModel, _super);
                function InputTelephoneModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(InputTelephoneModel.prototype, "contentType", {
                    get: function () {
                        return InputTelephoneModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputTelephoneModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.telephone";
                return InputTelephoneModel;
            }(Model.InputModelBase));
            Model.InputTelephoneModel = InputTelephoneModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputTelephoneAdapter = (function (_super) {
                __extends(InputTelephoneAdapter, _super);
                function InputTelephoneAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputTelephoneModel.ContentType;
                    _this.adapterDisplayName = "input telephone";
                    _this.inputElementType = "telephone";
                    return _this;
                }
                InputTelephoneAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputTelephoneModel();
                };
                return InputTelephoneAdapter;
            }(View.InputAdapterBase));
            View.InputTelephoneAdapter = InputTelephoneAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputTextModel = (function (_super) {
                __extends(InputTextModel, _super);
                function InputTextModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(InputTextModel.prototype, "contentType", {
                    get: function () {
                        return InputTextModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputTextModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.text";
                return InputTextModel;
            }(Model.InputModelBase));
            Model.InputTextModel = InputTextModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputTextAdapter = (function (_super) {
                __extends(InputTextAdapter, _super);
                function InputTextAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputTextModel.ContentType;
                    _this.adapterDisplayName = "input text";
                    _this.inputElementType = "text";
                    return _this;
                }
                InputTextAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputTextModel();
                };
                return InputTextAdapter;
            }(View.InputAdapterBase));
            View.InputTextAdapter = InputTextAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputTimeModel = (function (_super) {
                __extends(InputTimeModel, _super);
                function InputTimeModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(InputTimeModel.prototype, "contentType", {
                    get: function () {
                        return InputTimeModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputTimeModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.time";
                return InputTimeModel;
            }(Model.InputModelBase));
            Model.InputTimeModel = InputTimeModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputTimeAdapter = (function (_super) {
                __extends(InputTimeAdapter, _super);
                function InputTimeAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputTimeModel.ContentType;
                    _this.adapterDisplayName = "input time";
                    _this.inputElementType = "time";
                    return _this;
                }
                InputTimeAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputTimeModel();
                };
                return InputTimeAdapter;
            }(View.InputAdapterBase));
            View.InputTimeAdapter = InputTimeAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputUrlModel = (function (_super) {
                __extends(InputUrlModel, _super);
                function InputUrlModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(InputUrlModel.prototype, "contentType", {
                    get: function () {
                        return InputUrlModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputUrlModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.url";
                return InputUrlModel;
            }(Model.InputModelBase));
            Model.InputUrlModel = InputUrlModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputUrlAdapter = (function (_super) {
                __extends(InputUrlAdapter, _super);
                function InputUrlAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputUrlModel.ContentType;
                    _this.adapterDisplayName = "input URL";
                    _this.inputElementType = "url";
                    return _this;
                }
                InputUrlAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputUrlModel();
                };
                return InputUrlAdapter;
            }(View.InputAdapterBase));
            View.InputUrlAdapter = InputUrlAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputWeekModel = (function (_super) {
                __extends(InputWeekModel, _super);
                function InputWeekModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(InputWeekModel.prototype, "contentType", {
                    get: function () {
                        return InputWeekModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputWeekModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.week";
                return InputWeekModel;
            }(Model.InputModelBase));
            Model.InputWeekModel = InputWeekModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputWeekAdapter = (function (_super) {
                __extends(InputWeekAdapter, _super);
                function InputWeekAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputWeekModel.ContentType;
                    _this.adapterDisplayName = "input week";
                    _this.inputElementType = "week";
                    return _this;
                }
                InputWeekAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputWeekModel();
                };
                return InputWeekAdapter;
            }(View.InputAdapterBase));
            View.InputWeekAdapter = InputWeekAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InsertedModel = (function (_super) {
                __extends(InsertedModel, _super);
                function InsertedModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(InsertedModel.prototype, "contentType", {
                    get: function () {
                        return InsertedModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InsertedModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".inserted";
                return InsertedModel;
            }(Model.ChildContentModelBase));
            Model.InsertedModel = InsertedModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InsertedAdapter = (function (_super) {
                __extends(InsertedAdapter, _super);
                function InsertedAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "inserted adapter";
                    _this.modelContentType = Editor.Model.InsertedModel.ContentType;
                    _this.viewTagName = "INS";
                    return _this;
                }
                InsertedAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InsertedModel();
                };
                InsertedAdapter.prototype.applyCustomAttributes = function (model, view) {
                    if (model.citeUri === null) {
                        view.removeAttribute("cite");
                    }
                    else {
                        view.cite = model.citeUri;
                    }
                    if (model.dateTime === null) {
                        view.removeAttribute("datetime");
                    }
                    else {
                        view.dateTime = model.dateTime;
                    }
                };
                InsertedAdapter.prototype.parseCustomAttributes = function (model, view) {
                    if (view.hasAttribute("cite")) {
                        model.citeUri = view.cite;
                    }
                    if (view.hasAttribute("datetime")) {
                        model.dateTime = view.dateTime;
                    }
                };
                return InsertedAdapter;
            }(View.ViewAdapterBase));
            View.InsertedAdapter = InsertedAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var KeyboardInputModel = (function (_super) {
                __extends(KeyboardInputModel, _super);
                function KeyboardInputModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(KeyboardInputModel.prototype, "contentType", {
                    get: function () {
                        return KeyboardInputModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                KeyboardInputModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".keyboardinput";
                return KeyboardInputModel;
            }(Model.ChildContentModelBase));
            Model.KeyboardInputModel = KeyboardInputModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var KeyboardInputAdapter = (function (_super) {
                __extends(KeyboardInputAdapter, _super);
                function KeyboardInputAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "keyboard input adapter";
                    _this.modelContentType = Editor.Model.KeyboardInputModel.ContentType;
                    _this.viewTagName = "KBD";
                    return _this;
                }
                KeyboardInputAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.KeyboardInputModel();
                };
                return KeyboardInputAdapter;
            }(View.ViewAdapterBase));
            View.KeyboardInputAdapter = KeyboardInputAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var LabelModel = (function (_super) {
                __extends(LabelModel, _super);
                function LabelModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.targetModelId = "";
                    _this.isInteractive = true;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(LabelModel.prototype, "contentType", {
                    get: function () {
                        return LabelModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                LabelModel.prototype.canAccept = function (index, child) {
                    if (child.anyInTree(function (c) { return c.contentType === LabelModel.ContentType; })) {
                        return false;
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                LabelModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".label";
                return LabelModel;
            }(Model.ChildContentModelBase));
            Model.LabelModel = LabelModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var LabelAdapter = (function (_super) {
                __extends(LabelAdapter, _super);
                function LabelAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "label adapter";
                    _this.modelContentType = Editor.Model.LabelModel.ContentType;
                    _this.viewTagName = "LABEL";
                    return _this;
                }
                LabelAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.LabelModel();
                };
                LabelAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.htmlFor = model.targetModelId;
                };
                LabelAdapter.prototype.parseCustomAttributes = function (model, view) {
                    model.targetModelId = view.htmlFor;
                };
                return LabelAdapter;
            }(View.ViewAdapterBase));
            View.LabelAdapter = LabelAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var MapModel = (function (_super) {
                __extends(MapModel, _super);
                function MapModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.name = "";
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(MapModel.prototype, "contentType", {
                    get: function () {
                        return MapModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                MapModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".map";
                return MapModel;
            }(Model.ChildContentModelBase));
            Model.MapModel = MapModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var MapAdapter = (function (_super) {
                __extends(MapAdapter, _super);
                function MapAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "map adapter";
                    _this.modelContentType = Editor.Model.MapModel.ContentType;
                    _this.viewTagName = "MAP";
                    return _this;
                }
                MapAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.MapModel();
                };
                MapAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.name = model.name;
                };
                MapAdapter.prototype.parseCustomAttributes = function (model, view) {
                    model.name = view.name;
                };
                return MapAdapter;
            }(View.ViewAdapterBase));
            View.MapAdapter = MapAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var MarkModel = (function (_super) {
                __extends(MarkModel, _super);
                function MarkModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(MarkModel.prototype, "contentType", {
                    get: function () {
                        return MarkModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                MarkModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".mark";
                return MarkModel;
            }(Model.ChildContentModelBase));
            Model.MarkModel = MarkModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var MarkAdapter = (function (_super) {
                __extends(MarkAdapter, _super);
                function MarkAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "mark adapter";
                    _this.modelContentType = Editor.Model.MarkModel.ContentType;
                    _this.viewTagName = "MARK";
                    return _this;
                }
                MarkAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.MarkModel();
                };
                return MarkAdapter;
            }(View.ViewAdapterBase));
            View.MarkAdapter = MarkAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var MeterModel = (function (_super) {
                __extends(MeterModel, _super);
                function MeterModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(MeterModel.prototype, "contentType", {
                    get: function () {
                        return MeterModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                MeterModel.prototype.canAccept = function (index, child) {
                    if (child.anyInTree(function (c) { return c.contentType === MeterModel.ContentType; })) {
                        return false;
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                MeterModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".meter";
                return MeterModel;
            }(Model.ChildContentModelBase));
            Model.MeterModel = MeterModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var MeterAdapter = (function (_super) {
                __extends(MeterAdapter, _super);
                function MeterAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "meter adapter";
                    _this.modelContentType = Editor.Model.MeterModel.ContentType;
                    _this.viewTagName = "METER";
                    return _this;
                }
                MeterAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.MeterModel();
                };
                MeterAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.min = model.minimum;
                    view.max = model.maximum;
                    view.low = model.low;
                    view.high = model.high;
                    view.optimum = model.optimum;
                };
                MeterAdapter.prototype.parseCustomAttributes = function (model, view) {
                    model.minimum = view.min;
                    model.maximum = view.max;
                    model.low = view.low;
                    model.high = view.high;
                    model.optimum = view.optimum;
                };
                return MeterAdapter;
            }(View.ViewAdapterBase));
            View.MeterAdapter = MeterAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var OutputModel = (function (_super) {
                __extends(OutputModel, _super);
                function OutputModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(OutputModel.prototype, "contentType", {
                    get: function () {
                        return OutputModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                OutputModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".output";
                return OutputModel;
            }(Model.ChildContentModelBase));
            Model.OutputModel = OutputModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var OutputAdapter = (function (_super) {
                __extends(OutputAdapter, _super);
                function OutputAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "output adapter";
                    _this.modelContentType = Editor.Model.OutputModel.ContentType;
                    _this.viewTagName = "OUTPUT";
                    return _this;
                }
                OutputAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.OutputModel();
                };
                OutputAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.name = model.name;
                };
                OutputAdapter.prototype.parseCustomAttributes = function (model, view) {
                    model.name = view.name;
                };
                return OutputAdapter;
            }(View.ViewAdapterBase));
            View.OutputAdapter = OutputAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var ProgressModel = (function (_super) {
                __extends(ProgressModel, _super);
                function ProgressModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(ProgressModel.prototype, "contentType", {
                    get: function () {
                        return ProgressModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                ProgressModel.prototype.canAccept = function (index, child) {
                    if (child.anyInTree(function (c) { return c.contentType === ProgressModel.ContentType; })) {
                        return false;
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                ProgressModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".progress";
                return ProgressModel;
            }(Model.ChildContentModelBase));
            Model.ProgressModel = ProgressModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var ProgressAdapter = (function (_super) {
                __extends(ProgressAdapter, _super);
                function ProgressAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "progress adapter";
                    _this.modelContentType = Editor.Model.ProgressModel.ContentType;
                    _this.viewTagName = "PROGRESS";
                    return _this;
                }
                ProgressAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.ProgressModel();
                };
                ProgressAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.max = model.maximum;
                    view.value = model.value;
                };
                ProgressAdapter.prototype.parseCustomAttributes = function (model, view) {
                    model.maximum = view.max;
                    model.value = view.value;
                };
                return ProgressAdapter;
            }(View.ViewAdapterBase));
            View.ProgressAdapter = ProgressAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var QuoteModel = (function (_super) {
                __extends(QuoteModel, _super);
                function QuoteModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(QuoteModel.prototype, "contentType", {
                    get: function () {
                        return QuoteModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                QuoteModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".quote";
                return QuoteModel;
            }(Model.ChildContentModelBase));
            Model.QuoteModel = QuoteModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var QuoteAdapter = (function (_super) {
                __extends(QuoteAdapter, _super);
                function QuoteAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "quote adapter";
                    _this.modelContentType = Editor.Model.QuoteModel.ContentType;
                    _this.viewTagName = "Q";
                    return _this;
                }
                QuoteAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.QuoteModel();
                };
                QuoteAdapter.prototype.applyCustomAttributes = function (model, view) {
                    if (model.citeUri === null) {
                        view.removeAttribute("cite");
                    }
                    else {
                        view.cite = model.citeUri;
                    }
                };
                QuoteAdapter.prototype.parseCustomAttributes = function (model, view) {
                    if (view.hasAttribute("cite")) {
                        model.citeUri = view.cite;
                    }
                };
                return QuoteAdapter;
            }(View.ViewAdapterBase));
            View.QuoteAdapter = QuoteAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var RubyModel = (function (_super) {
                __extends(RubyModel, _super);
                function RubyModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(RubyModel.prototype, "contentType", {
                    get: function () {
                        return RubyModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                RubyModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".ruby";
                return RubyModel;
            }(Model.ChildContentModelBase));
            Model.RubyModel = RubyModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var RubyAdapter = (function (_super) {
                __extends(RubyAdapter, _super);
                function RubyAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "ruby adapter";
                    _this.modelContentType = Editor.Model.RubyModel.ContentType;
                    _this.viewTagName = "RUBY";
                    return _this;
                }
                RubyAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.RubyModel();
                };
                return RubyAdapter;
            }(View.ViewAdapterBase));
            View.RubyAdapter = RubyAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var SampleModel = (function (_super) {
                __extends(SampleModel, _super);
                function SampleModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(SampleModel.prototype, "contentType", {
                    get: function () {
                        return SampleModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                SampleModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".sample";
                return SampleModel;
            }(Model.ChildContentModelBase));
            Model.SampleModel = SampleModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var SampleAdapter = (function (_super) {
                __extends(SampleAdapter, _super);
                function SampleAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "sample adapter";
                    _this.modelContentType = Editor.Model.SampleModel.ContentType;
                    _this.viewTagName = "SAMP";
                    return _this;
                }
                SampleAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.SampleModel();
                };
                return SampleAdapter;
            }(View.ViewAdapterBase));
            View.SampleAdapter = SampleAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var OptionGroupModel = (function (_super) {
                __extends(OptionGroupModel, _super);
                function OptionGroupModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.isDisabled = null;
                    _this.label = null;
                    _this.acceptsTypes = [Model.OptionModel.ContentType, Model.TextModel.ContentType];
                    return _this;
                }
                Object.defineProperty(OptionGroupModel.prototype, "contentType", {
                    get: function () {
                        return OptionGroupModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                OptionGroupModel.ContentType = Model.CommonModelTypes.UnclassifiedContent + ".optiongroup";
                return OptionGroupModel;
            }(Model.ChildContentModelBase));
            Model.OptionGroupModel = OptionGroupModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var SelectModel = (function (_super) {
                __extends(SelectModel, _super);
                function SelectModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.autofocus = null;
                    _this.isDisabled = null;
                    _this.allowMultiple = null;
                    _this.name = "";
                    _this.isRequired = null;
                    _this.size = null;
                    _this.isInteractive = true;
                    _this.acceptsTypes = [Model.OptionModel.ContentType, Model.OptionGroupModel.ContentType, Model.TextModel.ContentType];
                    return _this;
                }
                Object.defineProperty(SelectModel.prototype, "contentType", {
                    get: function () {
                        return SelectModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                SelectModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".select";
                return SelectModel;
            }(Model.ChildContentModelBase));
            Model.SelectModel = SelectModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var SelectAdapter = (function (_super) {
                __extends(SelectAdapter, _super);
                function SelectAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "select adapter";
                    _this.modelContentType = Editor.Model.SelectModel.ContentType;
                    _this.viewTagName = "SELECT";
                    return _this;
                }
                SelectAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.SelectModel();
                };
                SelectAdapter.prototype.applyCustomAttributes = function (model, view) {
                    if (model.autofocus === null) {
                        view.removeAttribute("autofocus");
                    }
                    else {
                        view.autofocus = model.autofocus;
                    }
                    if (model.allowMultiple === null) {
                        view.removeAttribute("multiple");
                    }
                    else {
                        view.multiple = model.allowMultiple;
                    }
                    if (model.isDisabled === null) {
                        view.removeAttribute("disabled");
                    }
                    else {
                        view.disabled = model.isDisabled;
                    }
                    if (model.isRequired === null) {
                        view.removeAttribute("required");
                    }
                    else {
                        view.required = model.isRequired;
                    }
                    if (model.size === null) {
                        view.removeAttribute("size");
                    }
                    else {
                        view.size = model.size;
                    }
                };
                SelectAdapter.prototype.parseCustomAttributes = function (model, view) {
                    if (view.hasAttribute("autofocus")) {
                        model.autofocus = view.autofocus;
                    }
                    if (view.hasAttribute("multiple")) {
                        model.allowMultiple = view.multiple;
                    }
                    if (view.hasAttribute("disabled")) {
                        model.isDisabled = view.disabled;
                    }
                    if (view.hasAttribute("required")) {
                        model.isRequired = view.required;
                    }
                    if (view.hasAttribute("size")) {
                        model.size = view.size;
                    }
                };
                return SelectAdapter;
            }(View.ViewAdapterBase));
            View.SelectAdapter = SelectAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var SetOffModel = (function (_super) {
                __extends(SetOffModel, _super);
                function SetOffModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(SetOffModel.prototype, "contentType", {
                    get: function () {
                        return SetOffModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                SetOffModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".setoff";
                return SetOffModel;
            }(Model.ChildContentModelBase));
            Model.SetOffModel = SetOffModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var SetOffAdapter = (function (_super) {
                __extends(SetOffAdapter, _super);
                function SetOffAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "set off adapter";
                    _this.modelContentType = Editor.Model.SetOffModel.ContentType;
                    _this.viewTagName = "I";
                    return _this;
                }
                SetOffAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.SetOffModel();
                };
                return SetOffAdapter;
            }(View.ViewAdapterBase));
            View.SetOffAdapter = SetOffAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var SmallTextModel = (function (_super) {
                __extends(SmallTextModel, _super);
                function SmallTextModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(SmallTextModel.prototype, "contentType", {
                    get: function () {
                        return SmallTextModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                SmallTextModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".smalltext";
                return SmallTextModel;
            }(Model.ChildContentModelBase));
            Model.SmallTextModel = SmallTextModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var SmallTextAdapter = (function (_super) {
                __extends(SmallTextAdapter, _super);
                function SmallTextAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "small text adapter";
                    _this.modelContentType = Editor.Model.SmallTextModel.ContentType;
                    _this.viewTagName = "SMALL";
                    return _this;
                }
                SmallTextAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.SmallTextModel();
                };
                return SmallTextAdapter;
            }(View.ViewAdapterBase));
            View.SmallTextAdapter = SmallTextAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var SpanModel = (function (_super) {
                __extends(SpanModel, _super);
                function SpanModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(SpanModel.prototype, "contentType", {
                    get: function () {
                        return SpanModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                SpanModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".span";
                return SpanModel;
            }(Model.ChildContentModelBase));
            Model.SpanModel = SpanModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var SpanAdapter = (function (_super) {
                __extends(SpanAdapter, _super);
                function SpanAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "span adapter";
                    _this.modelContentType = Editor.Model.SpanModel.ContentType;
                    _this.viewTagName = "SPAN";
                    return _this;
                }
                SpanAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.SpanModel();
                };
                return SpanAdapter;
            }(View.ViewAdapterBase));
            View.SpanAdapter = SpanAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var StrikethroughModel = (function (_super) {
                __extends(StrikethroughModel, _super);
                function StrikethroughModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(StrikethroughModel.prototype, "contentType", {
                    get: function () {
                        return StrikethroughModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                StrikethroughModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".strikethrough";
                return StrikethroughModel;
            }(Model.ChildContentModelBase));
            Model.StrikethroughModel = StrikethroughModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var StrikethroughAdapter = (function (_super) {
                __extends(StrikethroughAdapter, _super);
                function StrikethroughAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "strikethrough adapter";
                    _this.modelContentType = Editor.Model.StrikethroughModel.ContentType;
                    _this.viewTagName = "S";
                    return _this;
                }
                StrikethroughAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.StrikethroughModel();
                };
                return StrikethroughAdapter;
            }(View.ViewAdapterBase));
            View.StrikethroughAdapter = StrikethroughAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var StrongModel = (function (_super) {
                __extends(StrongModel, _super);
                function StrongModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(StrongModel.prototype, "contentType", {
                    get: function () {
                        return StrongModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                StrongModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".strong";
                return StrongModel;
            }(Model.ChildContentModelBase));
            Model.StrongModel = StrongModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var StrongAdapter = (function (_super) {
                __extends(StrongAdapter, _super);
                function StrongAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "strong adapter";
                    _this.modelContentType = Editor.Model.StrongModel.ContentType;
                    _this.viewTagName = "STRONG";
                    return _this;
                }
                StrongAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.StrongModel();
                };
                return StrongAdapter;
            }(View.ViewAdapterBase));
            View.StrongAdapter = StrongAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var SubscriptModel = (function (_super) {
                __extends(SubscriptModel, _super);
                function SubscriptModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(SubscriptModel.prototype, "contentType", {
                    get: function () {
                        return SubscriptModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                SubscriptModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".subscript";
                return SubscriptModel;
            }(Model.ChildContentModelBase));
            Model.SubscriptModel = SubscriptModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var SubscriptAdapter = (function (_super) {
                __extends(SubscriptAdapter, _super);
                function SubscriptAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "subscript adapter";
                    _this.modelContentType = Editor.Model.SubscriptModel.ContentType;
                    _this.viewTagName = "SUB";
                    return _this;
                }
                SubscriptAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.SubscriptModel();
                };
                return SubscriptAdapter;
            }(View.ViewAdapterBase));
            View.SubscriptAdapter = SubscriptAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var SuperscriptModel = (function (_super) {
                __extends(SuperscriptModel, _super);
                function SuperscriptModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(SuperscriptModel.prototype, "contentType", {
                    get: function () {
                        return SuperscriptModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                SuperscriptModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".superscript";
                return SuperscriptModel;
            }(Model.ChildContentModelBase));
            Model.SuperscriptModel = SuperscriptModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var SuperscriptAdapter = (function (_super) {
                __extends(SuperscriptAdapter, _super);
                function SuperscriptAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "superscript adapter";
                    _this.modelContentType = Editor.Model.SuperscriptModel.ContentType;
                    _this.viewTagName = "SUP";
                    return _this;
                }
                SuperscriptAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.SuperscriptModel();
                };
                return SuperscriptAdapter;
            }(View.ViewAdapterBase));
            View.SuperscriptAdapter = SuperscriptAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var TextWrapping;
            (function (TextWrapping) {
                TextWrapping["Soft"] = "soft";
                TextWrapping["Hard"] = "hard";
                TextWrapping["Off"] = "off";
            })(TextWrapping = Model.TextWrapping || (Model.TextWrapping = {}));
            var TextAreaModel = (function (_super) {
                __extends(TextAreaModel, _super);
                function TextAreaModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.autofocus = false;
                    _this.columns = 20;
                    _this.rows = null;
                    _this.isDisabled = null;
                    _this.maximumLength = null;
                    _this.minimumLength = null;
                    _this.isReadOnly = null;
                    _this.spellCheck = null;
                    _this.wrap = null;
                    _this.isInteractive = true;
                    _this.acceptsTypes = [Model.TextModel.ContentType];
                    return _this;
                }
                Object.defineProperty(TextAreaModel.prototype, "contentType", {
                    get: function () {
                        return TextAreaModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                TextAreaModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".textarea";
                return TextAreaModel;
            }(Model.ChildContentModelBase));
            Model.TextAreaModel = TextAreaModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var TextAreaAdapter = (function (_super) {
                __extends(TextAreaAdapter, _super);
                function TextAreaAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "text area adapter";
                    _this.modelContentType = Editor.Model.TextAreaModel.ContentType;
                    _this.viewTagName = "TEXTAREA";
                    return _this;
                }
                TextAreaAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.TextAreaModel();
                };
                TextAreaAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.autofocus = model.autofocus;
                    view.cols = model.columns;
                    if (model.rows === null) {
                        view.removeAttribute("rows");
                    }
                    else {
                        view.rows = model.rows;
                    }
                    if (model.isDisabled === null) {
                        view.removeAttribute("disabled");
                    }
                    else {
                        view.disabled = model.isDisabled;
                    }
                    if (model.maximumLength === null) {
                        view.removeAttribute("maxlength");
                    }
                    else {
                        view.maxLength = model.maximumLength;
                    }
                    if (model.minimumLength === null) {
                        view.removeAttribute("minlength");
                    }
                    else {
                        view.minLength = model.minimumLength;
                    }
                    if (model.isReadOnly === null) {
                        view.removeAttribute("readonly");
                    }
                    else {
                        view.readOnly = model.isReadOnly;
                    }
                    if (model.spellCheck === null) {
                        view.removeAttribute("spellcheck");
                    }
                    else {
                        view.spellcheck = model.spellCheck;
                    }
                    if (model.wrap === null) {
                        view.removeAttribute("wrap");
                    }
                    else {
                        view.wrap = model.wrap;
                    }
                };
                TextAreaAdapter.prototype.parseCustomAttributes = function (model, view) {
                    if (view.hasAttribute("rows")) {
                        model.rows = view.rows;
                    }
                    if (view.hasAttribute("disabled")) {
                        model.isDisabled = view.disabled;
                    }
                    if (view.hasAttribute("maxlength")) {
                        model.maximumLength = view.maxLength;
                    }
                    if (view.hasAttribute("minlength")) {
                        model.minimumLength = view.minLength;
                    }
                    if (view.hasAttribute("readonly")) {
                        model.isReadOnly = view.readOnly;
                    }
                    if (view.hasAttribute("spellcheck")) {
                        model.spellCheck = view.spellcheck;
                    }
                    if (view.hasAttribute("wrap")) {
                        model.wrap = view.wrap;
                    }
                };
                return TextAreaAdapter;
            }(View.ViewAdapterBase));
            View.TextAreaAdapter = TextAreaAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var TimeModel = (function (_super) {
                __extends(TimeModel, _super);
                function TimeModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.dateTime = "";
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(TimeModel.prototype, "contentType", {
                    get: function () {
                        return TimeModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                TimeModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".time";
                return TimeModel;
            }(Model.ChildContentModelBase));
            Model.TimeModel = TimeModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var TimeAdapter = (function (_super) {
                __extends(TimeAdapter, _super);
                function TimeAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "time adapter";
                    _this.modelContentType = Editor.Model.TimeModel.ContentType;
                    _this.viewTagName = "TIME";
                    return _this;
                }
                TimeAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.TimeModel();
                };
                TimeAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.dateTime = model.dateTime;
                };
                TimeAdapter.prototype.parseCustomAttributes = function (model, view) {
                    model.dateTime = view.dateTime;
                };
                return TimeAdapter;
            }(View.ViewAdapterBase));
            View.TimeAdapter = TimeAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var VariableModel = (function (_super) {
                __extends(VariableModel, _super);
                function VariableModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(VariableModel.prototype, "contentType", {
                    get: function () {
                        return VariableModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                VariableModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".variable";
                return VariableModel;
            }(Model.ChildContentModelBase));
            Model.VariableModel = VariableModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var VariableAdapter = (function (_super) {
                __extends(VariableAdapter, _super);
                function VariableAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "variable adapter";
                    _this.modelContentType = Editor.Model.VariableModel.ContentType;
                    _this.viewTagName = "VAR";
                    return _this;
                }
                VariableAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.VariableModel();
                };
                return VariableAdapter;
            }(View.ViewAdapterBase));
            View.VariableAdapter = VariableAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var WordBreakModel = (function (_super) {
                __extends(WordBreakModel, _super);
                function WordBreakModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(WordBreakModel.prototype, "contentType", {
                    get: function () {
                        return WordBreakModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                WordBreakModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".wordbreak";
                return WordBreakModel;
            }(Model.EmptyContentModelBase));
            Model.WordBreakModel = WordBreakModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var WordBreakAdapter = (function (_super) {
                __extends(WordBreakAdapter, _super);
                function WordBreakAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "word break adapter";
                    _this.modelContentType = Editor.Model.WordBreakModel.ContentType;
                    _this.viewTagName = "WBR";
                    return _this;
                }
                WordBreakAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.WordBreakModel();
                };
                return WordBreakAdapter;
            }(View.ViewAdapterBase));
            View.WordBreakAdapter = WordBreakAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var ArticleAdapter = (function (_super) {
                __extends(ArticleAdapter, _super);
                function ArticleAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "article adapter";
                    _this.modelContentType = Editor.Model.ArticleModel.ContentType;
                    _this.viewTagName = "ARTICLE";
                    return _this;
                }
                ArticleAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.ArticleModel();
                };
                return ArticleAdapter;
            }(View.ViewAdapterBase));
            View.ArticleAdapter = ArticleAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var AsideAdapter = (function (_super) {
                __extends(AsideAdapter, _super);
                function AsideAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "aside adapter";
                    _this.modelContentType = Editor.Model.AsideModel.ContentType;
                    _this.viewTagName = "ASIDE";
                    return _this;
                }
                AsideAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.AsideModel();
                };
                return AsideAdapter;
            }(View.ViewAdapterBase));
            View.AsideAdapter = AsideAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var NavigationModel = (function (_super) {
                __extends(NavigationModel, _super);
                function NavigationModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(NavigationModel.prototype, "contentType", {
                    get: function () {
                        return NavigationModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                NavigationModel.ContentType = Model.CommonModelTypes.SectioningContent + ".navigation";
                return NavigationModel;
            }(Model.ChildContentModelBase));
            Model.NavigationModel = NavigationModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var NavigationAdapter = (function (_super) {
                __extends(NavigationAdapter, _super);
                function NavigationAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "navigation adapter";
                    _this.modelContentType = Editor.Model.NavigationModel.ContentType;
                    _this.viewTagName = "NAV";
                    return _this;
                }
                NavigationAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.NavigationModel();
                };
                return NavigationAdapter;
            }(View.ViewAdapterBase));
            View.NavigationAdapter = NavigationAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var SectionModel = (function (_super) {
                __extends(SectionModel, _super);
                function SectionModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(SectionModel.prototype, "contentType", {
                    get: function () {
                        return SectionModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                SectionModel.ContentType = Model.CommonModelTypes.SectioningContent + ".section";
                return SectionModel;
            }(Model.ChildContentModelBase));
            Model.SectionModel = SectionModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var SectionAdapter = (function (_super) {
                __extends(SectionAdapter, _super);
                function SectionAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "section adapter";
                    _this.modelContentType = Editor.Model.SectionModel.ContentType;
                    _this.viewTagName = "SECTION";
                    return _this;
                }
                SectionAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.SectionModel();
                };
                return SectionAdapter;
            }(View.ViewAdapterBase));
            View.SectionAdapter = SectionAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var DescriptionListDefinitionAdapter = (function (_super) {
                __extends(DescriptionListDefinitionAdapter, _super);
                function DescriptionListDefinitionAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "description list definition adapter";
                    _this.modelContentType = Editor.Model.DescriptionListDefinitionModel.ContentType;
                    _this.viewTagName = "DD";
                    return _this;
                }
                DescriptionListDefinitionAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.DescriptionListDefinitionModel();
                };
                return DescriptionListDefinitionAdapter;
            }(View.ViewAdapterBase));
            View.DescriptionListDefinitionAdapter = DescriptionListDefinitionAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var DescriptionListTermAdapter = (function (_super) {
                __extends(DescriptionListTermAdapter, _super);
                function DescriptionListTermAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "description list term adapter";
                    _this.modelContentType = Editor.Model.DescriptionListTermModel.ContentType;
                    _this.viewTagName = "DT";
                    return _this;
                }
                DescriptionListTermAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.DescriptionListTermModel();
                };
                return DescriptionListTermAdapter;
            }(View.ViewAdapterBase));
            View.DescriptionListTermAdapter = DescriptionListTermAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var FigureCaptionAdapter = (function (_super) {
                __extends(FigureCaptionAdapter, _super);
                function FigureCaptionAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "figure caption adapter";
                    _this.modelContentType = Editor.Model.FigureCaptionModel.ContentType;
                    _this.viewTagName = "FIGCAPTION";
                    return _this;
                }
                FigureCaptionAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.FigureCaptionModel();
                };
                return FigureCaptionAdapter;
            }(View.ViewAdapterBase));
            View.FigureCaptionAdapter = FigureCaptionAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var LegendAdapter = (function (_super) {
                __extends(LegendAdapter, _super);
                function LegendAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "legend adapter";
                    _this.modelContentType = Editor.Model.LegendModel.ContentType;
                    _this.viewTagName = "LEGEND";
                    return _this;
                }
                LegendAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.LegendModel();
                };
                return LegendAdapter;
            }(View.ViewAdapterBase));
            View.LegendAdapter = LegendAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var ListItemAdapter = (function (_super) {
                __extends(ListItemAdapter, _super);
                function ListItemAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "list item adapter";
                    _this.modelContentType = Editor.Model.ListItemModel.ContentType;
                    _this.viewTagName = "LI";
                    return _this;
                }
                ListItemAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.ListItemModel();
                };
                ListItemAdapter.prototype.applyCustomAttributes = function (model, view) {
                    if (model.value === null) {
                        view.removeAttribute("value");
                    }
                    else {
                        view.value = model.value;
                    }
                };
                ListItemAdapter.prototype.parseCustomAttributes = function (model, view) {
                    if (view.hasAttribute("value")) {
                        model.value = view.value;
                    }
                };
                return ListItemAdapter;
            }(View.ViewAdapterBase));
            View.ListItemAdapter = ListItemAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var OptionAdapter = (function (_super) {
                __extends(OptionAdapter, _super);
                function OptionAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "option adapter";
                    _this.modelContentType = Editor.Model.OptionModel.ContentType;
                    _this.viewTagName = "OPTION";
                    return _this;
                }
                OptionAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.OptionModel();
                };
                OptionAdapter.prototype.applyCustomAttributes = function (model, view) {
                    if (model.isDisabled === null) {
                        view.removeAttribute("disabled");
                    }
                    else {
                        view.disabled = model.isDisabled;
                    }
                    if (model.label === null) {
                        view.removeAttribute("label");
                    }
                    else {
                        view.label = model.label;
                    }
                    if (model.value === null) {
                        view.removeAttribute("value");
                    }
                    else {
                        view.value = model.value;
                    }
                    if (model.isSelected === null) {
                        view.removeAttribute("selected");
                    }
                    else {
                        view.selected = model.isSelected;
                    }
                };
                OptionAdapter.prototype.parseCustomAttributes = function (model, view) {
                    if (view.hasAttribute("disabled")) {
                        model.isDisabled = view.disabled;
                    }
                    if (view.hasAttribute("label")) {
                        model.label = view.label;
                    }
                    if (view.hasAttribute("value")) {
                        model.value = view.value;
                    }
                    if (view.hasAttribute("selected")) {
                        model.isSelected = view.selected;
                    }
                };
                return OptionAdapter;
            }(View.ViewAdapterBase));
            View.OptionAdapter = OptionAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var OptionGroupAdapter = (function (_super) {
                __extends(OptionGroupAdapter, _super);
                function OptionGroupAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "option group adapter";
                    _this.modelContentType = Editor.Model.OptionGroupModel.ContentType;
                    _this.viewTagName = "OPTGROUP";
                    return _this;
                }
                OptionGroupAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.OptionGroupModel();
                };
                OptionGroupAdapter.prototype.applyCustomAttributes = function (model, view) {
                    if (model.isDisabled === null) {
                        view.removeAttribute("disabled");
                    }
                    else {
                        view.disabled = model.isDisabled;
                    }
                    if (model.label === null) {
                        view.removeAttribute("label");
                    }
                    else {
                        view.label = model.label;
                    }
                };
                OptionGroupAdapter.prototype.parseCustomAttributes = function (model, view) {
                    if (view.hasAttribute("disabled")) {
                        model.isDisabled = view.disabled;
                    }
                    if (view.hasAttribute("label")) {
                        model.label = view.label;
                    }
                };
                return OptionGroupAdapter;
            }(View.ViewAdapterBase));
            View.OptionGroupAdapter = OptionGroupAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var SourceAdapter = (function (_super) {
                __extends(SourceAdapter, _super);
                function SourceAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "source adapter";
                    _this.modelContentType = Editor.Model.SourceModel.ContentType;
                    _this.viewTagName = "SOURCE";
                    return _this;
                }
                SourceAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.SourceModel();
                };
                SourceAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.type = model.type;
                    if (model.sizes.length === 0) {
                        view.removeAttribute("sizes");
                    }
                    else {
                        view.sizes = model.sizes.join(",");
                    }
                    view.src = model.source;
                    if (model.sourceSet.length === 0) {
                        view.removeAttribute("srcset");
                    }
                    else {
                        view.srcset = model.sourceSet.join(",");
                    }
                };
                SourceAdapter.prototype.parseCustomAttributes = function (model, view) {
                    model.source = view.src;
                    if (view.hasAttribute("srcset")) {
                        (_a = model.sourceSet).push.apply(_a, view.srcset.split(","));
                    }
                    if (view.hasAttribute("sizes")) {
                        (_b = model.sizes).push.apply(_b, view.sizes.split(","));
                    }
                    var _a, _b;
                };
                return SourceAdapter;
            }(View.ViewAdapterBase));
            View.SourceAdapter = SourceAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var SummaryModel = (function (_super) {
                __extends(SummaryModel, _super);
                function SummaryModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.acceptsTypes = [SummaryModel.ContentType, Model.CommonModelTypes.PhrasingContent];
                    return _this;
                }
                Object.defineProperty(SummaryModel.prototype, "contentType", {
                    get: function () {
                        return SummaryModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                SummaryModel.prototype.canAccept = function (index, child) {
                    if (child.contentType === SummaryModel.ContentType) {
                        if (!(this.children.length === 0 || (this.children[0].contentType !== SummaryModel.ContentType && index === 0))) {
                            return false;
                        }
                    }
                    return _super.prototype.canAccept.call(this, index, child);
                };
                SummaryModel.ContentType = Model.CommonModelTypes.UnclassifiedContent + ".summary";
                return SummaryModel;
            }(Model.ChildContentModelBase));
            Model.SummaryModel = SummaryModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var SummaryAdapter = (function (_super) {
                __extends(SummaryAdapter, _super);
                function SummaryAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "summary adapter";
                    _this.modelContentType = Editor.Model.SummaryModel.ContentType;
                    _this.viewTagName = "SUMMARY";
                    return _this;
                }
                SummaryAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.SummaryModel();
                };
                return SummaryAdapter;
            }(View.ViewAdapterBase));
            View.SummaryAdapter = SummaryAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var TableBodyAdapter = (function (_super) {
                __extends(TableBodyAdapter, _super);
                function TableBodyAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "table body adapter";
                    _this.modelContentType = Editor.Model.TableBodyModel.ContentType;
                    _this.viewTagName = "TBODY";
                    return _this;
                }
                TableBodyAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.TableBodyModel();
                };
                return TableBodyAdapter;
            }(View.ViewAdapterBase));
            View.TableBodyAdapter = TableBodyAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var TableCaptionAdapter = (function (_super) {
                __extends(TableCaptionAdapter, _super);
                function TableCaptionAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "table caption adapter";
                    _this.modelContentType = Editor.Model.TableCaptionModel.ContentType;
                    _this.viewTagName = "CAPTION";
                    return _this;
                }
                TableCaptionAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.TableCaptionModel();
                };
                return TableCaptionAdapter;
            }(View.ViewAdapterBase));
            View.TableCaptionAdapter = TableCaptionAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var TableCellAdapter = (function (_super) {
                __extends(TableCellAdapter, _super);
                function TableCellAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "table cell adapter";
                    _this.modelContentType = Editor.Model.TableCellModel.ContentType;
                    _this.viewTagName = "TD";
                    return _this;
                }
                TableCellAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.TableCellModel();
                };
                TableCellAdapter.prototype.applyCustomAttributes = function (model, view) {
                    if (model.columnSpan === null) {
                        view.removeAttribute("colspan");
                    }
                    else {
                        view.colSpan = model.columnSpan;
                    }
                    if (model.rowSpan === null) {
                        view.removeAttribute("rowspan");
                    }
                    else {
                        view.rowSpan = model.rowSpan;
                    }
                };
                TableCellAdapter.prototype.parseCustomAttributes = function (model, view) {
                    if (view.hasAttribute("colspan")) {
                        model.columnSpan = view.colSpan;
                    }
                    if (view.hasAttribute("rowspan")) {
                        model.rowSpan = view.rowSpan;
                    }
                };
                return TableCellAdapter;
            }(View.ViewAdapterBase));
            View.TableCellAdapter = TableCellAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var TableColumnAdapter = (function (_super) {
                __extends(TableColumnAdapter, _super);
                function TableColumnAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "table column adapter";
                    _this.modelContentType = Editor.Model.TableColumnModel.ContentType;
                    _this.viewTagName = "COL";
                    return _this;
                }
                TableColumnAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.TableColumnModel();
                };
                TableColumnAdapter.prototype.applyCustomAttributes = function (model, view) {
                    if (model.span === null) {
                        view.removeAttribute("span");
                    }
                    else {
                        view.span = model.span;
                    }
                };
                TableColumnAdapter.prototype.parseCustomAttributes = function (model, view) {
                    if (view.hasAttribute("span")) {
                        model.span = view.span;
                    }
                };
                return TableColumnAdapter;
            }(View.ViewAdapterBase));
            View.TableColumnAdapter = TableColumnAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var TableColumnGroupAdapter = (function (_super) {
                __extends(TableColumnGroupAdapter, _super);
                function TableColumnGroupAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "table column group adapter";
                    _this.modelContentType = Editor.Model.TableColumnGroupModel.ContentType;
                    _this.viewTagName = "COLGROUP";
                    return _this;
                }
                TableColumnGroupAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.TableColumnGroupModel();
                };
                TableColumnGroupAdapter.prototype.applyCustomAttributes = function (model, view) {
                    if (model.span === null) {
                        view.removeAttribute("span");
                    }
                    else {
                        view.span = model.span;
                    }
                };
                TableColumnGroupAdapter.prototype.parseCustomAttributes = function (model, view) {
                    if (view.hasAttribute("span")) {
                        model.span = view.span;
                    }
                };
                return TableColumnGroupAdapter;
            }(View.ViewAdapterBase));
            View.TableColumnGroupAdapter = TableColumnGroupAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var TableFooterAdapter = (function (_super) {
                __extends(TableFooterAdapter, _super);
                function TableFooterAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "table footer adapter";
                    _this.modelContentType = Editor.Model.TableFooterModel.ContentType;
                    _this.viewTagName = "TFOOT";
                    return _this;
                }
                TableFooterAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.TableFooterModel();
                };
                return TableFooterAdapter;
            }(View.ViewAdapterBase));
            View.TableFooterAdapter = TableFooterAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var TableHeaderAdapter = (function (_super) {
                __extends(TableHeaderAdapter, _super);
                function TableHeaderAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "table header adapter";
                    _this.modelContentType = Editor.Model.TableHeaderModel.ContentType;
                    _this.viewTagName = "THEAD";
                    return _this;
                }
                TableHeaderAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.TableHeaderModel();
                };
                return TableHeaderAdapter;
            }(View.ViewAdapterBase));
            View.TableHeaderAdapter = TableHeaderAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var TableHeaderCellAdapter = (function (_super) {
                __extends(TableHeaderCellAdapter, _super);
                function TableHeaderCellAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "table header cell adapter";
                    _this.modelContentType = Editor.Model.TableHeaderCellModel.ContentType;
                    _this.viewTagName = "TH";
                    return _this;
                }
                TableHeaderCellAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.TableHeaderCellModel();
                };
                TableHeaderCellAdapter.prototype.applyCustomAttributes = function (model, view) {
                    if (model.columnSpan === null) {
                        view.removeAttribute("colspan");
                    }
                    else {
                        view.colSpan = model.columnSpan;
                    }
                    if (model.rowSpan === null) {
                        view.removeAttribute("rowspan");
                    }
                    else {
                        view.rowSpan = model.rowSpan;
                    }
                    if (model.scope === null) {
                        view.removeAttribute("scope");
                    }
                    else {
                        view.scope = model.scope;
                    }
                    if (model.abbreviation === null) {
                        view.removeAttribute("abbr");
                    }
                    else {
                        view.abbr = model.abbreviation;
                    }
                };
                TableHeaderCellAdapter.prototype.parseCustomAttributes = function (model, view) {
                    if (view.hasAttribute("colspan")) {
                        model.columnSpan = view.colSpan;
                    }
                    if (view.hasAttribute("rowspan")) {
                        model.rowSpan = view.rowSpan;
                    }
                    if (view.hasAttribute("scope")) {
                        model.scope = view.scope;
                    }
                    if (view.hasAttribute("abbr")) {
                        model.abbreviation = view.abbr;
                    }
                };
                return TableHeaderCellAdapter;
            }(View.ViewAdapterBase));
            View.TableHeaderCellAdapter = TableHeaderCellAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var TableRowAdapter = (function (_super) {
                __extends(TableRowAdapter, _super);
                function TableRowAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.adapterDisplayName = "table row adapter";
                    _this.modelContentType = Editor.Model.TableRowModel.ContentType;
                    _this.viewTagName = "TR";
                    return _this;
                }
                TableRowAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.TableRowModel();
                };
                return TableRowAdapter;
            }(View.ViewAdapterBase));
            View.TableRowAdapter = TableRowAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var GoogleMapsModel = (function (_super) {
                __extends(GoogleMapsModel, _super);
                function GoogleMapsModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.embedCode = "<iframe width=\"100%\" height=\"430\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" src=\"https://maps.google.com/maps/ms?msa=0&msid=201595218173101483670.0004d79a6535b6f36505c&ie=UTF8&t=m&ll=51.500462,-0.082226&spn=0.004675,0.00912&z=16&output=embed\"></iframe>";
                    _this.height = "15rem";
                    _this.width = "100%";
                    _this.isInteractive = true;
                    _this.acceptsTypes = [Model.CommonModelTypes.FlowContent];
                    return _this;
                }
                Object.defineProperty(GoogleMapsModel.prototype, "contentType", {
                    get: function () {
                        return GoogleMapsModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                GoogleMapsModel.ContentType = Model.CommonModelTypes.EmbeddedContent + ".googlemaps";
                return GoogleMapsModel;
            }(Model.ChildContentModelBase));
            Model.GoogleMapsModel = GoogleMapsModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var GoogleMapsAdapter = (function (_super) {
                __extends(GoogleMapsAdapter, _super);
                function GoogleMapsAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.priority = 1000;
                    _this.adapterDisplayName = "google maps adapter";
                    _this.modelContentType = Editor.Model.GoogleMapsModel.ContentType;
                    _this.viewTagName = "IFRAME";
                    return _this;
                }
                GoogleMapsAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.GoogleMapsModel();
                };
                GoogleMapsAdapter.prototype.canParseView = function (element) {
                    return _super.prototype.canParseView.call(this, element) && element.hasAttribute("data-googlemaps-embedcode");
                };
                GoogleMapsAdapter.prototype.applyCustomAttributes = function (model, view) {
                    view.allowFullscreen = true;
                    view.frameBorder = "0";
                    view.scrolling = "no";
                    view.marginHeight = "0";
                    view.marginWidth = "0";
                    view.setAttribute("data-googlemaps-embedcode", model.embedCode);
                    view.src = this.getSrcFromEmbedCode(model.embedCode);
                    view.style.width = model.width;
                    view.style.height = model.height;
                };
                GoogleMapsAdapter.prototype.parseCustomAttributes = function (model, view) {
                    model.embedCode = view.getAttribute("data-googlemaps-embedcode") || "";
                    model.height = view.style.height || "15rem";
                    model.width = view.style.width || "100%";
                };
                GoogleMapsAdapter.prototype.getSrcFromEmbedCode = function (embedCode) {
                    var mappedUri = "";
                    var index = embedCode.indexOf("src=\"");
                    if (index >= 0) {
                        index += 5;
                        var endIndex = embedCode.indexOf("\"", index);
                        mappedUri = embedCode.substr(index, endIndex - index);
                    }
                    return mappedUri;
                };
                return GoogleMapsAdapter;
            }(View.ViewAdapterBase));
            View.GoogleMapsAdapter = GoogleMapsAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            function registerDefaultAdapters(viewEngine) {
                viewEngine.addViewAdapter(Editor.Model.AudioModel.ContentType, new View.AudioAdapter());
                viewEngine.addViewAdapter(Editor.Model.CanvasModel.ContentType, new View.CanvasAdapter());
                viewEngine.addViewAdapter(Editor.Model.ImageModel.ContentType, new View.ImageAdapter());
                viewEngine.addViewAdapter(Editor.Model.InlineFrameModel.ContentType, new View.InlineFrameAdapter());
                viewEngine.addViewAdapter(Editor.Model.VideoModel.ContentType, new View.VideoAdapter());
                viewEngine.addViewAdapter(Editor.Model.AddressModel.ContentType, new View.AddressAdapter());
                viewEngine.addViewAdapter(Editor.Model.BlockQuoteModel.ContentType, new View.BlockQuoteAdapter());
                viewEngine.addViewAdapter(Editor.Model.DescriptionListModel.ContentType, new View.DescriptionListAdapter());
                viewEngine.addViewAdapter(Editor.Model.DetailsModel.ContentType, new View.DetailsAdapter());
                viewEngine.addViewAdapter(Editor.Model.DivisionModel.ContentType, new View.DivisionAdapter());
                viewEngine.addViewAdapter(Editor.Model.FieldSetModel.ContentType, new View.FieldSetAdapter());
                viewEngine.addViewAdapter(Editor.Model.FigureModel.ContentType, new View.FigureAdapter());
                viewEngine.addViewAdapter(Editor.Model.FooterModel.ContentType, new View.FooterAdapter());
                viewEngine.addViewAdapter(Editor.Model.FormModel.ContentType, new View.FormAdapter());
                viewEngine.addViewAdapter(Editor.Model.HeaderModel.ContentType, new View.HeaderAdapter());
                viewEngine.addViewAdapter(Editor.Model.MainModel.ContentType, new View.MainAdapter());
                viewEngine.addViewAdapter(Editor.Model.OrderedListModel.ContentType, new View.OrderedListAdapter());
                viewEngine.addViewAdapter(Editor.Model.ParagraphModel.ContentType, new View.ParagraphAdapter());
                viewEngine.addViewAdapter(Editor.Model.PreformattedTextModel.ContentType, new View.PreformattedTextAdapter());
                viewEngine.addViewAdapter(Editor.Model.TableModel.ContentType, new View.TableAdapter());
                viewEngine.addViewAdapter(Editor.Model.UnorderedListModel.ContentType, new View.UnorderedListAdapter());
                viewEngine.addViewAdapter(Editor.Model.HeadingLevel1Model.ContentType, new View.HeadingLevel1Adapter());
                viewEngine.addViewAdapter(Editor.Model.HeadingLevel2Model.ContentType, new View.HeadingLevel2Adapter());
                viewEngine.addViewAdapter(Editor.Model.HeadingLevel3Model.ContentType, new View.HeadingLevel3Adapter());
                viewEngine.addViewAdapter(Editor.Model.HeadingLevel4Model.ContentType, new View.HeadingLevel4Adapter());
                viewEngine.addViewAdapter(Editor.Model.HeadingLevel5Model.ContentType, new View.HeadingLevel5Adapter());
                viewEngine.addViewAdapter(Editor.Model.HeadingLevel6Model.ContentType, new View.HeadingLevel6Adapter());
                viewEngine.addViewAdapter(Editor.Model.AbbreviationModel.ContentType, new View.AbbreviationAdapter());
                viewEngine.addViewAdapter(Editor.Model.AnchorModel.ContentType, new View.AnchorAdapter());
                viewEngine.addViewAdapter(Editor.Model.AreaModel.ContentType, new View.AreaAdapter());
                viewEngine.addViewAdapter(Editor.Model.BidirectionalIsolationModel.ContentType, new View.BidirectionalIsolationAdapter());
                viewEngine.addViewAdapter(Editor.Model.BidirectionalTextOverrideModel.ContentType, new View.BidirectionalTextOverrideAdapter());
                viewEngine.addViewAdapter(Editor.Model.BreakModel.ContentType, new View.BreakAdapter());
                viewEngine.addViewAdapter(Editor.Model.BringToAttentionModel.ContentType, new View.BringToAttentionAdapter());
                viewEngine.addViewAdapter(Editor.Model.ButtonModel.ContentType, new View.ButtonAdapter());
                viewEngine.addViewAdapter(Editor.Model.CiteModel.ContentType, new View.CiteAdapter());
                viewEngine.addViewAdapter(Editor.Model.CodeModel.ContentType, new View.CodeAdapter());
                viewEngine.addViewAdapter(Editor.Model.DataListModel.ContentType, new View.DataListAdapter());
                viewEngine.addViewAdapter(Editor.Model.DataModel.ContentType, new View.DataAdapter());
                viewEngine.addViewAdapter(Editor.Model.DefinitionModel.ContentType, new View.DefinitionAdapter());
                viewEngine.addViewAdapter(Editor.Model.DeleteModel.ContentType, new View.DeleteAdapter());
                viewEngine.addViewAdapter(Editor.Model.EmphasisModel.ContentType, new View.EmphasisAdapter());
                viewEngine.addViewAdapter(Editor.Model.InputButtonModel.ContentType, new View.InputButtonAdapter());
                viewEngine.addViewAdapter(Editor.Model.InputCheckboxModel.ContentType, new View.InputCheckboxAdapter());
                viewEngine.addViewAdapter(Editor.Model.InputColorModel.ContentType, new View.InputColorAdapter());
                viewEngine.addViewAdapter(Editor.Model.InputDateModel.ContentType, new View.InputDateAdapter());
                viewEngine.addViewAdapter(Editor.Model.InputEmailModel.ContentType, new View.InputEmailAdapter());
                viewEngine.addViewAdapter(Editor.Model.InputFileModel.ContentType, new View.InputFileAdapter());
                viewEngine.addViewAdapter(Editor.Model.InputImageModel.ContentType, new View.InputImageAdapter());
                viewEngine.addViewAdapter(Editor.Model.InputMonthModel.ContentType, new View.InputMonthAdapter());
                viewEngine.addViewAdapter(Editor.Model.InputNumberModel.ContentType, new View.InputNumberAdapter());
                viewEngine.addViewAdapter(Editor.Model.InputPasswordModel.ContentType, new View.InputPasswordAdapter());
                viewEngine.addViewAdapter(Editor.Model.InputRadioModel.ContentType, new View.InputRadioAdapter());
                viewEngine.addViewAdapter(Editor.Model.InputRangeModel.ContentType, new View.InputRangeAdapter());
                viewEngine.addViewAdapter(Editor.Model.InputSearchModel.ContentType, new View.InputSearchAdapter());
                viewEngine.addViewAdapter(Editor.Model.InputSubmitModel.ContentType, new View.InputSubmitAdapter());
                viewEngine.addViewAdapter(Editor.Model.InputTelephoneModel.ContentType, new View.InputTelephoneAdapter());
                viewEngine.addViewAdapter(Editor.Model.InputTextModel.ContentType, new View.InputTextAdapter());
                viewEngine.addViewAdapter(Editor.Model.InputTimeModel.ContentType, new View.InputTimeAdapter());
                viewEngine.addViewAdapter(Editor.Model.InputUrlModel.ContentType, new View.InputUrlAdapter());
                viewEngine.addViewAdapter(Editor.Model.InputWeekModel.ContentType, new View.InputWeekAdapter());
                viewEngine.addViewAdapter(Editor.Model.InsertedModel.ContentType, new View.InsertedAdapter());
                viewEngine.addViewAdapter(Editor.Model.KeyboardInputModel.ContentType, new View.KeyboardInputAdapter());
                viewEngine.addViewAdapter(Editor.Model.LabelModel.ContentType, new View.LabelAdapter());
                viewEngine.addViewAdapter(Editor.Model.MapModel.ContentType, new View.MapAdapter());
                viewEngine.addViewAdapter(Editor.Model.MarkModel.ContentType, new View.MarkAdapter());
                viewEngine.addViewAdapter(Editor.Model.MeterModel.ContentType, new View.MeterAdapter());
                viewEngine.addViewAdapter(Editor.Model.OutputModel.ContentType, new View.OutputAdapter());
                viewEngine.addViewAdapter(Editor.Model.ProgressModel.ContentType, new View.ProgressAdapter());
                viewEngine.addViewAdapter(Editor.Model.QuoteModel.ContentType, new View.QuoteAdapter());
                viewEngine.addViewAdapter(Editor.Model.RubyModel.ContentType, new View.RubyAdapter());
                viewEngine.addViewAdapter(Editor.Model.SampleModel.ContentType, new View.SampleAdapter());
                viewEngine.addViewAdapter(Editor.Model.SelectModel.ContentType, new View.SelectAdapter());
                viewEngine.addViewAdapter(Editor.Model.SetOffModel.ContentType, new View.SetOffAdapter());
                viewEngine.addViewAdapter(Editor.Model.SmallTextModel.ContentType, new View.SmallTextAdapter());
                viewEngine.addViewAdapter(Editor.Model.SpanModel.ContentType, new View.SpanAdapter());
                viewEngine.addViewAdapter(Editor.Model.StrikethroughModel.ContentType, new View.StrikethroughAdapter());
                viewEngine.addViewAdapter(Editor.Model.StrongModel.ContentType, new View.StrongAdapter());
                viewEngine.addViewAdapter(Editor.Model.SubscriptModel.ContentType, new View.SubscriptAdapter());
                viewEngine.addViewAdapter(Editor.Model.SuperscriptModel.ContentType, new View.SuperscriptAdapter());
                viewEngine.addViewAdapter(Editor.Model.TextAreaModel.ContentType, new View.TextAreaAdapter());
                viewEngine.addViewAdapter(Editor.Model.TimeModel.ContentType, new View.TimeAdapter());
                viewEngine.addViewAdapter(Editor.Model.VariableModel.ContentType, new View.VariableAdapter());
                viewEngine.addViewAdapter(Editor.Model.WordBreakModel.ContentType, new View.WordBreakAdapter());
                viewEngine.addViewAdapter(Editor.Model.ArticleModel.ContentType, new View.ArticleAdapter());
                viewEngine.addViewAdapter(Editor.Model.AsideModel.ContentType, new View.AsideAdapter());
                viewEngine.addViewAdapter(Editor.Model.NavigationModel.ContentType, new View.NavigationAdapter());
                viewEngine.addViewAdapter(Editor.Model.SectionModel.ContentType, new View.SectionAdapter());
                viewEngine.addViewAdapter(Editor.Model.DescriptionListDefinitionModel.ContentType, new View.DescriptionListDefinitionAdapter());
                viewEngine.addViewAdapter(Editor.Model.DescriptionListTermModel.ContentType, new View.DescriptionListTermAdapter());
                viewEngine.addViewAdapter(Editor.Model.FigureCaptionModel.ContentType, new View.FigureCaptionAdapter());
                viewEngine.addViewAdapter(Editor.Model.LegendModel.ContentType, new View.LegendAdapter());
                viewEngine.addViewAdapter(Editor.Model.ListItemModel.ContentType, new View.ListItemAdapter());
                viewEngine.addViewAdapter(Editor.Model.OptionModel.ContentType, new View.OptionAdapter());
                viewEngine.addViewAdapter(Editor.Model.OptionGroupModel.ContentType, new View.OptionGroupAdapter());
                viewEngine.addViewAdapter(Editor.Model.SummaryModel.ContentType, new View.SummaryAdapter());
                viewEngine.addViewAdapter(Editor.Model.TableBodyModel.ContentType, new View.TableBodyAdapter());
                viewEngine.addViewAdapter(Editor.Model.TableCaptionModel.ContentType, new View.TableCaptionAdapter());
                viewEngine.addViewAdapter(Editor.Model.TableCellModel.ContentType, new View.TableCellAdapter());
                viewEngine.addViewAdapter(Editor.Model.TableColumnModel.ContentType, new View.TableColumnAdapter());
                viewEngine.addViewAdapter(Editor.Model.TableColumnGroupModel.ContentType, new View.TableColumnGroupAdapter());
                viewEngine.addViewAdapter(Editor.Model.TableFooterModel.ContentType, new View.TableFooterAdapter());
                viewEngine.addViewAdapter(Editor.Model.TableHeaderModel.ContentType, new View.TableHeaderAdapter());
                viewEngine.addViewAdapter(Editor.Model.TableHeaderCellModel.ContentType, new View.TableHeaderCellAdapter());
                viewEngine.addViewAdapter(Editor.Model.TableRowModel.ContentType, new View.TableRowAdapter());
                viewEngine.addViewAdapter(Editor.Model.GoogleMapsModel.ContentType, new View.GoogleMapsAdapter());
            }
            View.registerDefaultAdapters = registerDefaultAdapters;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var CommandBatch = (function () {
                function CommandBatch(commands) {
                    this.commands = commands;
                }
                CommandBatch.prototype.execute = function () {
                    var modelsToRender = [];
                    var isNestedBatch = CommandBatch.isExecutingBatch;
                    CommandBatch.isExecutingBatch = true;
                    try {
                        modelsToRender.length = 0;
                        this.commands.forEach(function (c) { return modelsToRender.push.apply(modelsToRender, c.execute()); });
                    }
                    catch (e) {
                        modelsToRender = this.pruneModels(modelsToRender);
                        if (isNestedBatch) {
                            throw e;
                        }
                        else {
                            this.undo();
                        }
                    }
                    finally {
                        if (!isNestedBatch) {
                            CommandBatch.isExecutingBatch = false;
                        }
                    }
                    modelsToRender = this.pruneModels(modelsToRender);
                    return modelsToRender;
                };
                CommandBatch.prototype.undo = function () {
                    var modelsToRender = [];
                    var isNestedBatch = CommandBatch.isExecutingBatch;
                    CommandBatch.isExecutingBatch = true;
                    try {
                        var reversedCommands = this.commands.reverse();
                        reversedCommands.forEach(function (c) { return modelsToRender.push.apply(modelsToRender, c.undo()); });
                    }
                    catch (e) {
                        modelsToRender = this.pruneModels(modelsToRender);
                        if (isNestedBatch) {
                            throw e;
                        }
                        else {
                            this.execute();
                        }
                    }
                    finally {
                        if (!isNestedBatch) {
                            CommandBatch.isExecutingBatch = false;
                        }
                    }
                    modelsToRender = this.pruneModels(modelsToRender);
                    return modelsToRender;
                };
                CommandBatch.prototype.pruneModels = function (modelsToRender) {
                    var prunedModels = [];
                    var candidateIdMap = new Map();
                    modelsToRender.forEach(function (m) {
                        candidateIdMap.set(m.id, m);
                    });
                    modelsToRender.forEach(function (m) {
                        if (!m.anyParent(function (p) { return candidateIdMap.has(p.id); }, false)) {
                            prunedModels.push(m);
                        }
                    });
                    return prunedModels;
                };
                CommandBatch.isExecutingBatch = false;
                return CommandBatch;
            }());
            Model.CommandBatch = CommandBatch;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var BackspaceCommand = (function () {
                function BackspaceCommand(editor, selection) {
                    this.editor = editor;
                    this.selection = selection;
                    this.commandType = "application/vnd.endjin.editor.documentcommand.backspace";
                }
                BackspaceCommand.prototype.canExecute = function () {
                    return false;
                };
                BackspaceCommand.prototype.execute = function () {
                    return [];
                };
                BackspaceCommand.prototype.undo = function () {
                    return [];
                };
                return BackspaceCommand;
            }());
            Model.BackspaceCommand = BackspaceCommand;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var NewlineCommand = (function () {
                function NewlineCommand(editor, selection) {
                    this.editor = editor;
                    this.selection = selection;
                    this.commandType = "application/vnd.endjin.editor.documentcommand.newline";
                }
                NewlineCommand.prototype.canExecute = function () {
                    if (this.selection === null) {
                        return false;
                    }
                    if (!this.selection.selectionScope.canRemoveSelection(this.selection)) {
                        return false;
                    }
                    var collapsedSelection = this.selection.collapseToStart();
                    return collapsedSelection.selectionScope.canSplit(collapsedSelection);
                };
                NewlineCommand.prototype.execute = function () {
                    if (!this.canExecute()) {
                        return [];
                    }
                    if (this.selection === null) {
                        return [];
                    }
                    var deletedModels = this.selection.selectionScope.removeSelection(this.selection);
                    (_a = this.editor).destroyModels.apply(_a, deletedModels);
                    var collapsedSelection = this.selection.collapseToStart();
                    return collapsedSelection.selectionScope.split(collapsedSelection);
                    var _a;
                };
                NewlineCommand.prototype.undo = function () {
                    throw new Error("Not implemented.");
                };
                return NewlineCommand;
            }());
            Model.NewlineCommand = NewlineCommand;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var DeleteCommand = (function () {
                function DeleteCommand(editor, selection) {
                    this.editor = editor;
                    this.selection = selection;
                    this.commandType = "application/vnd.endjin.editor.documentcommand.delete";
                }
                DeleteCommand.prototype.canExecute = function () {
                    return false;
                };
                DeleteCommand.prototype.execute = function () {
                    return [];
                };
                DeleteCommand.prototype.undo = function () {
                    return [];
                };
                return DeleteCommand;
            }());
            Model.DeleteCommand = DeleteCommand;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InsertTextCommand = (function () {
                function InsertTextCommand(editor, selection, textRun) {
                    this.editor = editor;
                    this.selection = selection;
                    this.textRun = textRun;
                    this.commandType = "application/vnd.endjin.editor.documentcommand.inserttext";
                    this.originalTextRun = "";
                }
                InsertTextCommand.prototype.canExecute = function () {
                    if (this.selection === null) {
                        return false;
                    }
                    return true;
                };
                InsertTextCommand.prototype.execute = function () {
                    if (this.selection === null) {
                        return [];
                    }
                    var insertedSelection = null;
                    var affectedModels = [];
                    if (this.selection.isCollapsed) {
                        insertedSelection = this.selection.selectionEnd.model.acceptChild(this.selection.selectionEnd.index, new Model.TextModel(this.textRun));
                        if (insertedSelection !== null) {
                            affectedModels.push(insertedSelection.selectionScope);
                        }
                    }
                    else {
                        this.selection.selectionScope.removeSelection(this.selection);
                        insertedSelection = this.selection.selectionStart.model.acceptChild(this.selection.selectionStart.index, new Model.TextModel(this.textRun));
                        affectedModels.push(this.selection.selectionScope);
                    }
                    if (insertedSelection !== null) {
                        this.editor.selection = new Model.Selection(insertedSelection.selectionScope, insertedSelection.selectionEnd, insertedSelection.selectionEnd);
                    }
                    return affectedModels;
                };
                InsertTextCommand.prototype.undo = function () {
                    throw new Error("Not implemented.");
                };
                return InsertTextCommand;
            }());
            Model.InsertTextCommand = InsertTextCommand;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var TypingHandler = (function () {
                function TypingHandler() {
                    this.subscription = null;
                }
                TypingHandler.prototype.attachToView = function (view) {
                    var _this = this;
                    this.subscription = Rx.Observable.fromEvent(view, "keydown").subscribe(function (e) {
                        if (_this.isSafeKey(e.keyCode, e.altKey, e.shiftKey, e.ctrlKey, e.metaKey)) {
                            return;
                        }
                        e.preventDefault();
                        e.stopPropagation();
                        var keypress = new Editor.Model.Keypress(e.keyCode, e.shiftKey, e.altKey, e.ctrlKey, e.metaKey);
                        if (_this.editor.keyboardShortcuts.dispatchKeyboardShortcut(keypress)) {
                            return;
                        }
                        if (e.keyCode === 13) {
                            _this.editor.executeCommand(new Editor.Model.NewlineCommand(_this.editor, _this.editor.selection));
                            return;
                        }
                        if (e.keyCode === 8) {
                            _this.editor.executeCommand(new Editor.Model.BackspaceCommand(_this.editor, _this.editor.selection));
                        }
                        if (e.keyCode === 46) {
                            _this.editor.executeCommand(new Editor.Model.DeleteCommand(_this.editor, _this.editor.selection));
                        }
                        if (e.keyCode === 9 || e.keyCode === 27) {
                            return;
                        }
                        _this.editor.executeCommand(new Editor.Model.InsertTextCommand(_this.editor, _this.editor.selection, e.key));
                    });
                };
                TypingHandler.prototype.destroy = function () {
                    if (this.subscription !== null) {
                        this.subscription.dispose();
                    }
                };
                TypingHandler.prototype.isSafeKey = function (keyCode, altKey, shiftKey, controlKey, metaKey) {
                    var result = false;
                    result = result || keyCode >= 33 && keyCode <= 40;
                    result = result || controlKey && (keyCode === 67 || keyCode === 86 || keyCode === 88);
                    result = result || (keyCode >= 16 && keyCode <= 20) || keyCode === 91 || keyCode === 92 || keyCode === 93;
                    result = result || keyCode >= 112 && keyCode <= 123;
                    result = result || keyCode === 144 || keyCode === 145;
                    return result;
                };
                return TypingHandler;
            }());
            View.TypingHandler = TypingHandler;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var ClipboardHandler = (function () {
                function ClipboardHandler() {
                    this.cutSubscription = null;
                    this.copySubscription = null;
                    this.pasteSubscription = null;
                    this.executingOperation = false;
                }
                ClipboardHandler.prototype.attachToView = function (view) {
                    var _this = this;
                    this.cutSubscription = Rx.Observable.fromEvent(view, "cut").subscribe(function (e) {
                        if (_this.executingOperation) {
                            return;
                        }
                        e.preventDefault();
                        e.stopPropagation();
                        _this.executingOperation = true;
                        document.execCommand("copy");
                        window.setTimeout(function () {
                            _this.executingOperation = false;
                        }, 20);
                    });
                    this.copySubscription = Rx.Observable.fromEvent(view, "copy").subscribe(function (e) {
                        if (_this.executingOperation) {
                            return;
                        }
                        e.preventDefault();
                        e.stopPropagation();
                        _this.executingOperation = true;
                        document.execCommand("copy");
                        window.setTimeout(function () {
                            _this.executingOperation = false;
                        }, 20);
                    });
                    this.pasteSubscription = Rx.Observable.fromEvent(view, "paste").subscribe(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    });
                };
                ClipboardHandler.prototype.destroy = function () {
                    if (this.cutSubscription !== null) {
                        this.cutSubscription.dispose();
                    }
                };
                return ClipboardHandler;
            }());
            View.ClipboardHandler = ClipboardHandler;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            function registerDefaultHandlers(viewEngine, document) {
                viewEngine.addViewEventHandler(new View.TypingHandler(), document.root);
                viewEngine.addViewEventHandler(new View.ClipboardHandler(), document.root);
            }
            View.registerDefaultHandlers = registerDefaultHandlers;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var EditorImplementation = (function () {
            function EditorImplementation(rootView, initializeBeforeParse, initializeAfterRender, document) {
                this.rootView = rootView;
                this.executingBatch = false;
                this.queuedSelection = null;
                this.keyboardShortcuts = new Editor.Model.KeyboardShortcutEngine(this);
                if (rootView.hasAttribute("data-endjin-editor")) {
                    throw new Error("There is already an editor for the view.");
                }
                this.viewEngine = new Editor.View.ViewEngine(this);
                Editor.View.registerDefaultAdapters(this.viewEngine);
                if (initializeBeforeParse) {
                    initializeBeforeParse(this.viewEngine);
                }
                this.document = document || this.createDocument();
                this.render();
                Editor.View.registerDefaultHandlers(this.viewEngine, this.document);
                if (initializeAfterRender) {
                    initializeAfterRender(this.viewEngine, this.document);
                }
                EditorImplementation.editors.push(this);
            }
            Object.defineProperty(EditorImplementation.prototype, "selection", {
                get: function () {
                    return this.viewEngine.getSelection();
                },
                set: function (value) {
                    if (this.executingBatch) {
                        this.queuedSelection = value;
                    }
                    else {
                        this.viewEngine.setSelection(value);
                    }
                },
                enumerable: true,
                configurable: true
            });
            EditorImplementation.prototype.destroy = function () {
                var editorIndex = EditorImplementation.editors.indexOf(this);
                if (editorIndex === -1) {
                    return false;
                }
                EditorImplementation.editors.splice(editorIndex, 1);
                this.rootView.removeAttribute("data-endjin-editor");
                this.rootView.removeAttribute("contenteditable");
                this.viewEngine.destroy();
                return true;
            };
            EditorImplementation.prototype.destroyModels = function () {
                var models = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    models[_i] = arguments[_i];
                }
                (_a = this.viewEngine).destroyModels.apply(_a, models);
                var _a;
            };
            EditorImplementation.prototype.executeCommand = function (command) {
                return this.executeCommands([command]);
            };
            EditorImplementation.prototype.executeCommands = function (commands) {
                return this.executeBatch(new Editor.Model.CommandBatch(commands));
            };
            EditorImplementation.prototype.executeBatch = function (batch) {
                var _this = this;
                try {
                    this.executingBatch = true;
                    var affectedModels = batch.execute();
                    affectedModels.forEach(function (m) {
                        _this.viewEngine.render(m);
                    });
                }
                finally {
                    this.executingBatch = false;
                    if (this.queuedSelection !== null) {
                        this.selection = this.queuedSelection;
                        this.queuedSelection = null;
                    }
                }
            };
            EditorImplementation.prototype.createDocument = function () {
                if (!this.viewEngine.canParse(this.rootView)) {
                    throw new Error("Unable to parse the root view - it is not valid HTML5 content.");
                }
                var rootModel = this.viewEngine.parse(this.rootView);
                var document = new Editor.Model.Document();
                document.root = rootModel;
                return document;
            };
            EditorImplementation.prototype.render = function () {
                var renderedView = this.viewEngine.render(this.document.root);
                var parent = this.rootView.parentElement;
                if (parent === null) {
                    throw new Error("The root view must have a parent.");
                }
                parent.replaceChild(renderedView, this.rootView);
                this.rootView = renderedView;
                this.rootView.contentEditable = "true";
                this.rootView.setAttribute("data-endjin-editor", "true");
            };
            EditorImplementation.editors = [];
            return EditorImplementation;
        }());
        function createAndInsert(id, html) {
            var parent = document.getElementById(id);
            if (parent === null) {
                throw new Error("Unable to find the element with ID '#" + id + "'");
            }
            var wrapper = document.createElement("div");
            wrapper.innerHTML = html;
            if (wrapper.childElementCount !== 1) {
                throw new Error("The supplied HTML has more than one root child element");
            }
            var view = wrapper.firstElementChild;
            parent.innerHTML = "";
            parent.appendChild(view);
            return new EditorImplementation(parent);
        }
        Editor.createAndInsert = createAndInsert;
        function create(id) {
            var view = document.getElementById(id);
            if (view === null) {
                throw new Error("Unable to find the element with ID '#" + id + "'");
            }
            return new EditorImplementation(view);
        }
        Editor.create = create;
        function getEditorFor(element) {
            var current = element;
            while (current !== null && !current.hasAttribute("data-endjin-editor")) {
                current = current.parentElement;
            }
            if (current !== null) {
                var matches = EditorImplementation.editors.filter(function (e) { return e.rootView === current; });
                if (matches.length === 0) {
                    throw new Error("No editor found for the specified element, although it does have the data-endjin-editor attribute");
                }
                if (matches.length > 1) {
                    throw new Error("Multiple editors found for the specified element");
                }
                return matches[0];
            }
            return null;
        }
        Editor.getEditorFor = getEditorFor;
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            function isModelElementBefore(f, s) {
                var first = f;
                var second = s;
                if (first === second) {
                    return false;
                }
                var previousFirst = first;
                var previousSecond = second;
                while (first !== second) {
                    previousFirst = first;
                    previousSecond = second;
                    if (first !== null) {
                        first = first.parent;
                    }
                    if (second !== null) {
                        second = second.parent;
                    }
                }
                if (first !== null && previousFirst !== null && previousSecond !== null) {
                    var i1 = first.getIndex(previousFirst);
                    var i2 = first.getIndex(previousSecond);
                    return i1 < i2;
                }
                return false;
            }
            Model.isModelElementBefore = isModelElementBefore;
            function getNextModel(model) {
                if (model.childCount > 0) {
                    return model.getChildAtIndex(0);
                }
                var currentParent = model.parent;
                var currentChild = model;
                while (currentParent !== null) {
                    var index = currentParent.getIndex(currentChild);
                    if (index < currentParent.childCount - 1) {
                        return currentParent.getChildAtIndex(index + 1);
                    }
                    currentChild = currentParent;
                    currentParent = currentChild.parent;
                }
                return null;
            }
            Model.getNextModel = getNextModel;
            function getPreviousModel(model) {
                if (model.parent === null) {
                    return null;
                }
                var currentIndex = model.parent.getIndex(model);
                if (currentIndex > 0) {
                    return getDeepestRightmostChild(model.parent.getChildAtIndex(currentIndex - 1));
                }
                else {
                    return model.parent;
                }
            }
            Model.getPreviousModel = getPreviousModel;
            function getDeepestRightmostChild(root) {
                if (root.childCount === 0) {
                    return root;
                }
                return getDeepestRightmostChild(root.getChildAtIndex(root.childCount - 1));
            }
            Model.getDeepestRightmostChild = getDeepestRightmostChild;
            function removeChildFromParent(child) {
                if (child.parent === null) {
                    return false;
                }
                var index = child.parent.getIndex(child);
                return child.parent.removeChildAtIndex(index) !== null;
            }
            Model.removeChildFromParent = removeChildFromParent;
            function isModelElementAfter(f, s) {
                var first = f;
                var second = s;
                if (first === second) {
                    return false;
                }
                var previousFirst = first;
                var previousSecond = second;
                while (first !== second) {
                    previousFirst = first;
                    previousSecond = second;
                    if (first !== null) {
                        first = first.parent;
                    }
                    if (second !== null) {
                        second = second.parent;
                    }
                }
                if (first !== null && previousFirst !== null && previousSecond !== null) {
                    var i1 = first.getIndex(previousFirst);
                    var i2 = first.getIndex(previousSecond);
                    return i1 > i2;
                }
                return false;
            }
            Model.isModelElementAfter = isModelElementAfter;
            function getCommonAncestor(f, s) {
                var first = f;
                var second = s;
                if (first === second) {
                    return first;
                }
                var d1 = 0;
                var d2 = 0;
                for (var t = first; !!t; t = t.parent, d1++) { }
                for (var t = second; !!t; t = t.parent, d2++) { }
                if (d1 > d2) {
                    var temp1 = d1;
                    d1 = d2;
                    d2 = temp1;
                    var temp2 = first;
                    first = second;
                    second = temp2;
                }
                for (var i = 0; i < (d2 - d1); ++i) {
                    if (second !== null) {
                        second = second.parent;
                    }
                }
                while (first !== second) {
                    if (first !== null) {
                        first = first.parent;
                    }
                    if (second !== null) {
                        second = second.parent;
                    }
                }
                return first;
            }
            Model.getCommonAncestor = getCommonAncestor;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var Range = (function () {
                function Range(start, end) {
                    this.start = start;
                    this.end = end;
                }
                return Range;
            }());
            Model.Range = Range;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var Keypress = (function () {
                function Keypress(keyCode, shiftKey, altKey, controlKey, metaKey) {
                    if (shiftKey === void 0) { shiftKey = false; }
                    if (altKey === void 0) { altKey = false; }
                    if (controlKey === void 0) { controlKey = true; }
                    if (metaKey === void 0) { metaKey = false; }
                    this.keyCode = keyCode;
                    this.shiftKey = shiftKey;
                    this.altKey = altKey;
                    this.controlKey = controlKey;
                    this.metaKey = metaKey;
                }
                Keypress.prototype.equals = function (other) {
                    return this.keyCode === other.keyCode &&
                        this.shiftKey === other.shiftKey &&
                        this.altKey === other.altKey &&
                        this.controlKey === other.controlKey &&
                        this.metaKey === other.metaKey;
                };
                return Keypress;
            }());
            Model.Keypress = Keypress;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var Keychord = (function () {
                function Keychord(first, second) {
                    if (second === void 0) { second = null; }
                    this.first = first;
                    this.second = second;
                }
                Keychord.prototype.equals = function (other) {
                    return this.first.equals(other.first) &&
                        ((this.second === null && other.second === null) ||
                            (this.second !== null && other.second !== null && this.second.equals(other.second)));
                };
                return Keychord;
            }());
            Model.Keychord = Keychord;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var Model;
        (function (Model) {
            var InputDateTimeLocalModel = (function (_super) {
                __extends(InputDateTimeLocalModel, _super);
                function InputDateTimeLocalModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(InputDateTimeLocalModel.prototype, "contentType", {
                    get: function () {
                        return InputDateTimeLocalModel.ContentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputDateTimeLocalModel.ContentType = Model.CommonModelTypes.PhrasingContent + ".input.datetimelocal";
                return InputDateTimeLocalModel;
            }(Model.InputModelBase));
            Model.InputDateTimeLocalModel = InputDateTimeLocalModel;
        })(Model = Editor.Model || (Editor.Model = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
var Endjin;
(function (Endjin) {
    var Editor;
    (function (Editor) {
        var View;
        (function (View) {
            var InputDateTimeLocalAdapter = (function (_super) {
                __extends(InputDateTimeLocalAdapter, _super);
                function InputDateTimeLocalAdapter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.modelContentType = Editor.Model.InputDateTimeLocalModel.ContentType;
                    _this.adapterDisplayName = "input local datetime";
                    _this.inputElementType = "datetime-local";
                    return _this;
                }
                InputDateTimeLocalAdapter.prototype.createModelInstance = function () {
                    return new Editor.Model.InputDateTimeLocalModel();
                };
                return InputDateTimeLocalAdapter;
            }(View.InputAdapterBase));
            View.InputDateTimeLocalAdapter = InputDateTimeLocalAdapter;
        })(View = Editor.View || (Editor.View = {}));
    })(Editor = Endjin.Editor || (Endjin.Editor = {}));
})(Endjin || (Endjin = {}));
//# sourceMappingURL=editor.js.map