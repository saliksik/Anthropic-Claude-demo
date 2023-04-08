// src/pages/api/auth.ts
import { APIRoute } from 'astro';

const validPassword = import.meta.env.SITE_PASSWORD;// Replace 'your_password_here' with your desired password.

export const post: APIRoute = async (context) => {
  const requestBody = await context.request.json();
  const { pass } = requestBody;

  if (pass === validPassword) {
    return new Response(JSON.stringify({ code: 0 }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    return new Response(JSON.stringify({ code: 1, message: 'Invalid password' }), {
      status: 403,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};