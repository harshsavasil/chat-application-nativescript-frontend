"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var color_1 = require("tns-core-modules/color");
var frame_1 = require("tns-core-modules/ui/frame");
var FloatingActionButtonBase = (function (_super) {
    __extends(FloatingActionButtonBase, _super);
    function FloatingActionButtonBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.swipeEventAttached = false;
        return _this;
    }
    FloatingActionButtonBase.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        if (this.swipeEventAttached === false) {
            var fab_1 = this;
            if (this.hideOnSwipeOfView) {
                var swipeItem = frame_1.topmost().getViewById(this.hideOnSwipeOfView);
                var animationType_1 = this.swipeAnimation
                    ? this.swipeAnimation
                    : "slideDown";
                if (swipeItem !== undefined) {
                    var duration_1 = this.hideAnimationDuration
                        ? this.hideAnimationDuration
                        : this._getDurationDefault(animationType_1);
                    swipeItem.on("pan", function (args) {
                        if (args.deltaY < -10) {
                            switch (animationType_1) {
                                case "slideUp":
                                    try {
                                        fab_1.animate({
                                            target: fab_1,
                                            translate: {
                                                x: 0,
                                                y: -200
                                            },
                                            opacity: 0,
                                            duration: 400
                                        });
                                    }
                                    catch (error) {
                                        console.log(error);
                                    }
                                    break;
                                case "slideDown":
                                    fab_1.animate({
                                        target: fab_1,
                                        translate: {
                                            x: 0,
                                            y: 200
                                        },
                                        opacity: 0,
                                        duration: duration_1
                                    });
                                    break;
                                case "slideRight":
                                    fab_1.animate({
                                        target: fab_1,
                                        translate: {
                                            x: 200,
                                            y: 0
                                        },
                                        opacity: 0,
                                        duration: duration_1
                                    });
                                    break;
                                case "slideLeft":
                                    fab_1.animate({
                                        target: fab_1,
                                        translate: {
                                            x: -200,
                                            y: 0
                                        },
                                        opacity: 0,
                                        duration: duration_1
                                    });
                                    break;
                                case "scale":
                                    fab_1.animate({
                                        target: fab_1,
                                        scale: {
                                            x: 0,
                                            y: 0
                                        },
                                        duration: duration_1
                                    });
                                    break;
                            }
                        }
                        else if (args.deltaY > 0) {
                            switch (animationType_1) {
                                case "slideUp":
                                    fab_1.animate({
                                        target: fab_1,
                                        translate: {
                                            x: 0,
                                            y: 0
                                        },
                                        opacity: 1,
                                        duration: duration_1
                                    });
                                    break;
                                case "slideDown":
                                    fab_1.animate({
                                        target: fab_1,
                                        translate: {
                                            x: 0,
                                            y: 0
                                        },
                                        opacity: 1,
                                        duration: duration_1
                                    });
                                    break;
                                case "slideRight":
                                    fab_1.animate({
                                        target: fab_1,
                                        translate: {
                                            x: 0,
                                            y: 0
                                        },
                                        opacity: 1,
                                        duration: duration_1
                                    });
                                    break;
                                case "slideLeft":
                                    fab_1.animate({
                                        target: fab_1,
                                        translate: {
                                            x: 0,
                                            y: 0
                                        },
                                        opacity: 1,
                                        duration: duration_1
                                    });
                                    break;
                                case "scale":
                                    fab_1.animate({
                                        target: fab_1,
                                        scale: {
                                            x: 1,
                                            y: 1
                                        },
                                        duration: duration_1
                                    });
                                    break;
                            }
                        }
                    });
                    this.swipeEventAttached = true;
                }
            }
        }
    };
    FloatingActionButtonBase.prototype._getDurationDefault = function (animationType) {
        switch (animationType) {
            case "scale":
                return 200;
            default:
                return 400;
        }
    };
    return FloatingActionButtonBase;
}(view_1.View));
exports.FloatingActionButtonBase = FloatingActionButtonBase;
exports.iconProperty = new view_1.Property({
    name: "icon",
    affectsLayout: true
});
exports.iconProperty.register(FloatingActionButtonBase);
exports.rippleColorProperty = new view_1.Property({
    name: "rippleColor",
    equalityComparer: color_1.Color.equals,
    valueConverter: function (v) { return new color_1.Color(v); }
});
exports.rippleColorProperty.register(FloatingActionButtonBase);
