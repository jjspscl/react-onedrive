
export const deepMerge = (target: any, source: any) => {
    const result = { ...target };
    for (const key in source) {
        if (
            source[key] instanceof Object &&
            key in target &&
            target[key] instanceof Object
        ) {
            result[key] = deepMerge(target[key], source[key]);
        } else {
            result[key] = source[key];
        }
    }
    return result;
};