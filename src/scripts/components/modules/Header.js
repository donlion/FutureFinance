import React from 'react';
import Component from '../../Model';
import Theme from '../../utilities/theme';
// Components
import AppBar from 'material-ui/AppBar';

export default class Header extends Component {

    render() {
        return (
            <Theme>
                <AppBar
                    style={{
                        backgroundColor: '#052D46'
                    }}
                    title="PBA"
                    showMenuIconButton={false} />
            </Theme>
        );
    }
}
