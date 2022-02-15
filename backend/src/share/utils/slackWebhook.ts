import fetch from 'node-fetch';

export const slackWebhook = async (text: string) => {
  const url = process.env.SLACK_WEBHOOK;
  if (!url) throw Error('SLACK_WEBHOOK is not defined');

  const body = JSON.stringify({ text });
  // return await import('node-fetch').then(
  // async ({ default: fetch }) =>

  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })
    .then(() => true)
    .catch(() => false);
};
