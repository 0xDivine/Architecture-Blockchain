# Architecture-Blockchain
This project focuses on setting up a private blockchain.

## Web application

### Software Architecture
(https://i.imgur.com/V5Xw6sK.png)

We use sveltekit for the front-end, and back-end. SvelteKit is a full-stack framework. 
Sveltekit will interact with HLF and the Kaleido-deployed HLF Blockchain.

## Blockchain Flow

(https://i.imgur.com/QrdslSE.png)

The sequence flow is as follows:

**Registering user**
1. Unregistered user will register.
2. Upon registration, a JWT token is generated that includes the clients information. At the same time a wallet is generated for that user.
3. Now the client has a wallet**


**Creating asset** 

When the create asset functionality is called, on the front-end it will validate the JWT token, and on the backend it will validate that the username matches within the digital certificate of the client.



## HLF Configuration

**Network**
(https://i.imgur.com/OZm2HdP.png)

The network consists of a public network, and private data. The private data is shared only among farmers and supermarkets. 

**Assets**

The assets for this use case will be farmer grown foods. Such as fruits, vegetables but also nuts, honey etc.

The asset will have the following attributes:

ID, ProductName, Owner

**Roles**
We have farmers, authority and supermarkets defined as roles.

Digital certificates are saved in: blockchainarchitecture/wallet


### Chaincode

**Demo chaincode**
The chaincode during the demo is to be found in fabric-samples/chaincode-typescript

The demo chaincode was a perfect example to illustrate the workings of HLF

**Use case chaincode**

The chaincode for the specific use case can be found in fabric-samples/chaincode-typescript-bio
We did not use the specific use case chaincode because we did not have the correct network configuration set. (Used the default network.sh)
We also figured that our specific use case chaincode did not bear the necessary results without having customized the channels and MSP's etc. This is why we stayed with the demochaincode. Some functions like private data are commented out, but they are implemented on the chaincode. 



## API calls

`/auth` - This endpoint is used for creating a JWT token
`/createasset` - This endpoint is allowing a user to create an asset on the blockchain. 
`/showallassets` - This endpoint is displaying all assets currently listed on the blockchain.
`/cloud` - This endpoint is used to interact with Kaleido (Cloud HLF deployment). This API endpoint only shows all identities created on Kaleido.





## Security

We use JWT on front-end
We use digital certificates on blockchain.
We use validation checks on API call

**Code snippet example of security:**

```export const POST: RequestHandler = async ({ request }) => {
    try {
      // 1. Get JWT token & verify
      const authHeader = request.headers.get('authorization');
      if (!authHeader) {
        return json({ error: 'Unauthorized' }, { status: 401 });
      }
      const token = authHeader.split(' ')[1];
      const decodedToken = jwt.verify(token, jwtSecret);
      const owner = decodedToken.username;
  
      // 2. Parse request body (where asset data is sent)
      const { id, color, size, appraisedValue } = await request.json(); 
  
      // 3. Input Validation 
      if (!id || !color || !size || !appraisedValue) {
        return json({ error: 'Missing required asset data' }, { status: 400 });
      }```
 
