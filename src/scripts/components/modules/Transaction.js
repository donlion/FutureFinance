import React, {PropTypes} from 'react';
import Component from '../../Model';
import {
    isEmpty,
    get as getPath
} from 'lodash';
import round from '../../utilities/round';
import moment from 'moment';
// Components
import {
    Divider
} from 'material-ui';

export default class Header extends Component {
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
        
        return round(data.amount);
    }

    get getTime() {
        const {
            getIsEmpty,
            props: {data}
        } = this;

        if (getIsEmpty) {
            return;
        }

        return moment(data.transactionDate).format('HH:mm:ss DD/MM - YYYY')
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
                <div className="column">
                    {getTitle}
                </div>
                <div className="column">
                    {getAmount}
                </div>
                <Divider />
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
