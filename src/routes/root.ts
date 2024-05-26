import express from 'express'
import generatePayloadHandler from '../controllers/generate-payload-handler'
import checkProofHandler from '../controllers/check-proof-handler'
import getAccountInfoHandler from '../controllers/get-account-info-handler'


const root = express.Router()


root.post('/api/generate_payload', generatePayloadHandler);
root.post('/api/check_proof', checkProofHandler);
root.get('/api/get_account_info', getAccountInfoHandler);

export default root