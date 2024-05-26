import { Request, Response } from 'express';
import { TonApiService } from '../services/ton-api-service';
import { badRequest, ok, unauthorized } from '../utils/http-utils';
import { decodeAuthToken, verifyToken } from '../utils/jwt';

/**
 * Returns account info.
 *
 * GET /api/get_account_info
 */
const getAccountInfoHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token || !await verifyToken(token)) {
      unauthorized(res, { error: 'Unauthorized' });
      return;
    }

    const payload = decodeAuthToken(token);
    if (!payload?.address || !payload?.network) {
      unauthorized(res, { error: 'Invalid token' });
      return;
    }

    const client = TonApiService.create(payload.network);
    console.log('client ', client)
    const accountInfo = await client.getAccountInfo(payload.address);

    ok(res, accountInfo);
  } catch (e) {
    badRequest(res, { error: 'Invalid request', trace: (e as Error).message });
  }
};

export default getAccountInfoHandler;
