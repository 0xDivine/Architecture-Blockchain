// src/routes/auth/+server.ts
import { RequestHandler, json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

const jwtSecret = 'test'; // Your secret key

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const username = data.username;

    // TODO: Add your registration validation logic here

    const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });

    // TODO: Link the JWT to the username

    return json({ token }, { status: 200 });

  } catch (error) {
    console.error(error); // Log the error for debugging
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};
