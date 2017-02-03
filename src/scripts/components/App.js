import React from 'react';
import Component from '../Model';
import request from '../utilities/request';
// Components
import Header from './modules/Header';
import Sidebar from './modules/Sidebar';
// Custom
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            data: {},
            gotData: false
        };
    }

    componentDidMount() {
        request.get('http://localhost:8080')
            .then(() => {
                this.setState({
                    gotData: true
                });
            })
            .catch(error => console.log(error)); // eslint-disable-line no-console
    }

    get getHeader() {
        return <Header/>;
    }

    get getBody() {
        const {gotData} = this.state;

        return (
            <main>Main {gotData ? 'Got data!' : 'No data.... :('}</main>
        );
    }

    render() {
        const {
            getHeader,
            getBody
        } = this;

        return (
            <div>
                {getHeader}
                <div className="content">
                    <div className="left">
                        <Sidebar data={{
                            username: 'leoorsnes',
                            cpr: '140693-1233',
                            firstName: 'Leo',
                            lastName: 'Ørsnes'
                        }} />
                    </div>
                    <div className="right">
                        {getBody}
                    </div>
                </div>
            </div>
        );
    }
}
