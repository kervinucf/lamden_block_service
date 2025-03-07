import { getDatabase, databaseInit } from "../database.mjs";
import { analyzeCode } from "../processors/lstChecker.mjs";

import { createLogger } from '../../logger.mjs'

const logger = createLogger('Database');

const loadContracts = async (drop) => {
    await databaseInit()
    let batchSize = 20000
    let progress = 0
    let db = await getDatabase()
    await new Promise(r => setTimeout(r, 5000));
    
    let contracts = new Set()

    async function get_batch(last_blockNum) {
        progress = progress + batchSize
        logger.start(`Getting batch of ${batchSize} transactions`)

        process_batch(await db.queries.getAllHistory(last_blockNum, batchSize))
    }

    async function process_batch(batch) {
        if (batch.length > 0) {
            logger.await("Processing batch...")
            for (let change of batch) {
                if (change) {
                    for (let contractName of change.affectedContractsList) {
                        contracts.add(contractName)
                    }
                }
            }

            for (let contractName of contracts) {
                let found = await db.models.Contracts.findOne({ contractName })
                if (!found) {
                    let code = await db.queries.getKeyFromCurrentState(contractName, "__code__")
                    let standard = analyzeCode(code.value)

                    await new db.models.Contracts({
                        contractName,
                        standard
                    }).save()
                    // add custom contract data here
                    logger.success(`Saved "${contractName}" ${standard} contract`)

                }
            }

            let last_blockNum = batch[batch.length - 1].blockNum
            logger.success(`Processed ${progress} txs`)
            get_batch(last_blockNum)

        } else {
            process.exit()
        }

    }

    if (drop) {
        logger.start("DROPPING CONTRACTS COLLECTION...")
        let res = await db.models.Contracts.deleteMany()
        logger.complete(res)
    }

    get_batch("000000000000")

}

let [drop] = process.argv.slice(2)

if (drop === "drop") drop = true
else drop = false

loadContracts(drop)