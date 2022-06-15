var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AbstractClass = /** @class */ (function () {
    function AbstractClass(_a) {
        var firstName = _a.firstName, lastName = _a.lastName;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return AbstractClass;
}());
var GetFullNameClass = /** @class */ (function (_super) {
    __extends(GetFullNameClass, _super);
    function GetFullNameClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetFullNameClass.prototype.getFullName = function () {
        return "".concat(this.firstName, " ").concat(this.lastName);
    };
    ;
    return GetFullNameClass;
}(AbstractClass));
var SetFullNameClass = /** @class */ (function (_super) {
    __extends(SetFullNameClass, _super);
    function SetFullNameClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SetFullNameClass.prototype.setFullName = function (value) {
        if (value instanceof String) {
            var namesArray = value.split(" ");
            if (namesArray.length === 2) {
                this.firstName = namesArray[0], this.lastName = namesArray[1];
            }
        }
    };
    return SetFullNameClass;
}(AbstractClass));
