import {Children} from 'react';

/**
 * @name firstChild
 * @param props
 * @returns {null}
 */
export default function firstChild(props) {
    const childrenArray = Children.toArray(props.children);
    return childrenArray[0] || null;
}
