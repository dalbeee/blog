import fetch from 'node-fetch';

export const slackWebhook = async (text: string) => {
  const url: URL = new URL(process.env.NEST_SLACK_WEBHOOK as any);

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
