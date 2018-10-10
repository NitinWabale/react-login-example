import React from 'react';
import T from 'prop-types';
// import classNames from 'classnames';

const Alert = ({ message, onClick }) => (
    <div role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" className="nx-icon">
            <use xmlns="http://www.w3.org/1999/xlink" />
        </svg>
        { message }
    </div>
);


Alert.propTypes = {
    type: T.string,
    message: T.string.isRequired,
    className: T.string,
    closable: T.bool,
    formatted: T.bool,
    onClick: T.func,
};

export default Alert;
