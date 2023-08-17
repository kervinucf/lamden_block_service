import * as utils from '../../utils.mjs'

export const getInfoQueries = (db) => {

    async function getContracts() {
        return await db.models.Contracts.find({}, {'_id': 0, '__v': 0})
    }

    async function getContract(contractName) {
        let stateResults = await db.models.CurrentState.find({rawKey: {$regex: "^" + db.utils.makeKey(contractName).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}})
        let allStateObjects = stateResults.map(result => utils.keysToObj(utils.deconstructKey(result.rawKey), result.value))
        let merged = utils.mergeObjects(allStateObjects)

        return utils.cleanObj(merged)
    }

    async function getTokens() {
        return db.models.Contracts.find({
            $or: [
                {standard: "lst001"},
                {standard: "lst002"}
            ]
        }, {'_id': 0, '__v': 0});
    }

    async function getToken(contractName) {
        let token = await getContract(contractName)
        token = token[contractName]
        let contractDetails = await db.models.Contracts.findOne({name: contractName});
        let standard = contractDetails ? contractDetails.standard : null;

        return {
            __developer__: token.__developer__,
            __owner__: token.__owner__,
            __submitted__: token.__submitted__,
            metadata: token.metadata,
            standard: standard
        }
    }

    async function getNFTs() {
        return db.models.Contracts.find({
            standard: "lst003"
        }, {'_id': 0, '__v': 0});
    }

    async function getNFT(contractName) {
        let token = await getContract(contractName)
        token = token[contractName]

        return {
            __developer__: token.__developer__,
            __owner__: token.__owner__,
            __submitted__: token.__submitted__,
            metadata: token.metadata,
            standard: "lst003"
        }
    }

    return {
        getContracts,
        getContract,
        getTokens,
        getToken,
        getNFTs,
        getNFT
    }
}