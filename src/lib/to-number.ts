export const toNumber = (raw: string, defaultValue = -1) => {
    const res = Number(raw);

    return Number.isNaN(res) ? defaultValue : res;
};
