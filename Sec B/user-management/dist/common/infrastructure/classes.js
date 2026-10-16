"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = exports.Dictionary = void 0;
class Dictionary {
    constructor(_record) {
        if (_record)
            this.record = _record;
        else
            this.clear();
        this.record = _record;
    }
    add(key, value) {
        if (this.record) {
            this.record[key] = value;
        }
    }
    includesKey(_key) {
        return typeof this.record?.[_key] !== "undefined";
    }
    includesValue(_value, _comparer) {
        const comparer = _comparer ?? ((x, y) => x === y);
        if (this.values) {
            return this.values.some((x) => comparer(x, _value));
        }
    }
    clear() {
        this.record = {};
    }
    get keys() {
        if (this.record) {
            return Object.keys(this.record).map((x) => x);
        }
    }
    get values() {
        if (this.record) {
            return Object.values(this.record);
        }
    }
    valueOf() {
        if (this.record) {
            return this.record;
        }
    }
    *entries() {
        return this.record;
    }
    toString() {
        return JSON.stringify(this.record);
    }
}
exports.Dictionary = Dictionary;
class List extends Array {
    constructor(...items) {
        if (items && items.length === 1 && typeof items === "number")
            super(items[0]);
        else
            super(...items);
    }
    pushRange(items) {
        return this.push(...items);
    }
    toSet() {
        return new Set(this);
    }
    intersect(second, comparer) {
        comparer ?? (comparer = (x, y) => x === y);
        return new List(...this.filter((x) => second.some((y) => comparer(x, y))));
    }
    groupBy(keySelector) {
        return new Dictionary(this.reduce((prev, curr) => ({
            ...prev,
            [keySelector(curr)]: new List(...prev[keySelector(curr)], curr),
        }), {}));
    }
    distinct(by) {
        const comparer = by ?? ((x, y) => x === y);
        return new List(...this.reduce((prev, curr, _, arr) => arr.some((x) => comparer(x, curr)) ? prev : [...prev, curr], []));
    }
    union(second) {
        return new List(...this, ...second).distinct();
    }
}
exports.List = List;
//# sourceMappingURL=classes.js.map