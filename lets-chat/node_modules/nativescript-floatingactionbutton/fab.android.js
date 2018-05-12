"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fab_common_1 = require("./fab-common");
var ImageSource = require("tns-core-modules/image-source");
var color_1 = require("tns-core-modules/color");
var view_1 = require("tns-core-modules/ui/core/view");
var Fab = (function (_super) {
    __extends(Fab, _super);
    function Fab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Fab.prototype, "android", {
        get: function () {
            return this.nativeView;
        },
        enumerable: true,
        configurable: true
    });
    Fab.prototype.createNativeView = function () {
        this._android = new android.support.design.widget.FloatingActionButton(this._context);
        var that = new WeakRef(this);
        this._android.setOnClickListener(new android.view.View.OnClickListener({
            get owner() {
                return that.get();
            },
            onClick: function (v) {
                if (this.owner) {
                    this.owner._emit("tap");
                }
            }
        }));
        return this._android;
    };
    Fab.prototype.initNativeView = function () {
        this._androidViewId = android.view.View.generateViewId();
        this.nativeView.setId(this._androidViewId);
    };
    Fab.prototype[view_1.backgroundColorProperty.getDefault] = function () {
        return this.nativeView.getBackgroundTintList();
    };
    Fab.prototype[view_1.backgroundColorProperty.setNative] = function (value) {
        var newValue;
        if (value instanceof color_1.Color) {
            newValue = android.content.res.ColorStateList.valueOf(value.android);
        }
        else {
            newValue = value;
        }
        try {
            this.nativeView.setBackgroundTintList(newValue);
        }
        catch (err) {
            console.log("Error setNative backgroundColorProperty: ", err);
        }
    };
    Fab.prototype[view_1.backgroundInternalProperty.setNative] = function (value) {
    };
    Fab.prototype[fab_common_1.rippleColorProperty.setNative] = function (value) {
        this.nativeView.setRippleColor(value.android);
    };
    Fab.prototype[fab_common_1.iconProperty.setNative] = function (value) {
        var iconDrawable = null;
        if (!value) {
            return;
        }
        if (ImageSource.isFileOrResourcePath(value)) {
            iconDrawable = ImageSource.fromFileOrResource(value);
            if (iconDrawable) {
                this.nativeView.setImageBitmap(iconDrawable.android);
            }
            else {
                console.log("The icon: " + value + " was not found. Check your XML icon property.");
            }
        }
        else {
            var drawableId = android.content.res.Resources
                .getSystem()
                .getIdentifier(value, "drawable", "android");
            iconDrawable = android.content.res.Resources
                .getSystem()
                .getDrawable(drawableId);
            if (iconDrawable) {
                this.nativeView.setImageDrawable(iconDrawable);
            }
            else {
                console.log("The icon: " + value + " was not found. Check your XML icon property.");
            }
        }
    };
    Fab.tapEvent = "tap";
    return Fab;
}(fab_common_1.FloatingActionButtonBase));
exports.Fab = Fab;
