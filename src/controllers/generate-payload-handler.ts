import { Request, Response } from 'express';
import { TonProofService } from '../services/ton-proof-service';
import { createPayloadToken } from '../utils/jwt';
import { ok, badRequest } from '../utils/http-utils';

/**
 * Generates a payload for ton proof.
 *
 * POST /api/generate_payload
 */
const generatePayloadHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = new TonProofService();

    const payload = service.generatePayload();
    const payloadToken = await createPayloadToken({ payload });
    console.log(payloadToken);

    ok(res, { payload: payloadToken });
  } catch (e) {
    badRequest(res, { error: 'Invalid request', trace: (e as Error).message });
  }
};

export default generatePayloadHandler;
