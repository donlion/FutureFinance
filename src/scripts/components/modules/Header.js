import React from 'react';
import Component from '../../Model';
import Theme from '../../utilities/theme';
// Components
import {AppBar} from 'material-ui';

export default class Header extends Component {

    render() {
        return (
            <Theme>
                <AppBar
                    title="PBA"
                    showMenuIconButton={false} />
            </Theme>
        );
    }
}
