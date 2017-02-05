import React, {PropTypes} from 'react';
import Component from '../../Model';
import Theme from '../../utilities/theme';
import getPath from 'lodash/get';
// Components
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import {
    List,
    ListItem
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

export default class Sidebar extends Component {
    static propTypes = {
        data: PropTypes.object,
        events: PropTypes.object
    };

    constructor() {
        super();

        this.state = {
            data: {}
        };
    }

    get getUserDetails() {
        const {
            data,
            events: {
                logout,
                fetchBalance,
                fetchStatus,
                fetchSpendings
            }
        } = this.props;

        let output = [];

        let firstName = getPath(data, 'firstName');
        let lastName = getPath(data, 'lastName');
        let accountNumber = getPath(data, 'accountNumber');

        if (firstName || lastName) {
            let name = [].concat(firstName, lastName).filter(item => item).join(' ');

            let props = {
                key: 'account',
                primaryText: name,
                disabled: true,
                secondaryText: !accountNumber ? null : (
                    <p>Account: {accountNumber}</p>
                ),
                leftAvatar: (
                    <Avatar src={`/static/avatar.jpg`} />
                )
            };

            output = output.concat(
                <ListItem {...props} />
            );
        }

        if (fetchBalance) {
            output = output.concat(
                <ListItem
                    key="fetchBalance"
                    primaryText="Show my balance"
                    onClick={fetchBalance} />
            );
        }

        if (fetchStatus) {
            output = output.concat(
                <ListItem
                    key="fetchStatus"
                    primaryText="Show my progress"
                    onClick={fetchStatus} />
            );
        }

        if (fetchSpendings) {
            output = output.concat(
                <ListItem
                    key="fetchSpendings"
                    primaryText="Show my latest transactions"
                    onClick={fetchSpendings} />
            );
        }

        if (logout) {
            output = output.concat(
                <FlatButton
                    key="signout"
                    style={{
                        margin: '8px 16px',
                        width: 'calc(100% - 32px)'
                    }}
                    label="Sign out"
                    secondary={true}
                    onClick={logout} />
            );
        }

        if (!output.length) {
            output.push(
                <ListItem
                    key="loading"
                    primaryText="Loading..."
                    disabled={true}
                    secondaryText={<p>Please have patience</p>}
                />
           );
        }

        return output;
    }

    render() {
        const {getUserDetails} = this;

        return (
            <Theme>
                <Paper
                    style={{margin: 12}}
                    zDepth={1}>
                    <List>
                        {getUserDetails}
                    </List>
                </Paper>
            </Theme>
        );
    }
}
