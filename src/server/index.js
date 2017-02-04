import React, {Component} from 'react';

import App from '../scripts/components/App';

global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

export default class Document extends Component {
    render() {
        return (
            <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Future Finance</title>
                <link rel="stylesheet" href="/css/app.css" />
            </head>
            <body>
            <div
                style={{
                    backgroundColor: '#E6EAEC',
                    height: '100%'
                }}
                id="root">
                <App />
            </div>
            <script src="/js/app.js" defer="defer" type="text/javascript"></script>
            </body>
            </html>
        );
    }
}
