/**
 * @name TOKEN
 * @type {string}
 */
export const token = "dXNlcjAyOTptekRQQWdyaktOVjY=";

/**
 * @name userId
 * @type {string}
 */
export const userId = '4574000018';

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

/**
 * @name endpointCustom
 * @type {string}
 */
const endpointCustom = 'http://sample-env.srscfu9ecf.eu-west-1.elasticbeanstalk.com/api';

/**
 * @name endpointFeed
 * @type {string}
 */
export const endpointFeed = `${endpointCustom}/feed`;

/**
 * @name endpointBalance
 * @type {string}
 */
export const endpointBalance = `${endpointCustom}/balance`;

/**
 * @name endpointStatus
 * @type {string}
 */
export const endpointStatus = `${endpointCustom}/status`;

/**
 * @name endpointSpendings
 * @type {string}
 */
export const endpointSpendings = `${endpointCustom}/spending`;
