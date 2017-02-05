import moment from 'moment';

/**
 * @name formatTime
 * @param time
 * @returns {string}
 */
export default function formatTime(time) {
    return moment.utc(time).local().format('HH:mm MMM Do');
}
