(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('cross-fetch/polyfill')) :
    typeof define === 'function' && define.amd ? define(['exports', 'cross-fetch/polyfill'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.freenalytics = {}));
})(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var IP_API_URL = 'https://api.ipify.org/?format=json';
    var GEO_API_URL = 'https://reallyfreegeoip.org/json';
    var getPublicIp = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(IP_API_URL)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    return [2 /*return*/, json.ip];
                case 3:
                    _a.sent();
                    return [2 /*return*/, ''];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var getLocationForIp = function (ip) { return __awaiter(void 0, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(GEO_API_URL, "/").concat(ip))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    return [2 /*return*/, "".concat(json.city, ", ").concat(json.country_name)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, 'N/A'];
                case 4: return [2 /*return*/];
            }
        });
    }); };

    var PageHandler = /** @class */ (function () {
        function PageHandler(client) {
            this.client = client;
            this.visitTimestamp = Date.now();
            this.numOfClicks = 0;
            this.scrolled = false;
        }
        PageHandler.prototype.registerEvents = function () {
            window.addEventListener('load', this.handleLoad.bind(this));
            window.addEventListener('click', this.handleClick.bind(this));
            window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
            window.addEventListener('wheel', this.handleScroll.bind(this), { once: true });
        };
        PageHandler.prototype.handleLoad = function () {
            return __awaiter(this, void 0, void 0, function () {
                var ip, location, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, getPublicIp()];
                        case 1:
                            ip = _b.sent();
                            if (!ip) return [3 /*break*/, 3];
                            return [4 /*yield*/, getLocationForIp(ip)];
                        case 2:
                            _a = _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _a = 'N/A';
                            _b.label = 4;
                        case 4:
                            location = _a;
                            return [2 /*return*/, this.client.postPayload({
                                    page_title: document.title,
                                    url_route: window.location.pathname,
                                    user_first_visit: !document.referrer,
                                    user_location: location,
                                    referrer: document.referrer
                                })];
                    }
                });
            });
        };
        PageHandler.prototype.handleClick = function (event) {
            var _a, _b, _c;
            this.numOfClicks++;
            var element = event.composedPath()[0];
            return this.client.postPayload({
                element_clicked: {
                    url_route: window.location.pathname,
                    tag_name: (_a = element === null || element === void 0 ? void 0 : element.localName) !== null && _a !== void 0 ? _a : 'unknown',
                    class_name: (_b = element === null || element === void 0 ? void 0 : element.className) !== null && _b !== void 0 ? _b : '',
                    id: (_c = element === null || element === void 0 ? void 0 : element.id) !== null && _c !== void 0 ? _c : '',
                    page_x: event.pageX,
                    page_y: event.pageY,
                    client_x: event.clientX,
                    client_y: event.clientY
                }
            });
        };
        PageHandler.prototype.handleScroll = function () {
            this.scrolled = true;
        };
        PageHandler.prototype.handleBeforeUnload = function () {
            var timeInPage = (Date.now() - this.visitTimestamp) / 1000;
            return this.client.postPayload({
                user_time_in_page: timeInPage,
                user_scrolled: this.scrolled,
                num_of_clicks: this.numOfClicks
            });
        };
        return PageHandler;
    }());

    var Client = /** @class */ (function () {
        function Client(options) {
            Client.validateOptions(options);
            this.apiUrl = options.apiUrl;
            this.domain = options.domain;
            this.pageHandler = null;
        }
        Client.validateOptions = function (options) {
            if (!options.apiUrl) {
                throw new Error('options.apiUrl needs to be specified.');
            }
            if (!options.domain) {
                throw new Error('options.domain needs to be specified.');
            }
        };
        Client.prototype.initialize = function () {
            this.pageHandler = new PageHandler(this);
            this.pageHandler.registerEvents();
        };
        Client.prototype.postPayload = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, fetch("".concat(this.apiUrl, "/applications/").concat(this.domain, "/data"), {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(payload),
                                    keepalive: true
                                })];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error(error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return Client;
    }());

    exports.Client = Client;
    exports.PageHandler = PageHandler;

}));
