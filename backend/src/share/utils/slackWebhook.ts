import fetch from 'node-fetch';
import { getEnv } from './getEnv';

export const slackWebhook = async (text: string) => {
  const url: URL = new URL(getEnv('SLACK_WEBHOOK'));

  try {
  } catch (error) {}

  const body = JSON.stringify({ text });

  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })
    .then(() => true)
    .catch((e) => {
      throw e;
    });
};
