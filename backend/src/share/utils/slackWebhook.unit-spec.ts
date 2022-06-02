import { exec } from 'child_process';
import { slackWebhook } from './slackWebhook';

jest.mock('node-fetch', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((id: string) => {
    return new Promise((res, rej) => {
      res(true);
    });
  }),
}));

beforeEach(() => {
  jest.resetModules();
});

describe('slackWebhook', () => {
  it('is return true when success', async () => {
    process.env.NEST_SLACK_WEBHOOK = 'http://localhost:3000/slack';
    const sut = slackWebhook('hello');

    await expect(sut).resolves.toBe(true);
  });

  it('is return false when failed', async () => {
    process.env.NEST_SLACK_WEBHOOK = 'http://localhost:3000/slack';
    const sut = slackWebhook('hello');

    await expect(sut).resolves.toBe(true);
  });

  it('is throw error if env is not valid url ', async () => {
    process.env.NEST_SLACK_WEBHOOK = 'wrong url';
    const sut = slackWebhook('hello');

    await expect(sut).rejects.toThrowError(TypeError('Invalid URL'));
  });

  it('is throw error if empty env', async () => {
    delete process.env.NEST_SLACK_WEBHOOK;
    const sut = slackWebhook('hello');

    await expect(sut).rejects.toThrowError(Error);
  });
});

describe('first', () => {
  it('', async () => {
    const fn = jest.fn(() => ({
      callers: jest.fn().mockResolvedValue(1),
    }));

    const sut = await fn().callers();

    expect(sut).toEqual(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('', async () => {
    const fn = () => ({ a: 1, b: 1 });

    expect(fn()).toMatchObject({ a: 1 });
  });
});
