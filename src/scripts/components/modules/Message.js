import React, {PropTypes} from 'react';
import Component from '../../Model';
import Theme from '../../utilities/theme';
import getPath from 'lodash/get';
// Components
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

export default class Header extends Component {
    static propTypes = {
        data: PropTypes.object
    };

    get getAnswer() {
        const {data} = this.props;

        let answer = getPath(data, 'text');

        if (!answer) {
            return false;
        }

        return answer;
    }

    render() {
        const {getAnswer} = this;

        if (!getAnswer) {
            return null;
        }

        return (
            <Theme>
                <Paper style={{margin: 12}}>
                    <Subheader>Personal assistant</Subheader>
                    <p
                        style={{
                            padding: 16,
                            margin: 0
                        }}
                        className="prominent">
                        {getAnswer}
                    </p>
                </Paper>
            </Theme>
        );
    }
}
