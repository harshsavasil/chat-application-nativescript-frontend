"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var color_1 = require("tns-core-modules/color");
var platform_1 = require("tns-core-modules/platform");
var shape_enum_1 = require("../common/shape.enum");
var NativeShadowDirective = (function () {
    function NativeShadowDirective(el) {
        this.el = el;
        this.loaded = false;
        this.initialized = false;
    }
    NativeShadowDirective.prototype.ngOnInit = function () {
        if (this.shadow === null || (this.shadow === '' && !this.elevation)) {
            return;
        }
        this.initializeCommonData();
        if (platform_1.isAndroid) {
            this.initializeAndroidData();
        }
        else if (platform_1.isIOS) {
            this.initializeIOSData();
        }
        if (this.shadow &&
            this.shadow.elevation) {
            if (platform_1.isAndroid) {
                this.loadFromAndroidData(this.shadow);
            }
            else if (platform_1.isIOS) {
                this.loadFromIOSData(this.shadow);
            }
        }
        this.initialized = true;
    };
    NativeShadowDirective.prototype.onLoaded = function () {
        this.loaded = true;
        if (!this.initialized) {
            this.ngOnInit();
        }
        this.applyShadow();
    };
    NativeShadowDirective.prototype.ngOnChanges = function (changes) {
        if (this.loaded &&
            !!changes &&
            (changes.hasOwnProperty('shadow') ||
                changes.hasOwnProperty('elevation') ||
                changes.hasOwnProperty('shape') ||
                changes.hasOwnProperty('bgcolor') ||
                changes.hasOwnProperty('cornerRadius') ||
                changes.hasOwnProperty('maskToBounds') ||
                changes.hasOwnProperty('shadowColor') ||
                changes.hasOwnProperty('shadowOffset') ||
                changes.hasOwnProperty('shadowOpacity') ||
                changes.hasOwnProperty('shadowRadius'))) {
            if (changes.shadow &&
                changes.shadow.currentValue.elevation) {
                if (platform_1.isAndroid) {
                    this.loadFromAndroidData(this.shadow);
                }
                else if (platform_1.isIOS) {
                    this.loadFromIOSData(this.shadow);
                }
            }
            this.applyShadow();
        }
    };
    NativeShadowDirective.prototype.applyShadow = function () {
        if (this.shadow === null || (this.shadow === '' && !this.elevation)) {
            return;
        }
        var tnsView = this.el.nativeElement;
        if (tnsView.android) {
            this.applyOnAndroid(tnsView.android);
        }
        else if (tnsView.ios) {
            this.applyOnIOS(tnsView.ios);
        }
    };
    NativeShadowDirective.prototype.initializeCommonData = function () {
        var tShadow = typeof this.shadow;
        if ((tShadow === 'string' || tShadow === 'number') && !this.elevation) {
            this.elevation = this.shadow ?
                parseInt(this.shadow, 10) : 2;
        }
        var tElevation = typeof this.elevation;
        if (tElevation === 'string' || tElevation === 'number') {
            this.elevation = this.elevation ?
                parseInt(this.elevation, 10) : 2;
        }
    };
    NativeShadowDirective.prototype.initializeAndroidData = function () {
        if (typeof this.cornerRadius === 'string') {
            this.cornerRadius = parseInt(this.cornerRadius, 10);
        }
        if (!this.shape) {
            this.shape = shape_enum_1.ShapeEnum.RECTANGLE;
        }
        if (!this.bgcolor) {
            this.bgcolor = '#FFFFFF';
        }
    };
    NativeShadowDirective.prototype.initializeIOSData = function () {
        if (!this.shadowColor) {
            this.shadowColor = '#000000';
        }
        if (typeof this.shadowOffset === 'string') {
            this.shadowOffset = parseFloat(this.shadowOffset);
        }
        if (typeof this.shadowOpacity === 'string') {
            this.shadowOpacity = parseFloat(this.shadowOpacity);
        }
        if (typeof this.shadowRadius === 'string') {
            this.shadowRadius = parseFloat(this.shadowRadius);
        }
    };
    NativeShadowDirective.prototype.applyOnAndroid = function (nativeView) {
        var shape = new android.graphics.drawable.GradientDrawable();
        shape.setShape(android.graphics.drawable.GradientDrawable[this.shape]);
        shape.setColor(android.graphics.Color.parseColor(this.bgcolor));
        shape.setCornerRadius(this.cornerRadius);
        nativeView.setBackgroundDrawable(shape);
        nativeView.setElevation(this.elevation);
    };
    NativeShadowDirective.prototype.applyOnIOS = function (nativeView) {
        var elevation = parseFloat((this.elevation - 0).toFixed(2));
        nativeView.layer.maskToBounds = false;
        nativeView.layer.shadowColor = new color_1.Color(this.shadowColor).ios.CGColor;
        nativeView.layer.shadowOffset =
            this.shadowOffset ?
                CGSizeMake(0, parseFloat(this.shadowOffset)) :
                CGSizeMake(0, 0.35 * elevation);
        nativeView.layer.shadowOpacity =
            this.shadowOpacity ?
                parseFloat(this.shadowOpacity) :
                0.015 * elevation + 0.18;
        nativeView.layer.shadowRadius =
            this.shadowRadius ?
                parseFloat(this.shadowRadius) :
                0.35 * elevation - 0.1;
    };
    NativeShadowDirective.prototype.loadFromAndroidData = function (data) {
        this.elevation = data.elevation || this.elevation;
        this.shape = data.shape || this.shape;
        this.bgcolor = data.bgcolor || this.bgcolor;
        this.cornerRadius = data.cornerRadius || this.cornerRadius;
    };
    NativeShadowDirective.prototype.loadFromIOSData = function (data) {
        this.maskToBounds = data.maskToBounds || this.maskToBounds;
        this.shadowColor = data.shadowColor || this.shadowColor;
        this.shadowOffset = data.shadowOffset || this.shadowOffset;
        this.shadowOpacity = data.shadowOpacity || this.shadowOpacity;
        this.shadowRadius = data.shadowRadius || this.shadowRadius;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NativeShadowDirective.prototype, "shadow", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NativeShadowDirective.prototype, "elevation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NativeShadowDirective.prototype, "shape", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NativeShadowDirective.prototype, "bgcolor", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NativeShadowDirective.prototype, "cornerRadius", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NativeShadowDirective.prototype, "maskToBounds", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NativeShadowDirective.prototype, "shadowColor", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NativeShadowDirective.prototype, "shadowOffset", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NativeShadowDirective.prototype, "shadowOpacity", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NativeShadowDirective.prototype, "shadowRadius", void 0);
    __decorate([
        core_1.HostListener('loaded'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NativeShadowDirective.prototype, "onLoaded", null);
    NativeShadowDirective = __decorate([
        core_1.Directive({ selector: '[shadow]' }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], NativeShadowDirective);
    return NativeShadowDirective;
}());
exports.NativeShadowDirective = NativeShadowDirective;
//# sourceMappingURL=ng-shadow.directive.js.map