import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

const CountContainer = ({count, increment}) => {

    return(<div>
        <div>
            The count is {count}
            <button onClick={increment}>increment</button>
        </div>
    </div>);
};

CountContainer.propTypes = {
    count: PropTypes.number.isRequired,
    increment : PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    count: state.count
});

const mapDispatchToProps = dispatch => ({
    increment: () => dispatch.count.incrementAsync(1)
});
export default connect(mapStateToProps, mapDispatchToProps)(CountContainer);