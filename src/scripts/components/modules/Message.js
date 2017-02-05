import React, {PropTypes} from 'react';
import Component from '../../Model';
import Theme from '../../utilities/theme';
import getPath from 'lodash/get';
import formatTime from '../../utilities/formatTime';
// Components
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

export default class Message extends Component {
    static propTypes = {
        data: PropTypes.object
    };

    get getText() {
        const {data} = this.props;

        let text = getPath(data, 'text');
        let type = getPath(data, 'type');
        let className;

        if (!text) {
            return null;
        }

        switch (type) {
            case 'answer':
                className = 'answer';
                break;
            case 'balance':
                className = 'balance';
                break;
            default:
                className = 'prominent';
                break;
        }

        return <span className={className}>{text}</span>;
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

    get getAvatar() {
        const {data} = this.props;

        let avatar = getPath(data, 'avatar');
        let color = getPath(data, 'avatarColor');

        return !avatar ? null : (
            <Avatar
                style={{
                    position: 'relative',
                    top: 5,
                    marginRight: 12
                }}
                backgroundColor="transparent"
                color={color}
                icon={avatar}
                size={30} />
        );
    }

    render() {
        const {
            getText,
            getHeader,
            getTime,
            getAvatar
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
                    <Subheader>
                        {getAvatar}
                        <strong>{getHeader || 'Personal assistant'}</strong>
                        {getTime ? ` - ${formatTime(getTime)}` : null}
                    </Subheader>
                    <p style={{
                        padding: 16,
                        margin: 0
                    }}>
                        {getText}
                    </p>
                </Paper>
            </Theme>
        );
    }
}
