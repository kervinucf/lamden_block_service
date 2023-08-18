export function isLst003(code, debug = false) {
    let failedChecks = [];

    if (!code.includes("def mint_nft")) {
        failedChecks.push("mint_nft check failed");
    }
    if (!code.includes("def transfer")) {
        failedChecks.push("transfer check failed");
    }
    if (!code.includes("def approve")) {
        failedChecks.push("approve check failed");
    }
    if (!code.includes("def transfer_from")) {
        failedChecks.push("transfer_from check failed");
    }

    if (debug && failedChecks.length) {
        console.log(failedChecks);
    }

    return failedChecks.length === 0;
}
