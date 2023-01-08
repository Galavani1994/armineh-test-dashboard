"use strict";
exports.__esModule = true;
exports.QueryResult = exports.CustomDatasource = void 0;
var rxjs_1 = require("rxjs");
var CustomDatasource = /** @class */ (function () {
    function CustomDatasource(observable, paginator) {
        var _this = this;
        this.observable = observable;
        this._request = new rxjs_1.BehaviorSubject([]);
        this.pagi = paginator;
        this.prom = observable.toPromise().then(function (data) {
            _this._request.next(data.content);
            _this.pagi.length = data.totalElements;
            return data;
        });
    }
    Object.defineProperty(CustomDatasource.prototype, "request", {
        get: function () {
            return this._request;
        },
        set: function (value) {
            this._request = value;
        },
        enumerable: false,
        configurable: true
    });
    CustomDatasource.prototype.connect = function (collectionViewer) {
        return this._request.asObservable();
    };
    CustomDatasource.prototype.disconnect = function (collectionViewer) {
        this._request.complete();
    };
    CustomDatasource.prototype.refresh = function (observable) {
        var _this = this;
        this.prom = observable.toPromise().then(function (success) {
            _this._request.next(success.content);
            _this.pagi.length = success.totalElements;
            return success;
        });
    };
    CustomDatasource.prototype.emptyDataSource = function () {
        this._request.next([]);
    };
    return CustomDatasource;
}());
exports.CustomDatasource = CustomDatasource;
var QueryResult = /** @class */ (function () {
    function QueryResult() {
    }
    return QueryResult;
}());
exports.QueryResult = QueryResult;
