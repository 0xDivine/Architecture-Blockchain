import { RequestHandler, json } from '@sveltejs/kit';
import nano from 'nano';
import { getAsset } from './test.js';

const username = 'admin'; // replace with your actual username
const password = 'adminpw'; // replace with your actual password
const dbUrl = `http://${username}:${password}@localhost:5984`;

const dbName = 'mychannel_basic'; // replace with your actual database name
const couchdb = nano(dbUrl).use(dbName);



export const GET: RequestHandler = async ({ params }) => {
    const assetId = 1;
    const asset = await getAsset(assetId);
    return json(asset);
   
  };