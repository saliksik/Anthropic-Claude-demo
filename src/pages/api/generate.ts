// src/pages/api/generate.ts
import { generatePayload, parseAnthropicStream } from '@/utils/anthropicAPI';
import type { APIRoute } from 'astro';

const apiKey = import.meta.env.ANTHROPIC_API_KEY;
const baseUrl = (import.meta.env.ANTHROPIC_API_BASE_URL || 'https://api.anthropic.com').trim().replace(/\/$/, '');

export const post: APIRoute = async (context) => {
  const body = await context.request.json();
  const { prompt } = body;

  const initOptions = generatePayload(apiKey, prompt);

  const response = await fetch(`${baseUrl}/v1/complete`, initOptions).catch((err: Error) => {
    console.error(err);
    return new Response(
      JSON.stringify({
        error: {
          code: err.name,
          message: err.message,
        },
      }),
      { status: 500 },
    );
  }) as Response;

  return parseAnthropicStream(response) as Response;
};
