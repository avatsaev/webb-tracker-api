export const toNumber = (value: string): undefined | number => {
    const asNumber = Number(value);
    if (isNaN(asNumber)) return undefined;
    return asNumber;
};
