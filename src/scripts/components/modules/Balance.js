import React, {PropTypes} from 'react';
import Component from '../../Model';
import Theme from '../../utilities/theme';
import getPath from 'lodash/get';
// Components
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import CardText from 'material-ui/Card';

export default class Balance extends Component {
    static propTypes = {
        data: PropTypes.object
    };

    get getBalance() {
        const {data} = this.props;

        let balance = getPath(data, 'balance');

        if (!balance) {
            return false;
        }

        return balance;
    }

    render() {
        const {getBalance} = this;

        if (!getBalance) {
            return null;
        }

        return (
            <Theme>
                <Paper style={{margin: 12}}>
                    <Subheader>Current balance</Subheader>
                    <p
                        style={{
                            padding: 16,
                            margin: 0
                        }}
                        className="prominent">
                        {getBalance}
                        </p>
                </Paper>
            </Theme>
        );
    }
}
