import { Address, TonClient4 } from "@ton/ton";
import { CHAIN } from "@tonconnect/sdk";
import { Buffer } from "buffer";

export class TonApiService {
  private client: TonClient4 | null;

  public static create(network: CHAIN): TonApiService {
    console.log(network);
    let client: TonClient4 | null = null;

    if (network === CHAIN.MAINNET) {
      client = new TonClient4({
        endpoint: 'https://mainnet-v4.tonhubapi.com'
      });
    } else if (network === CHAIN.TESTNET) {
      client = new TonClient4({
        endpoint: 'https://testnet-v4.tonhubapi.com'
      });
    } else {
      throw new Error(`Unsupported network: ${network}`);
    }

    return new TonApiService(client);
  }

  private constructor(client: TonClient4 | null) {
    this.client = client;
  }

  public async getWalletPublicKey(address: string): Promise<Buffer> {
    if (!this.client) {
      throw new Error('Client is not initialized');
    }
    const masterAt = await this.client.getLastBlock();
    const result = await this.client.runMethod(
      masterAt.last.seqno, Address.parse(address), 'get_public_key', []
    );
    return Buffer.from(result.reader.readBigNumber().toString(16).padStart(64, '0'), 'hex');
  }

  public async getAccountInfo(address: string): Promise<ReturnType<TonClient4['getAccount']>> {
    if (!this.client) {
      throw new Error('Client is not initialized');
    }
    const masterAt = await this.client.getLastBlock();
    return await this.client.getAccount(masterAt.last.seqno, Address.parse(address));
  }
}
