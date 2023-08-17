export const isLst002 = (code, debug = false) => {
    if (!code) return false;

    return code.includes("metadata = Variable(") || code.includes("metadata = Hash(");
}