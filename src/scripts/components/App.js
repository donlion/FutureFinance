import React from 'react';
import Component from '../Model';
// Modules
import request from '../utilities/request';

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
            console.log('got data');
                this.setState({
                    gotData: true
                });
            })
            .catch(error => console.log(error));
    }

    get getHeader() {
        return (
            <header>Header</header>
        );
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
                {getBody}
            </div>
        );
    }
}
