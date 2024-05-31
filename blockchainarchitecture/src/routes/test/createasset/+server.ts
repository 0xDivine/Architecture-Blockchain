// src/routes/test/+server.ts

import { json } from '@sveltejs/kit';
import { RequestHandler } from '@sveltejs/kit';
import {main} from '../../../../../fabric-samples/asset-transfer-basic/application-typescript/src/app.ts';
import { Gateway, GatewayOptions } from 'fabric-network';
import * as path from 'path';
import { buildCAClient, enrollAdmin, registerAndEnrollUser } from '../../../../../fabric-samples/asset-transfer-basic/application-typescript/src/utils/CAUtil.ts';
import { Wallet, Wallets } from 'fabric-network';
import * as fs from 'fs';

const channelName = 'mychannel';
const chaincodeName = 'basic';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(path.resolve(path.dirname('')), 'wallet');
const owner = 'typescriptUser3';

const buildWallet = async (walletPath: string): Promise<Wallet> => {
    let wallet: Wallet;
    wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Built a file system wallet at ${walletPath}`);
    return wallet;
};

const buildCCPOrg1 = (): Record<string, any> => {
    const ccpPath = path.resolve('/home/irshad/projects/Architecture-Blockchain/fabric-samples', 'test-network',
        'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
    const fileExists = fs.existsSync(ccpPath);
    if (!fileExists) {
        throw new Error(`no such file or directory: ${ccpPath}`);
    }
    const contents = fs.readFileSync(ccpPath, 'utf8');
    const ccp = JSON.parse(contents);
    console.log(`Loaded the network configuration located at ${ccpPath}`);
    return ccp;
};

const connectToNetwork = async (userId: string) => {
    const wallet = await buildWallet(walletPath);
    const ccp = buildCCPOrg1();
    const caClient = buildCAClient(ccp, 'ca.org1.example.com');

    let adminIdentity = await wallet.get('admin');
    if (!adminIdentity) {
        console.log(`Admin Identity not found in wallet, enrolling Admin...`);
        await enrollAdmin(caClient, wallet, mspOrg1);
        
    }

    let userIdentity = await wallet.get(userId);

    if (!userIdentity) {
        console.log (`No User Identity found in wallet: creating wallet`);
        // just first time admin needs to be enrolled
        // await enrollAdmin(caClient, wallet, mspOrg1);
        // console.log (`Enrolling admin...`);
        await registerAndEnrollUser(caClient, wallet, mspOrg1, userId, 'org1.department1');
        console.log (`Registering and enrolling user...`);
        userIdentity = await wallet.get(userId);
    }

    const gateway = new Gateway();
    const gatewayOpts: GatewayOptions = {
        wallet,
        identity: userId,
        discovery: { enabled: true, asLocalhost: true },
    }
    await gateway.connect(ccp, gatewayOpts);
    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);

    return { contract, gateway };
}

const getAllAssets = async (contract: any) => {
    const resultBuffer = await contract.evaluateTransaction('GetAllAssets');
    const result = JSON.parse(resultBuffer.toString());
    console.log('yes, we have a result', result);
    return result;
}

async function createAsset(contract, id, color, size, owner, appraisedValue) {
    const result = await contract.submitTransaction('CreateAsset', id, color, size, owner, appraisedValue);
    console.log('Asset created: ', result);
}



export const GET: RequestHandler = async () => {
    const { contract, gateway } = await connectToNetwork(owner);
    const result = await createAsset(contract, 'asset7', 'blue', '5', owner, '300');
    gateway.disconnect();
    return json(result);
};