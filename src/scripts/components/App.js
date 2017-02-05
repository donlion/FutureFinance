import React from 'react';
import Component from '../Model';
import request from '../utilities/request';
import union from 'lodash/union';
import mergeWith from 'lodash/mergeWith';
import getPath from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import Promise from 'bluebird';
// Components
import Header from './modules/Header';
import Sidebar from './modules/Sidebar';
import Login from './modules/Login';
import Feed from './modules/Feed';
// Custom
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
// Endpoint
import {
    endpointAccount,
    endpointFeed,
    endpointTransactions,
    endpointBalance,
    endpointStatus,
    endpointSpendings,
    token
} from '../utilities/api';

/**
 * @name EMPTY_STATE
 * @type {{data: {user: {}, transactions: {}, balance: {}}}}
 */
const EMPTY_STATE = {
    data: {
        user: {},
        transactions: {},
        balance: {},
        feed: []
    }
};

export default class App extends Component {
    constructor() {
        super();

        this.state = EMPTY_STATE;

        this._cycle = null;

        this.updateState = this.updateState.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
        this.fetchFeed = this.fetchFeed.bind(this);
        this.fetchCycle = this.fetchCycle.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.fetchTransactions = this.fetchTransactions.bind(this);
        this.fetchBalance = this.fetchBalance.bind(this);
        this.fetchStatus = this.fetchStatus.bind(this);
        this.fetchSpendings = this.fetchSpendings.bind(this);
    }

    login() {
        return this.fetchUser()
            .then(this.fetchTransactions)
            .then(this.fetchFeed)
            .then(this.fetchCycle);
    }

    logout() {
        this.stopCycle();
        return this.setState({data: EMPTY_STATE.data});
    }

    componentDidUpdate() {
        console.info(this.state);
    }

    getValue(data) {
        if (!data || isEmpty(data)) {
            return false;
        }

        let output;

        switch (data.type) {
            case 'transactions':
                output = data.feed.reduce((result, item) => {
                    let id = item.id;

                    if (!id) {
                        return result;
                    }

                    result = Object.assign({}, result, {
                        [item.id]: item
                    });

                    return result;
                }, {});
                break;
            default:
                output = data.feed;
                break;
        }

        return output;
    }

    updateState(namespace, data) {
        const {state} = this;

        return new Promise(resolve => {

            if (!namespace || !data) {
                return resolve();
            }

            let _state = Object.assign({}, state);

            if (!_state.data[namespace]) {
                _state.data[namespace] = {};
            }

            data = Object.keys(data).reduce((result, item) => {
                if (item.indexOf('_') !== 0) {
                    result = Object.assign({}, result, {
                        [item]: data[item]
                    });
                }

                return result;
            }, {});

            _state.data = Object.assign({}, _state.data, {
                [namespace]: mergeWith({}, _state.data[namespace], data, function (a, b) {
                    return Array.isArray(a) ? union(a, b) : undefined;
                })
            });

            return this.setState(_state, () => {
                resolve();
            });
        });
    }

    fetchFeed() {
        const {updateState} = this;

        return request.get(endpointFeed)
            .then(response => {

                console.log('response', response);

                let addToFeed = response.reduce((result, item) => {
                    let type = item.type;
                    let feed = item.feed;
                    let id = item.id;

                    // if no type or no feed; don't add it
                    if (!type || !feed) {
                        return result;
                    }

                    if (type === 'transactions') {
                        item.feed = getPath(item, 'feed.feed');
                    }

                    result = Object.assign({}, result, {
                        [id] : {
                            id,
                            ...item
                        }
                    });

                    return result;
                }, {});

                return updateState('feed', addToFeed);
            })
            .catch(error => console.error(error)); // eslint-disable-line no-console
    }

    fetchUser() {
        const {updateState} = this;

        return request
            .get(endpointAccount, {
                headers: {'Authorization': `Basic ${token}`}
            })
            .then(response => {
                let user = response;
                let customer = getPath(response, '_embedded.owner');

                if (customer) {
                    user = Object.assign({}, user, customer);
                }

                return updateState('user', user);
            })
            .catch(error => {
                console.error(error); // eslint-disable-line no-console
            });
    }

    fetchTransactions() {
        const {updateState} = this;

        return request
            .get(endpointTransactions, {
                headers: {'Authorization': `Basic ${token}`}
            })
            .then(response => {
                let transactions = getPath(response, '_embedded.transactions');

                if (!transactions || !transactions.length) {
                    return;
                }

                transactions = transactions.reduce((result, item) => {
                    let id = item.id;

                    if (!id) {
                        return result;
                    }

                    result = Object.assign({}, result, {
                        [item.id]: item
                    });

                    return result;
                }, {});

                return updateState('transactions', transactions);
            })
            .catch(error => {
                console.error('transactions error', error); // eslint-disable-line no-console
            });
    }

    fetchCycle() {
        const {fetchFeed} = this;

        fetchFeed()
            .then(() => {
                this._cycle = setTimeout(() => requestAnimationFrame(() => {
                    this.fetchCycle();
                }), 1000);
            });
    }

    stopCycle() {
        if (this._cycle) {
            clearTimeout(this._cycle);
        }
    }

    fetchBalance() {
        return request.get(endpointBalance);
    }

    fetchStatus() {
        return request.get(endpointStatus);
    }

    fetchSpendings() {
        return request.get(endpointSpendings);
    }

    get getBody() {
        const {getFeed} = this;

        return (
            <main>
                <Feed data={{feed: getFeed}} />
            </main>
        );
    }

    get getSidebarData() {
        const {
            state: {
                data: {user}
            },
            getLoggedIn
        } = this;

        if (!getLoggedIn) {
            return {};
        }

        return {
            firstName: user.firstname,
            lastName: user.lastname,
            accountNumber: user.accountNumber
        };
    }

    get getTransactions() {
        const {transactions} = this.state.data;

        let sortedTransactions = Object.keys(transactions).map(id => transactions[id]);

        // sort by time => reverse to get latest first
        return sortBy(sortedTransactions, transaction => transaction.transactionDateTimestamp).reverse();
    }

    get getFeed() {
        const {feed} = this.state.data;

        if (!feed || isEmpty(feed)) {
            return [];
        }

        return Object.keys(feed).map(id => feed[id]).reverse();
    }

    get getContent() {
        const {
            getSidebarData,
            getBody,
            login,
            logout,
            getLoggedIn,
            fetchBalance,
            fetchStatus,
            fetchSpendings
        } = this;

        if (!getLoggedIn) {
            return (
                <div className="content">
                    <Login events={{action: login}} />
                </div>
            );
        }

        return (
            <div className="content">
                <div className="left">
                    <Sidebar
                        events={{
                            logout,
                            fetchBalance,
                            fetchStatus,
                            fetchSpendings
                        }}
                        data={getSidebarData}/>
                </div>
                <div className="right">
                    {getBody}
                </div>
            </div>
        );
    }

    get getLoggedIn() {
        const {state: {data}} = this;
        let user = getPath(data, 'user');

        return !isEmpty(user);
    }

    render() {
        const {getContent} = this;

        return (
            <div>
                <Header />
                {getContent}
            </div>
        );
    }
}
