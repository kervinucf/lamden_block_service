export const isLst003 = (code, debug = false) => {
    if (!code) return false;

    const requiredFields = [
        "collection_name = Variable(", "collection_name = Hash(",
        "collection_owner = Variable(", "collection_owner = Hash(",
        "collection_nfts = Variable(", "collection_nfts = Hash(",
        "collection_balances = Variable(", "collection_balances = Hash(",
        "collection_balances_approvals = Variable(", "collection_balances_approvals = Hash(",
        "@export def mint_nft", "@export def transfer", "@export def approve", "@export def transfer_from"
    ];

    const fieldsPresent = requiredFields.every(field => code.includes(field));

    return fieldsPresent;
}