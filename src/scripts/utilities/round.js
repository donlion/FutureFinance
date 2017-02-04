/**
 * @name round
 * @param value
 * @param decimals
 * @returns {number}
 */
export default function round(value) {
    if (!value) {
        return 0;
    }

    let decimals = 2;

    let output = Number(Math.round(value+'e'+decimals)+'e-'+decimals);

    return output !== NaN ? output : 0;
};
