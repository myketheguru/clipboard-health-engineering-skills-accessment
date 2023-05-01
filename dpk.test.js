const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("returns default partition key when no event is provided", () => {
    const expected = "0";
    const actual = deterministicPartitionKey();
    expect(actual).toEqual(expected);
  });

  it("returns partition key from event when defined", () => {
    const event = { partitionKey: "test-key" };
    const expected = "test-key";
    const actual = deterministicPartitionKey(event);
    expect(actual).toEqual(expected);
  });

  it("generates partition key from event when not defined", () => {
    const event = { key: "value" };
    const data = JSON.stringify(event);
    const hash = crypto.createHash("sha3-512").update(data).digest("hex");
    const expected = hash;
    const actual = deterministicPartitionKey(event);
    expect(actual).toEqual(expected);
  });

  it("converts candidate partition key to string when not already a string", () => {
    const event = { key: "value" };
    const data = JSON.stringify(event);
    const hash = crypto.createHash("sha3-512").update(data).digest("hex");
    const candidate = Buffer.from(hash);
    const expected = hash;
    const actual = deterministicPartitionKey({ key: candidate });
    expect(actual).toEqual(expected);
  });

  it("truncates partition key when too long", () => {
    const event = { key: "value" };
    const data = JSON.stringify(event);
    const hash = crypto.createHash("sha3-512").update(data).digest("hex");
    const longKey = hash.repeat(100);
    const expected = crypto
      .createHash("sha3-512")
      .update(longKey)
      .digest("hex");
    const actual = deterministicPartitionKey({ key: longKey });
    expect(actual).toEqual(expected);
  });

  it("generates different partition keys for different events", () => {
    const event1 = { key1: "value1" };
    const event2 = { key2: "value2" };
    const actual1 = deterministicPartitionKey(event1);
    const actual2 = deterministicPartitionKey(event2);
    expect(actual1).not.toEqual(actual2);
  });
});
