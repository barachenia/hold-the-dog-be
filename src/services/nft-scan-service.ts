import axios from 'axios';

export class NTFScanService {
    NFTList: any[] = [];
    collectionAddress: string | undefined = process.env.NTF_COLLECTION_ADDRESS
    tonApiToken: string | undefined = process.env.TON_API_KEY

    // constructor(NFTHolderAddess: string) {
    //     this.getNFTList(NFTHolderAddess)
    // }

    async getNFTList(NFTHolderAddess: string) {
        if(this.collectionAddress && this.tonApiToken) {
            try {
                const response = await axios.get(`https://tonapi.io/v2/accounts/${NFTHolderAddess}/nfts`, {
                    params: {
                        collection: this.collectionAddress,
                        limit: 1000,
                        offset: 0,
                        indirect_ownership: false
                    },
                    headers: {
                        Authorization: `Bearer ${this.tonApiToken}`,
                        'Content-type': 'application/json'
                    }
                });
                return response.data;
            } catch (e) {
                console.log(e);
            }
        }
    }
}