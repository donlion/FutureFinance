/**
 * @name TOKEN
 * @type {string}
 */
export const token = "dXNlcjAyOTptekRQQWdyaktOVjY=";

/**
 * @name userId
 * @type {string}
 */
export const userId = '4574000002';

/**
 * endpoint
 * @type {string}
 */
const endpoint = 'http://api.futurefinance.io/api';

/**
 * @name endpointAccount
 * @type {string}
 */
export const endpointAccount = `${endpoint}/accounts/${userId}`;

/**
 * @name endpointTransactions
 * @type {string}
 */
export const endpointTransactions = `${endpoint}/accounts/${userId}/transactions`;
