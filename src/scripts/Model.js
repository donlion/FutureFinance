import {Component} from  'react';
import isEqual from 'lodash/isEqual';

/**
 * Model base class
 */
export default class Model extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        let propsChanged = !isEqual(this.props, nextProps);
        let stateChanged = !isEqual(this.state, nextState);

        if (propsChanged || stateChanged) {
            return true;
        }

        return false;
    }
}
