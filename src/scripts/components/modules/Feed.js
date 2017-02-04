import React, {PropTypes} from 'react';
import Component from '../../Model';
import getPath from 'lodash/get';
// Components
import Message from './Message';
import Transactions from './Transactions';
import ReactTransitionGroup from 'react-addons-css-transition-group';

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
                            text: getPath(data, 'feed.balance'),
                            time: time
                        }} />
                );
                break;
            case 'answer':
                title = getPath(data, 'title');
                text = getPath(data, 'feed.text');
                time = getPath(data, 'feed.created_at');

                component = (!title || !text) ? null : (
                    <Message
                        key={id}
                        data={{
                            header: title,
                            text: text,
                            time: time
                        }} />
                );
                break;
            case 'transaction':
                transactions = getPath(data, 'feed');

                component = (!transactions || !transactions.length) ? null : (
                    <Transactions
                        key={id}
                        data={{transactions}} />
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
                <h1>Feed</h1>
                <ReactTransitionGroup
                    component="div"
                    className="body"
                    transitionName="animated">
                    {getFeed.map(item => createComponent(item))}
                </ReactTransitionGroup>
            </div>
        );
    }
}
