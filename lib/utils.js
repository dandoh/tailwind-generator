"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var postcss_1 = __importDefault(require("postcss"));
exports.camelCase = function (name) {
    return name.replace(/[-_\s]+([a-z0-9])/g, function (_, word) { return word.toUpperCase(); });
};
exports.isValidLang = function (s) {
    return ["elm", "reasonml"].includes(s);
};
exports.shutDownLog = function (f) { return __awaiter(_this, void 0, void 0, function () {
    var oldConsoleLog, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                oldConsoleLog = console.log;
                // tslint:disable-next-line: no-console
                console.log = function () { return undefined; };
                return [4 /*yield*/, f()];
            case 1:
                res = _a.sent();
                // tslint:disable-next-line: no-console
                console.log = oldConsoleLog;
                return [2 /*return*/, res];
        }
    });
}); };
exports.readClasses = function (filepath) {
    var root = postcss_1.default.parse(fs_1.default.readFileSync(filepath, "utf8"));
    var classes = [];
    root.walkRules(function (_a) {
        var className = _a.selector;
        // Ignore anything that's not a class
        if (!className.startsWith(".")) {
            return;
        }
        // Ignore responsive variations
        if (className.startsWith(".sm\\:") ||
            className.startsWith(".md\\:") ||
            className.startsWith(".lg\\:") ||
            className.startsWith(".xl\\:")) {
            return;
        }
        // Ignore pseudo selectors
        if (className.indexOf(":after") !== -1 ||
            className.indexOf(":before") !== -1) {
            return;
        }
        var name = className
            .replace(/^\S*\./, "")
            .replace(":focus", "")
            .replace(":hover", "")
            .replace(/\\\//g, "Over")
            .replace(/\\/g, "")
            .split(":")
            .join("-");
        // replace -* to *-neg
        if (name.startsWith("-")) {
            name = name.replace(/^-/, "") + "-neg";
        }
        name = exports.camelCase(name);
        className = className
            .replace(/^\S*\./, "")
            .replace(":focus", "")
            .replace(":hover", "")
            .replace(/\\\//g, "/")
            .replace(/\\/g, "");
        // Skip if it already exists
        if (classes.some(function (c) { return c.name === name; })) {
            return;
        }
        classes.push({
            className: className,
            name: name,
        });
    });
    return classes;
};