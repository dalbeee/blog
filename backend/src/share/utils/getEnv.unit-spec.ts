import { getEnv } from './getEnv';

describe('getEnv', () => {
  it('throw error if env is undefined | null', async () => {
    delete process.env.Data;

    const sut = () => getEnv('Data');

    expect(sut).toThrowError(Error);
    expect(sut).toThrowError('is not defined');
  });

  it('success return env data', async () => {
    process.env.Data = 'data';

    const sut = getEnv('Data');

    expect(sut).toEqual('data');
  });
});
