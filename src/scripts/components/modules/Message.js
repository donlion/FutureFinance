import React, {PropTypes} from 'react';
import Component from '../../Model';
import Theme from '../../utilities/theme';
import getPath from 'lodash/get';
import formatTime from '../../utilities/formatTime';
// Components
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

export default class Message extends Component {
    static propTypes = {
        data: PropTypes.object
    };

    get getText() {
        const {data} = this.props;

        let text = getPath(data, 'text');

        if (!text) {
            return false;
        }

        return text;
    }

    get getHeader() {
        const {data} = this.props;

        let header = getPath(data, 'header');

        return header || false;
    }

    get getTime() {
        const {data} = this.props;

        let time = getPath(data, 'time');

        return time || false;
    }

    render() {
        const {
            getText,
            getHeader,
            getTime
        } = this;

        if (!getText) {
            return null;
        }

        return (
            <Theme>
                <Paper
                    className="message"
                    transitionEnabled={false}
                    style={{margin: 12}}>
                    <Subheader>{getHeader || 'Personal assistant'}{getTime ? ` - ${formatTime(getTime)}` : null}</Subheader>
                    <p style={{
                        padding: 16,
                        margin: 0
                    }}>
                        <span className="prominent">{getText}</span>
                    </p>
                </Paper>
            </Theme>
        );
    }
}
