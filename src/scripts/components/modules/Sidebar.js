import React, {PropTypes} from 'react';
import Component from '../../Model';
import Theme from '../../utilities/theme';
import {get as getPath} from 'lodash';
// Components
import {
    Paper,
    Subheader,
    List,
    ListItem
} from 'material-ui';

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

        let cpr = getPath(data, 'cpr');
        let firstName = getPath(data, 'firstName');
        let lastName = getPath(data, 'lastName');
        let username = getPath(data, 'username');

        if (firstName) {
            output = output.concat({
                title: 'First name',
                text: firstName
            });
        }

        if (lastName) {
            output = output.concat({
                title: 'Last name',
                text: lastName
            });
        }
        
        if (!output.length) {
            output.push({
                title: 'Loading',
                text: 'Please have patience'
            });
        }

        return output;
    }

    render() {
        const {getUserDetails} = this;

        return (
            <Theme>
                <Paper zDepth={1}>
                    <List>
                        {getUserDetails.map((detail, index) => (
                            <ListItem
                                key={index}
                                primaryText={detail.title}
                                secondaryText={<p>{detail.text}</p>}
                                disabled={true} />
                        ))}
                    </List>
                </Paper>
            </Theme>
        );
    }
}