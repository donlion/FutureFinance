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
import Transactions from './modules/Transactions';
import Balance from './modules/Balance';
import Message from './modules/Message';
import Login from './modules/Login';
// Custom
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
// Endpoint
import {
    endpointAccount,
    endpointFeed,
    token
} from '../utilities/api';

export default class App extends Component {
    constructor() {
        super();

        this.state = {data: {
            user: {},
            transactions: {},
            balance: {}
        }};

        this._cycle = null;

        this.updateState = this.updateState.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
        this.fetchFeed = this.fetchFeed.bind(this);
        this.fetchCycle = this.fetchCycle.bind(this);
        this.login = this.login.bind(this);
    }

    login() {
        return this.fetchUser()
            .then(this.fetchFeed)
            .then(this.fetchCycle);
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

        if (!namespace || !data) {
            return;
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

        return new Promise(resolve => {
            return this.setState(_state, () => {
                resolve();
            });
        });
    }

    fetchFeed() {
        const {
            updateState,
            getValue
        } = this;

        return request.get(endpointFeed)
            .then(response => {

                let promises = response.map(item => {
                    let namespace = item.type;
                    let value = getValue(item);

                    if (!value) {
                        return Promise.resolve();
                    }

                    return updateState(namespace, value);
                });

                return Promise.all(promises);
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

    get getHeader() {
        return <Header/>;
    }

    get getBody() {
        const {
            getTransactions,
            state: {data}
        } = this;

        return (
            <main>
                <Message data={{...data.answer}} />
                <Balance data={{...data.balance}} />
                <Transactions data={{transactions: getTransactions}}/>
            </main>
        );
    }

    get getSidebarData() {
        const {data: {user}} = this.state;

        if (isEmpty(user)) {
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

    get getContent() {
        const {
            getSidebarData,
            getBody,
            login,
            state: {data}
        } = this;

        let user = getPath(data, 'user');

        if (!user || isEmpty(user)) {
            return (
                <div className="content">
                    <Login events={{action: login}} />
                </div>
            );
        }

        return (
            <div className="content">
                <div className="left">
                    <Sidebar data={getSidebarData}/>
                </div>
                <div className="right">
                    {getBody}
                </div>
            </div>
        );
    }

    render() {
        const {
            getHeader,
            getContent
        } = this;

        return (
            <div>
                {getHeader}
                {getContent}
            </div>
        );
    }
}
