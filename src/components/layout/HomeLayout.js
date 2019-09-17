import React from 'react';
import PropTypes from 'prop-types';

const HomeLayout = ({ children, ...rest }) => {
    return <>{children}</>;
};

HomeLayout.propTypes = {
    children: PropTypes.element.isRequired,
};
export default HomeLayout;
