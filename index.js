const { deterministicPartitionKey } = require("./dpk");

console.log(deterministicPartitionKey({ key: "value" }));
