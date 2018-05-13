"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application = require("tns-core-modules/application");
var LoadingIndicator = /** @class */ (function () {
    function LoadingIndicator() {
    }
    LoadingIndicator.prototype.show = function (options) {
        var context = this._getContext();
        if (context) {
            if (typeof options === 'undefined')
                options = {};
            if (typeof this._progressDialog === 'undefined') {
                // Create
                var indeterminate = true;
                var cancelable = false;
                var cancelListener = null;
                if (options.android) {
                    if (options.android.indeterminate !== undefined)
                        indeterminate = options.android.indeterminate;
                    if (options.android.cancelable !== undefined)
                        cancelable = options.android.cancelable;
                    if (options.android.cancelListener && typeof options.android.cancelListener === 'function') {
                        cancelListener = this.createOnCancelListener(options.android.cancelListener);
                    }
                }
                this._progressDialog = android.app.ProgressDialog.show(context, "", options.message || "Loading", indeterminate, cancelable, cancelListener);
            }
            else if (this._progressDialog) {
                // options
                if (options.message && this._progressDialog.setMesssage)
                    this._progressDialog.setMesssage(options.message);
                if (options.progress)
                    this._progressDialog.setProgress(options.progress);
                // android specific
                if (options.android) {
                    if (options.android.indeterminate)
                        this._progressDialog.setIndeterminate(true);
                    if (options.android.max)
                        this._progressDialog.setMax(options.android.max);
                    if (options.android.progressNumberFormat)
                        this._progressDialog.setProgressNumberFormat(options.android.progressNumberFormat);
                    if (options.android.progressPercentFormat)
                        this._progressDialog.setProgressPercentFormat(options.android.progressPercentFormat);
                    if (options.android.progressStyle)
                        this._progressDialog.setProgressStyle(options.android.progressStyle);
                    if (options.android.secondaryProgress)
                        this._progressDialog.setSecondaryProgress(options.android.secondaryProgress);
                    if (options.android.cancelListener && typeof options.android.cancelListener === 'function') {
                        this._progressDialog.setOnCancelListener(this.createOnCancelListener(options.android.cancelListener));
                    }
                }
            }
            return this._progressDialog;
        }
    };
    LoadingIndicator.prototype.createOnCancelListener = function (cancelListener) {
        return new android.content.DialogInterface.OnCancelListener({
            onCancel: function (dialog) { return cancelListener(dialog); }
        });
    };
    LoadingIndicator.prototype.hide = function () {
        if (typeof this._progressDialog !== 'undefined') {
            this._progressDialog.hide();
            this._progressDialog.dismiss();
        }
        this._progressDialog = undefined;
    };
    LoadingIndicator.prototype._getContext = function () {
        return application.android.foregroundActivity;
    };
    return LoadingIndicator;
}());
exports.LoadingIndicator = LoadingIndicator;
