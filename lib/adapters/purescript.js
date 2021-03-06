"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var fileName = "Tailwind.purs";
var generate = function (classes) {
    var purify = function (_a) {
        var className = _a.className, name = _a.name;
        return "\n" + name + " :: Tailwind\n" + name + " =\n  Tailwind \"" + className + "\"\n";
    };
    return "module Tailwind (\n  Tailwind,\n  tailwind,\n  tailwindMaybes,\n" + classes.map(function (cl) { return "  " + cl.name; }).join(",\n") + "\n  ) where\n\n-- Generated by tailwind-generator, be careful when editing this file\n\nimport Prelude ((<<<), map)\n\nimport Data.String as String\nimport Data.Array as Array\nimport Data.Maybe (Maybe)\n\nnewtype Tailwind\n  = Tailwind String\n\nunwrap :: Tailwind -> String\nunwrap (Tailwind c) = c\n\ntailwind :: Array Tailwind -> String\ntailwind = String.joinWith \" \" <<< map unwrap\n\ntailwindMaybes :: Array (Maybe Tailwind) -> String\ntailwindMaybes = tailwind <<< Array.catMaybes\n" + classes.map(purify).join("") + "\n  ";
};
exports.save = function (dir, classes) {
    fs_1.default.writeFileSync(path_1.default.join(dir, fileName), generate(classes));
};
