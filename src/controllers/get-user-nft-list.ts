import { Request, Response } from 'express';
import { TonApiService } from '../services/ton-api-service';
import { badRequest, ok, unauthorized } from '../utils/http-utils';
import { decodeAuthToken, verifyToken } from '../utils/jwt';
import { NTFScanService } from '../services/nft-scan-service';

/**
 * Returns account info.
 *
 * GET /api/get_account_info
 */
const getAccountNftList = async (req: Request, res: Response): Promise<void> => {
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

    const NFTService = new NTFScanService()
    const NFTs = await NFTService.getNFTList(payload.address)

    ok(res, NFTs);

  } catch (e) {
    badRequest(res, { error: 'Invalid request', trace: (e as Error).message });
  }
};

export default getAccountNftList;
