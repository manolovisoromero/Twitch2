const sum = require('./sum.mjs');

describe('sum function', () => {
  it('sums up two integers', () => {
    expect(sum(1, 2)).toEqual(3);
  });
});