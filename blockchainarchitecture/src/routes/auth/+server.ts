// src/routes/auth/+server.ts
import { RequestHandler, json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

const jwtSecret = 'test'; 

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const username = data.username;

   

    const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });


    return json({ token }, { status: 200 });

  } catch (error) {
    console.error(error); 
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};
