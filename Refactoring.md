# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

`deterministicPartitionKey()`
This is a JavaScript function that generates a deterministic partition key for an event. A partition key is used in distributed systems to determine which node or shard should process an event. The goal of this function is to generate a partition key that is consistent for a given event, so that the same event will always be processed by the same node or shard.

- I have separated the functionality of the original function into three separate helper functions: `generateCandidatePartitionKey`, `ensurePartitionKeyIsString`, and `generateFinalPartitionKey`. I also moved the constants `TRIVIAL_PARTITION_KEY` and `MAX_PARTITION_KEY_LENGTH` outside of the main function.

- The `generateCandidatePartitionKey` function checks if the input event is defined and has a partition key defined. If not, it generates a SHA3-512 hash of the event data. This function returns the candidate partition key.

- The `ensurePartitionKeyIsString` function checks if the candidate partition key is already a string. If not, it converts it to a JSON string. This function returns the partition key as a string.

- The `generateFinalPartitionKey` function checks if the length of the partition key is greater than the maximum length. If it is, it generates a new SHA3-512 hash of the partition key. This function returns the final partition key.

- The `deterministicPartitionKey` function now calls these helper functions in a more organized way. It first generates the candidate partition key using the `generateCandidatePartitionKey` function. It then ensures that the partition key is a string using the `ensurePartitionKeyIsString` function. Finally, it generates the final partition key using the `generateFinalPartitionKey` function and returns it.

- The codebase now features line-by-line comments and annotations for easier readability
