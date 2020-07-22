type ValidJSON = string | number | boolean | object;

export const stringify = (val: ValidJSON): string => {
  let result: string = "";
  if (
    typeof val === "string" ||
    typeof val === "number" ||
    typeof val === "boolean"
  ) {
    result = valueToJSON(val);
  } else if (val instanceof Array) {
    result = arrToJSON(val);
  } else if (typeof val === "object") {
    result = objToJSON(val);
  }
  return `${result}`;
};

function valueToJSON(value: number | string | boolean): string {
  return typeof value === "string"
    ? `"${value.split("\n").join(`\\n`)}"`
    : value.toString();
}

type objectFormat = {
  [key: string]: unknown;
};

function objToJSON(obj: objectFormat): string {
  let result: string = `{`;
  for (let key in obj) {
    let val: unknown = obj[key];
    result += `"${key}":`;
    if (
      typeof val === "string" ||
      typeof val === "number" ||
      typeof val === "boolean"
    ) {
      result += valueToJSON(val);
    } else if (val instanceof Array) {
      result += arrToJSON(val);
    } else if (typeof val === "object") {
      result += objToJSON(val);
    }

    if (Object.keys(obj).indexOf(key) !== Object.keys(obj).length - 1) {
      result += ",";
    }
  }
  return `${result}}`;
}

function arrToJSON(arr: unknown[]) {
  let result: string = `[`;
  arr.map((val, i) => {
    if (
      typeof val === "string" ||
      typeof val === "number" ||
      typeof val === "boolean"
    ) {
      result += valueToJSON(val);
    } else if (val instanceof Array) {
      result += arrToJSON(val);
    } else if (typeof val === "object") {
      result += objToJSON(val);
    }
    if (i !== arr.length - 1) {
      result += ",";
    }
  });
  return `${result}]`;
}
