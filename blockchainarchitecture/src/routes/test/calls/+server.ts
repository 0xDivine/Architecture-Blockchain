// src/routes/test/helloworld/+server.ts

import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    return new Response(JSON.stringify({ message: 'Hello, World! This is edited' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    }); 
};
