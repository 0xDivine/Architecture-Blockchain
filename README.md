# Blockchain Architecture
This project delves into the practical implementation and exploration of private blockchain technology, leveraging Hyperledger Fabric as the foundation.

## Use Case
We want supermarkets to be able to get valid authenticity from the bio-labeled products that farmers offer. We don't want a product that is labeled as bio to contain added sugars or something. We also want to give farmers the freedom to facilitate their own prices per supermarket. So on the one hand we help supermarkets validating authenticity of the products and on the other hand we help farmers get fair prices for their products. 

We came up with the fictional company BIOMart for this use case. Farmers apply to this company, and then BIOMart is doing all the other work. A farmer can list a product, the product will be validated by an authority. Upon succesful validation, the product can be listed in the supermarket with a label 'BIO product validated by BIOMart'. 


## Web application functionality

![web functionality](https://i.imgur.com/ofp1EVt.png)

**This diagram defines the core functionality of the web application:**

1. Registration: A user initiates the registration process. Upon successful registration, a JWT (JSON Web Token) is generated for authentication, and a Hyperledger Fabric wallet is created for the user. The wallet's identity is assigned to the user 

2. Asset Creation: When a user intends to create an asset, the front-end application validates the user's JWT token for authentication. If the JWT is valid, the request proceeds. The request is then passed to the back-end, which validates the user's wallet. 

3. Blockchain Interaction: Upon successful validation, the back-end interacts with the Hyperledger Fabric blockchain, using the validated wallet to create the asset.



### Software Architecture
![Software architecture](https://i.imgur.com/V5Xw6sK.png)

We use sveltekit for the front-end, and back-end. SvelteKit is a full-stack framework. 
Sveltekit will interact with HLF and the Kaleido-deployed HLF Blockchain.



## Blockchain Flow

![Flow](https://i.imgur.com/QrdslSE.png)

The sequence flow is as follows:

**Registering user**
1. Unregistered user will register.
2. Upon registration, a JWT token is generated that includes the clients information. At the same time a wallet is generated for that user.
3. Now the client has a wallet**

   


**Creating asset** 

When the create asset functionality is called, on the front-end it will validate the JWT token, and on the backend it will validate that the username matches within the digital certificate of the client.





## HLF Configuration

**Network**

![Netowork](https://i.imgur.com/OZm2HdP.png)

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

The chaincode during the demo is to be found in **blockchainarchitecture/chaincode/chaincode-demo**

The demo chaincode was a perfect example to illustrate the workings of HLF



**Use case chaincode**

The chaincode for the specific use case can be found in **blockchainarchitecture/chaincode/chaincode-usecase**

**Important Notice:** We did not use the specific use case chaincode because we did not have the correct network configuration set. (Used the default network.sh)
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

```js export const POST: RequestHandler = async ({ request }) => {
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
      }
```
 
