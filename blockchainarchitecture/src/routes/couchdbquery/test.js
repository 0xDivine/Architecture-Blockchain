import nano from 'nano';
import { get } from 'svelte/store';


const username = 'admin'; // replace with your actual username
const password = 'adminpw'; // replace with your actual password
const dbUrl = `http://${username}:${password}@localhost:5984`;

const dbName = 'mychannel_basic'; // replace with your actual database name
const couchdb = nano(dbUrl).use(dbName);
console.log(couchdb);




export const getAsset = async (assetId) => {
  
    const asset = await couchdb.get(assetId);
    const assetJson = JSON.stringify(asset);
    console.log('Asset is: ' + assetJson);
    return assetJson;
};

getAsset('1');

