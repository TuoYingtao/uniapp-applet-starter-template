class Enum {

  #privateNumToValueMap = new Map();

  #privateStrToDescMap = new Map();

  constructor(definition) {
    if (Object.prototype.toString.call(definition).slice(8, -1) === "Object") {
      for (const enumName of Object.keys(definition)) {
        const [value, desc] = definition[enumName]
        this.#privateNumToValueMap.set(enumName, value);
        this.#privateStrToDescMap.set(value, desc);
        Enum.prototype[enumName] = value;
      }
    } else {
      throw new Error(`当前定义的枚举不为Object,Array;而是${definition}`);
    }
  }

  getValue(enumKey) {
    return this.#privateNumToValueMap.get(enumKey) || '';
  }

  getDescMessage(enumValue) {
    return this.#privateStrToDescMap.get(enumValue) || '';
  }

  static getEnumInstance(definition) {
    return new Enum(definition);
  }
}

Object.freeze(Enum);
Object.seal(Enum);

export default Enum;
