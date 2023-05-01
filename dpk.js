const crypto = require("crypto");

// Constants for default partition key and maximum length
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

/**
 * A helper function to generate a partition key for an event if none exists.
 * @param {object} event - The event to generate a partition key for.
 * @returns {string} - The partition key for the event.
 */
function generateCandidatePartitionKey(event) {
  // If event is falsy, return the trivial partition key
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  // If event has a partition key, return it
  if (event.partitionKey) {
    return event.partitionKey;
  }

  // Otherwise, generate a SHA3-512 hash of the event data and return it
  const data = JSON.stringify(event);
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

/**
 * A helper function to ensure the event's partition key is a string.
 * @param {string} candidate - The candidate to generate a partition key for.
 * @returns {string} - The partition key for the event.
 */
function ensurePartitionKeyIsString(candidate) {
  // If candidate is already a string, return it
  if (typeof candidate === "string") {
    return candidate;
  }

  // Otherwise, convert it to a JSON string and return it
  return JSON.stringify(candidate);
}

/**
 * A helper function that generates final partition key for an event.
 * @param {object} candidate - The candidate to generate a final partition key for.
 * @returns {string} - The partition key for the event.
 */
function generateFinalPartitionKey(candidate) {
  // If the length of the candidate partition key is less than or equal to the maximum length,
  // return it as is
  if (candidate.length <= MAX_PARTITION_KEY_LENGTH) {
    return candidate;
  }

  // Otherwise, generate a SHA3-512 hash of the candidate partition key and return it
  return crypto.createHash("sha3-512").update(candidate).digest("hex");
}

/**
 * Main function that generates a deterministic partition key from an event
 * Generates a deterministic partition key for an event.
 * @param {object} event - The event to generate a partition key for.
 * @returns {string} - The partition key for the event.
 */
function deterministicPartitionKey(event) {
  // Generate the candidate partition key
  const candidate = generateCandidatePartitionKey(event);

  // Ensure the candidate partition key is a string
  const partitionKey = ensurePartitionKeyIsString(candidate);

  // Generate the final partition key
  const finalPartitionKey = generateFinalPartitionKey(partitionKey);

  // Return the final partition key
  return finalPartitionKey;
}

// Export the main function
module.exports = {
  deterministicPartitionKey,
};
