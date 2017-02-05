import React, {PropTypes} from 'react';
import Component from '../../Model';
import isEmpty from 'lodash/isEmpty';
import getPath from 'lodash/get';
import round from '../../utilities/round';
import formatTime from '../../utilities/formatTime';
import numberToCurrency from '../../utilities/numberToCurrency';
// Components
import Divider from 'material-ui/Divider';

export default class Transaction extends Component {
    static propTypes = {
        data: PropTypes.object
    };

    get getTitle() {
        const {
            getIsEmpty,
            props: {data}
        } = this;

        if (getIsEmpty) {
            return;
        }

        return data.text;
    }

    get getAmount() {
        const {
            getIsEmpty,
            props: {data}
        } = this;

        if (getIsEmpty) {
            return;
        }
        
        return numberToCurrency(data.amount);
    }

    get getTime() {
        const {
            getIsEmpty,
            props: {data}
        } = this;

        if (getIsEmpty) {
            return;
        }

        return formatTime(data.transactionDate);
    }

    get getIsEmpty() {
        const {props} = this;
        let data = getPath(props, 'data');

        if (!data) {
            return true;
        }

        return isEmpty(data);
    }

    render() {
        const {
            getIsEmpty,
            getTitle,
            getAmount,
            getTime
        } = this;

        if (getIsEmpty) {
            return null;
        }

        return (
            <div className="row">
                <div className="column">
                    {getTime}
                </div>
                <div className="column absorbing">
                    {getTitle.replace(new RegExp('¦', 'g'), 'ø')}
                </div>
                <div className="column">
                    <span className="prominent">
                        {getAmount}
                    </span>
                </div>
            </div>
        );
    }
}


let transaction = {
    "id": "56d46c75f4c700149df788c0",
    "transactionDate": "2015-01-10T07:46:33Z",
    "transactionDateTimestamp": 1420875993002,
    "merchantCategoryCode": "5411",
    "amount": -26.95,
    "text": "Kvickly Vestbyen, Aalborg Nota nr. C01245",
    "alternativeText": null,
    "reconciled": false,
    "paymentMedia": "CARD_ISO",
    "reserved": false
};
