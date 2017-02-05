import React, {PropTypes} from 'react';
import Component from '../../Model';
import getPath from 'lodash/get';
import numberToCurrency from '../../utilities/numberToCurrency';
// Components
import Message from './Message';
import Transactions from './Transactions';
import ReactTransitionGroup from 'react-addons-css-transition-group';
// Icons
import AccountBalance from 'material-ui/svg-icons/action/account-balance';
import QuestionAnswer from 'material-ui/svg-icons/action/question-answer';
// Colors
import {
    green500 as colorBalance,
    purple500 as colorStatus
} from 'material-ui/styles/colors';

export default class Feed extends Component {
    static propTypes = {
        data: PropTypes.shape({
            feed: PropTypes.array
        })
    };

    createComponent(data) {
        let type = getPath(data, 'type');

        if (!type) {
            return null;
        }

        let component;
        let text;
        let title;
        let time;
        let transactions;
        let id = getPath(data, 'id');

        if (type === 'answer') {
            console.log('answer', data);
        }

        switch (type) {
            case 'balance':
                text = getPath(data, 'feed.balance');
                title = 'Your balance';
                time = getPath(data, 'feed.created_at');

                component = !text ? null : (
                    <Message
                        key={id}
                        data={{
                            header: title,
                            text: numberToCurrency(text),
                            time,
                            avatar: <AccountBalance />,
                            avatarColor: colorBalance
                        }} />
                );
                break;
            case 'answer':
                title = getPath(data, 'feed.title');
                text = getPath(data, 'feed.text');
                time = getPath(data, 'feed.created_at');

                component = (!title || !text) ? null : (
                    <Message
                        key={id}
                        data={{
                            header: title,
                            text,
                            time,
                            avatar: <QuestionAnswer />,
                            avatarColor: colorStatus
                        }} />
                );
                break;
            case 'transactions':
                transactions = getPath(data, 'feed');
                title = getPath(data, 'title');
                time = getPath(data, 'feed.created_at');

                component = (!transactions || !transactions.length) ? null : (
                    <Transactions
                        key={id}
                        data={{
                            transactions,
                            time,
                            header: title
                        }} />
                );
                break;
            default:
                component = null;
                break;
        }

        return component;
    }

    get getFeed() {
        const {feed} = this.props.data;

        if (!feed) {
            return [];
        }

        return feed;
    }

    render() {
        const {
            createComponent,
            getFeed
        } = this;

        return (
            <div>
                <ReactTransitionGroup
                    component="div"
                    className="body"
                    transitionName="animated"
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={400}>
                    {getFeed.map(item => createComponent(item))}
                </ReactTransitionGroup>
            </div>
        );
    }
}
