"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
//import MaskedInput from 'angular2-text-mask';
var NKDatetime = (function () {
    function NKDatetime(ngControl) {
        this.dateChange = new core_1.EventEmitter();
        this.timepickerOptions = {};
        //    @Input('timeTextMask')
        //    timeTextMaskOtpions: any = {};
        this.datepickerOptions = {};
        this.idDatePicker = uniqueId('q-datepicker_');
        this.idTimePicker = uniqueId('q-timepicker_');
        this.onChange = function (_) { };
        this.onTouched = function () { };
        ngControl.valueAccessor = this; // override valueAccessor
    }
    NKDatetime.prototype.ngAfterViewInit = function () {
        this.init();
    };
    NKDatetime.prototype.ngOnDestroy = function () {
        if (this.datepicker) {
        }
    };
    NKDatetime.prototype.writeValue = function (value) {
        var _this = this;
        this.date = value;
        if (isDate(this.date)) {
            setTimeout(function () {
                _this.updateModel(_this.date);
            }, 0);
        }
    };
    NKDatetime.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    NKDatetime.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    //////////////////////////////////
    NKDatetime.prototype.init = function () {
        var _this = this;
        if (!this.datepicker && this.datepickerOptions !== false) {
            this.datepicker = $('#' + this.idDatePicker).datepicker(this.datepickerOptions);
            this.datepicker
                .on('changeDate', function (e) {
                var newDate = e.date;
                if (isDate(_this.date) && isDate(newDate)) {
                    // get hours/minutes
                    var h = _this.date.getHours();
                    var m = _this.date.getMinutes();
                    newDate.setHours(h);
                    newDate.setMinutes(m);
                }
                _this.date = newDate;
                _this.dateChange.emit(newDate);
                _this.question.setValue(_this.date);
            });
        }
        else if (this.datepickerOptions === false) {
            $('#' + this.idDatePicker).remove();
        }
        if (!this.timepicker && this.timepickerOptions !== false) {
            var options = jQuery.extend({ defaultTime: false }, this.timepickerOptions);
            this.timepicker = $('#' + this.idTimePicker).timepicker(options);
            this.timepicker
                .on('changeTime.timepicker', function (e) {
                var meridian = e.time.meridian;
                var hours = e.time.hours;
                if (meridian) {
                    // has meridian -> convert 12 to 24h
                    if (meridian === 'PM' && hours < 12) {
                        hours = hours + 12;
                    }
                    if (meridian === 'AM' && hours === 12) {
                        hours = hours - 12;
                    }
                    hours = _this.pad(hours);
                }
                if (!isDate(_this.date)) {
                    _this.date = new Date();
                    if (_this.datepicker !== undefined) {
                        _this.datepicker.datepicker('update', _this.date.toLocaleDateString('en-US'));
                    }
                }
                _this.date.setHours(parseInt(hours));
                _this.date.setMinutes(e.time.minutes);
                _this.dateChange.emit(_this.date);
            });
        }
        else if (this.timepickerOptions === false) {
            $('#' + this.idTimePicker).parent().remove();
        }
    };
    NKDatetime.prototype.updateModel = function (date) {
        // update date
        //        if (this.datepicker !== undefined) {
        //            this.datepicker.datepicker('update', date.toLocaleDateString('en-US'));
        //        }
        // update time
        if (this.timepicker !== undefined) {
            var hours = this.date.getHours();
            if (this.timepickerOptions.showMeridian) {
                // Convert 24 to 12 hour system
                hours = (hours === 0 || hours === 12) ? 12 : hours % 12;
            }
            var meridian = this.date.getHours() >= 12 ? ' PM' : ' AM';
            this.timepicker.timepicker('setTime', this.pad(hours) + ':' + this.date.getMinutes() + meridian);
        }
    };
    NKDatetime.prototype.pad = function (value) {
        return (value && value.toString().length < 2) ? '0' + value : value.toString();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NKDatetime.prototype, "dateChange", void 0);
    __decorate([
        core_1.Input('timepicker'), 
        __metadata('design:type', Object)
    ], NKDatetime.prototype, "timepickerOptions", void 0);
    __decorate([
        core_1.Input('datepicker'), 
        __metadata('design:type', Object)
    ], NKDatetime.prototype, "datepickerOptions", void 0);
    __decorate([
        core_1.Input('timePlaceholder'), 
        __metadata('design:type', String)
    ], NKDatetime.prototype, "timePlaceholderString", void 0);
    __decorate([
        core_1.Input('datePlaceholder'), 
        __metadata('design:type', String)
    ], NKDatetime.prototype, "datePlaceholderString", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NKDatetime.prototype, "question", void 0);
    __decorate([
        core_1.HostListener('dateChange', ['$event']), 
        __metadata('design:type', Object)
    ], NKDatetime.prototype, "onChange", void 0);
    NKDatetime = __decorate([
        core_1.Component({
            selector: 'datetime',
            //    directives: [MaskedInput],
            template: "\n    <div class=\"form-inline\">\n        <div id=\"{{idDatePicker}}\" class=\"input-group date\">\n            <input [attr.id]=\"question.key\" [attr.aria-labelledby]=\"'label-' + question.key\" (keyup)=\"question.setValue($event)\" [placeholder]=\"datePlaceholderString\" type=\"text\" class=\"form-control\"/>\n            <div class=\"input-group-addon\">\n                <span [ngClass]=\"datepickerOptions.icon || 'glyphicon glyphicon-th'\"></span>\n            </div>\n        </div>\n        <div class=\"input-group bootstrap-timepicker timepicker\">\n            <input [attr.id]=\"question.key+'-time'\" [attr.aria-labelledby]=\"'label-' + question.key\" (keyup)=\"question.setValue($event)\" id=\"{{idTimePicker}}\" [placeholder]=\"timePlaceholderString\" type=\"text\" class=\"form-control input-small\">\n            <span class=\"input-group-addon\"><i [ngClass]=\"timepickerOptions.icon || 'glyphicon glyphicon-time'\"></i></span>\n        </div>\n    </div>\n   "
        }), 
        __metadata('design:paramtypes', [common_1.NgControl])
    ], NKDatetime);
    return NKDatetime;
}());
exports.NKDatetime = NKDatetime;
var id = 0;
function uniqueId(prefix) {
    return prefix + ++id;
}
function isDate(obj) {
    return Object.prototype.toString.call(obj) === '[object Date]';
}
//# sourceMappingURL=ng2-datetime.js.map