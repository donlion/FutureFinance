/**
 * @name numberToCurrency
 * @param _number
 * @returns {*}
 */
export default function numberToCurrency(_number) {
    if (!_number) {
        return 0;
    }

    let number;

    try {
        number = Number(_number);
    } catch(e) {
        return 0;
    }

    return number.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
