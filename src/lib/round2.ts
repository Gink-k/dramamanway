export const round2 = (num: number, digits = 2) =>
    Math.round((num + Number.EPSILON) * 10 ** digits) / 10 ** digits;
