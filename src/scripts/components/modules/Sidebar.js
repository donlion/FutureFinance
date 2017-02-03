import React, {PropTypes} from 'react';
import Component from '../../Model';
import Theme from '../../utilities/theme';
import {get as getPath} from 'lodash';
// Components
import {
    Card,
    CardHeader,
    CardText,
    Divider
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

    get getTitle() {
        const {data} = this.props;

        let username = getPath(data, 'username');

        if (!username) {
            return 'Loading...';
        }

        return data.username;
    }

    get getUserDetails() {
        const {data} = this.props;

        let output = [];

        let cpr = getPath(data, 'cpr');
        let firstName = getPath(data, 'firstName');
        let lastName = getPath(data, 'lastName');

        if (cpr) {
            output = output.concat(`CPR: ${cpr}`);
        }

        if (firstName) {
            output = output.concat(`First name: ${firstName}`);
        }

        if (lastName) {
            output = output.concat(`Last name: ${lastName}`);
        }

        return output;
    }

    render() {
        const {
            getTitle,
            getUserDetails
        } = this;

        return (
            <Theme>
                <Card>
                    <CardHeader title={getTitle}/>
                        {getUserDetails.map((detail, index) => (
                            <div>
                                {index !== 0 ? <Divider /> : null}
                                <CardText>
                                    {detail}
                                </CardText>
                            </div>
                        ))}
                </Card>
            </Theme>
        );
    }
}
