import fs from "fs";
import path from "path";

import { Adapter, Class } from "../types";

const fileName = "tailwind.ts";

const escapeKeywords = (str: string) =>
  ["static"].includes(str) ? `${str}_` : str;

const generate = (classes: Class[]): string => {
  const typescriptify = ({ className, name }: Class): string => `
export const ${escapeKeywords(name)}: Tailwind = buildTailwind("${className}");
`;

  return `// Generated by tailwind-generator, be careful when editing this file

const opaque: unique symbol = Symbol();

export interface Tailwind {
  readonly _opaque: typeof opaque
  readonly _value: string
}

const buildTailwind = (className: string): Tailwind => ({
    _opaque: opaque,
    _value: className,
});

export const tailwind = (classNames: Tailwind[]): string => (
    classNames.map(({ _value }) => _value).join(" ")
);
${classes.map(typescriptify).join("")}
  `;
};

export const save: Adapter["save"] = (dir, classes) => {
  fs.writeFileSync(path.join(dir, fileName), generate(classes));
};
