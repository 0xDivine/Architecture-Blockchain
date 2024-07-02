/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import {Asset} from './asset';

/*
 * SPDX-License-Identifier: Apache-2.0
 */


@Info({title: 'Farmer smart contract ', description: 'Farmer, peers, nodes'})
export class AssetTransferContract extends Contract {
     //collection for private data
    private collection = 'SupermarketPrivateData';

    @Transaction()
public async InitLedger(ctx: Context): Promise<void> {
    const assets: Asset[] = [
        {
            ID: '1',
            ProductName: 'Banana',
            Owner: 'Farmer Bob',
        },
        {
            ID: '2',
            ProductName: 'Apple',
            Owner: 'Farmer Bob',
        },
    ];

    for (const asset of assets) {
        await ctx.stub.putState(asset.ID, Buffer.from(JSON.stringify(asset)));
        console.info(`Asset ${asset.ID} initialized`);
    }
}
    // CreateAsset issues a new asset to the world state with given details.
    @Transaction()
    public async CreateAsset(ctx: Context, id: string, productName: string, owner: string): Promise<void> {
        const asset: Asset = { ID: id, ProductName: productName, Owner: owner };
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(asset)));
    }


 // Authorization function, however not implemented further due to extra authorized organization
 @Transaction()
 public async Authorize(ctx: Context, id: string, authorizedOrg: string): Promise<void> {
     // Check if the caller has the 'authority' role
     const clientMSPID = ctx.clientIdentity.getMSPID();
     if (clientMSPID !== 'authorityMSP') { // Replace with your actual authority MSP ID
         throw new Error('Only the authority can authorize assets');
     }

     // Mark the asset as authorized 
     const assetString = await this.ReadAsset(ctx, id);
     const asset = JSON.parse(assetString);
     asset.Authorized = true;
     await ctx.stub.putState(id, Buffer.from(JSON.stringify(asset)));
 }



    // ReadAsset returns the asset stored in the world state with given id.
    @Transaction(false)
    public async ReadAsset(ctx: Context, id: string): Promise<string> {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }

    // read private data also not implemented further due to extra authorized organization
    @Transaction(false)
    public async ReadAssetPrivateDetails(ctx: Context, id: string): Promise<string> {
        const clientMSPID = ctx.clientIdentity.getMSPID();
        if (clientMSPID !== 'authorityMSP') { 
            throw new Error('Only the authority can read the private asset data');
        }
  
        const assetPrivateData = await ctx.stub.getPrivateData(this.collection, id);
        if (!assetPrivateData || assetPrivateData.length === 0) {
            throw new Error(`Private data for asset ${id} does not exist`);
        }
        return assetPrivateData.toString();
    }

    // TransferAsset updates the owner field of asset with given id in the world state.
    @Transaction()
    public async TransferAsset(ctx: Context, id: string, newOwner: string): Promise<void> {
        const assetString = await this.ReadAsset(ctx, id);
        const asset: Asset = JSON.parse(assetString);
        asset.Owner = newOwner;
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(asset)));
    }

    // GetAllAssets returns all assets found in the world state.
    @Transaction(false)
    public async GetAllAssets(ctx: Context): Promise<string> {
        const allResults = [];
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
}