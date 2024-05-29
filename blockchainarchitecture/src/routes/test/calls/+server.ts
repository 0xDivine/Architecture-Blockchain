// src/routes/test/+server.ts

import { json } from '@sveltejs/kit';
import { RequestHandler } from '@sveltejs/kit';
import {main} from '../../../../../fabric-samples/asset-transfer-basic/application-typescript/src/app.ts';


// Connect to the existing wallet using the admin credentials
import { Gateway, GatewayOptions } from 'fabric-network';
import * as path from 'path';

const channelName = 'mychannel';
const chaincodeName = 'basic';

const mspOrg1 = 'Org1MSP';
const walletPath = path.join(path.resolve(path.dirname('')), 'wallet');
const org1UserId = 'typescriptAppUser12';


import { Wallet, Wallets } from 'fabric-network';
import * as fs from 'fs';


console.log('walletPath: ' + walletPath);



const buildWallet = async (walletPath: string): Promise<Wallet> => {
    // Create a new  wallet : Note that wallet is for managing identities.
    let wallet: Wallet;
    wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Built a file system wallet at ${walletPath}`);
    
    return wallet;
};

const buildCCPOrg1 = (): Record<string, any> => {
    // load the common connection configuration file

    
    const ccpPath = path.resolve('/home/irshad/projects/Architecture-Blockchain/fabric-samples', 'test-network',
        'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
    const fileExists = fs.existsSync(ccpPath);
    if (!fileExists) {
        throw new Error(`no such file or directory: ${ccpPath}`);
    }
    const contents = fs.readFileSync(ccpPath, 'utf8');

    // build a JSON object from the file contents
    const ccp = JSON.parse(contents);

    console.log(`Loaded the network configuration located at ${ccpPath}`);
    return ccp;
};

const wallet = await buildWallet(walletPath);

const ccp = buildCCPOrg1();

//console.log('this is my ccp:',ccp);
const userIdentity = await wallet.get(org1UserId);

if (!userIdentity) {
    // SHOW ERROR AND EXIT
}

const gateway = new Gateway();

const gatewayOpts: GatewayOptions = {
    wallet,
    identity: org1UserId,
    discovery: { enabled: true, asLocalhost: true },
}

console.log('yes, we have a gateway', gateway);

        let result;
        try {
            await gateway.connect(ccp, gatewayOpts);
            const network = await gateway.getNetwork(channelName);
            const contract = network.getContract(chaincodeName);
            console.log('yes, we have a contract', contract); 

            console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
            const resultBuffer = await contract.evaluateTransaction('GetAllAssets');
            result = JSON.parse(resultBuffer.toString()); // Convert Buffer to string and parse it as JSON
            console.log('yes, we have a result', result);
        } catch (error) {
            console.error(`******** FAILED to run the application: ${error}`);
            
        }



export const GET: RequestHandler = async () => {
    

     return json(result);
    
};
