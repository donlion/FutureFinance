import React, {PropTypes} from 'react';
import Component from '../../Model';
import Theme from '../../utilities/theme';
import getPath from 'lodash/get';
// Components
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import {
    List,
    ListItem
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

export default class Header extends Component {
    static propTypes = {
        data: PropTypes.object
    };

    constructor() {
        super();

        this.state = {
            data: {}
        };
    }

    get getUserDetails() {
        const {data} = this.props;

        let output = [];

        let firstName = getPath(data, 'firstName');
        let lastName = getPath(data, 'lastName');
        let accountNumber = getPath(data, 'accountNumber');

        if (firstName || lastName) {
            let name = [].concat(firstName, lastName).filter(item => item).join(' ');

            let props = {
                primaryText: name,
                secondaryText: !accountNumber ? null : (
                    <p>Account: {accountNumber}</p>
                ),
                leftAvatar: (
                    <Avatar src={`https://api.adorable.io/avatars/${name}`} />
                )
            };

            output = output.concat(
                <ListItem {...props} />
            );
        }

        if (!output.length) {
            output.push(
                <ListItem
                    primaryText="Loading..."
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
                    <Subheader>Your profile</Subheader>
                    <List>
                        {getUserDetails}
                    </List>
                </Paper>
            </Theme>
        );
    }
}
