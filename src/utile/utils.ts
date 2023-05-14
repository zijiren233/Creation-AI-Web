export function stringToNumber(str: string | undefined): number {
    if (str == undefined) {
        return 1;
    }
    const num = parseInt(str);
    return isNaN(num) ? 1 : num;
}