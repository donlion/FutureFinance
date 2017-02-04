import moment from 'moment';

/**
 * @name formatTime
 * @param time
 * @returns {string}
 */
export default function formatTime(time) {
    return moment(time).format('HH:mm MMM Do');
}
