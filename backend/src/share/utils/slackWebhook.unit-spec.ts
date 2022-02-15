import { slackWebhook } from './slackWebhook';

describe('slackWebhook', () => {
  it('is return true when success', async () => {
    const result = slackWebhook('hello');

    await expect(result).resolves.toBe(true);
  });
});
