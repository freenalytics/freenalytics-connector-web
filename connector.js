(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.freenalytics = {}));
})(this, (function (exports) { 'use strict';

    var testing = function () {
        console.log('hello');
    };

    exports.testing = testing;

}));
