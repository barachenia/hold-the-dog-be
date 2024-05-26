import { Request, Response } from 'express';
import { CheckProofRequest } from '../dto/check-proof-request-dto';
import { TonApiService } from '../services/ton-api-service';
import { TonProofService } from '../services/ton-proof-service';
import { createAuthToken, verifyToken } from '../utils/jwt';
import { ok, badRequest } from '../utils/http-utils';

/**
 * Checks the proof and returns an access token.
 *
 * POST /api/check_proof
 */ 
const checkProofHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = CheckProofRequest.parse(req.body);

    const client = TonApiService.create(body.network);
    const service = new TonProofService();

    const isValid = await service.checkProof(body, (address: string) => client.getWalletPublicKey(address));
    if (!isValid) {
      badRequest(res, { error: 'Invalid proof' });
      return;
    }

    const payloadToken = body.proof.payload;
    if (!await verifyToken(payloadToken)) {
      badRequest(res, { error: 'Invalid token' });
      return;
    }

    const token = await createAuthToken({ address: body.address, network: body.network });

    ok(res, { token });
  } catch (e) {
    badRequest(res, { error: 'Invalid request', trace: (e as Error).message });
  }
};

export default checkProofHandler;
