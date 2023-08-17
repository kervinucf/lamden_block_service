import { createLogger } from '../logger.mjs'

const logger = createLogger('Info');

export const getInfoEndpoints = (db) => {

    /**
    * @openapi
    * /contracts:
    *   get:
    *     tags: ["Contract"]
    *     summary: Get All Contracts Info.
    *     responses:
    *       200:
    *         description: Success
    */
    async function get_contracts(req, res) {
        try {
            let result = await db.queries.getContracts()
            res.send(result)
        } catch (e) {
            logger.error(e)
            res.send({ error: e.message })
        }
    }

    /**
    * @openapi
    * /contracts/{contractName}:
    *   get:
    *     tags: ["Contract"]
    *     summary: Returns a contract info.
    *     description: Get Contract Info by contractName.
    *     parameters:
    *       - in: path
    *         name: contractName
    *         schema: 
    *           type: string
    *         required: true
    *         description: Contract Name.
    *         example: currency
    *     responses:
    *       200:
    *         description: Success
    */
    async function get_contract(req, res) {
        const { contractName } = req.params
        try {
            let result = await db.queries.getContract(contractName)
            res.send(result)
        } catch (e) {
            logger.error(e)
            res.send({ error: e.message })
        }
    }

    /**
    * @openapi
    * /tokens:
    *   get:
    *     tags: ["Token"]
    *     summary: Returns all token contracts infomation.
    *     description: Get all token contracts infomation.
    *     responses:
    *       200:
    *         description: Success
    */
    async function get_tokens(req, res) {
        try {
            let result = await db.queries.getTokens()
            res.send(result)
        } catch (e) {
            logger.error(e)
            res.send({ error: e.message })
        }
    }

    /**
    * @openapi
    * /tokens/{contractName}:
    *   get:
    *     tags: ["Token"]
    *     summary: Returns a token info.
    *     description: Get a token contract info.
    *     parameters:
    *       - in: path
    *         name: contractName
    *         schema: 
    *           type: string
    *         required: true
    *         description: Contract Name.
    *         example: con_diego2
    *     responses:
    *       200:
    *         description: Success
    */
    async function get_token(req, res) {
        const { contractName } = req.params
        try {
            let result = await db.queries.getToken(contractName)
            res.send(result)
        } catch (e) {
            logger.error(e)
            res.send({ error: e.message })
        }
    }



   /**
    * @openapi
    * /nfts:
    *   get:
    *     tags: ["NFT"]
    *     summary: Returns all NFT contracts information.
    *     description: Get all NFT contracts information.
    *     responses:
    *       200:
    *         description: Success
    */
    async function get_nfts(req, res) {
        try {
            let result = await db.queries.getNFTs()
            res.send(result)
        } catch (e) {
            logger.error(e)
            res.send({ error: e.message })
        }
    }

    /**
    * @openapi
    * /nfts/{contractName}:
    *   get:
    *     tags: ["NFT"]
    *     summary: Returns a specific NFT info.
    *     description: Get a specific NFT contract info by its name.
    *     parameters:
    *       - in: path
    *         name: contractName
    *         schema:
    *           type: string
    *         required: true
    *         description: Contract Name.
    *         example: nft_artpiece_001
    *     responses:
    *       200:
    *         description: Success
    */
    async function get_nft(req, res) {
        const { contractName } = req.params
        try {
            let result = await db.queries.getNFT(contractName)
            res.send(result)
        } catch (e) {
            logger.error(e)
            res.send({ error: e.message })
        }
    }

    return [
        {
            type: 'get',
            route: '/contracts',
            handler: get_contracts
        },
        {
            type: 'get',
            route: '/contracts/:contractName',
            handler: get_contract
        },
        {
            type: 'get',
            route: '/tokens/',
            handler: get_tokens
        },
        {
            type: 'get',
            route: '/tokens/:contractName',
            handler: get_token
        },
        {
            type: 'get',
            route: '/nfts/',
            handler: get_nfts
        },
        {
            type: 'get',
            route: '/nfts/:contractName',
            handler: get_nft
        }
    ]
}