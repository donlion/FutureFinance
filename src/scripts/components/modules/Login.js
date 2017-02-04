import React, {PropTypes} from 'react';
import Component from '../../Model';
import Theme from '../../utilities/theme';
// Components
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';

export default class Login extends Component {
    static propTypes = {
        events: PropTypes.shape({
            action: PropTypes.func.required
        })
    };

    render() {
        const {events: {action}} = this.props;

        return (
            <Theme>
                <Paper style={{
                    margin: '12px auto',
                    maxWidth: '300px',
                    width: '100%'
                }}>
                    <Subheader>Sign in</Subheader>
                    <RaisedButton
                        label="Sign in to PBA"
                        primary={true}
                        style={{
                            margin: 16
                        }}
                        onClick={action} />
                </Paper>
            </Theme>
        );
    }
}
