export const isLst001 = (code, debug = false) => {
    if (!code) return false;

    const requiredFields = ["def transfer", "def approve", "def transfer_from"];
    const fieldsPresent = requiredFields.every(field => code.includes(field));

    return fieldsPresent;
}