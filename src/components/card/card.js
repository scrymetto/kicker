import React, {Component} from 'react';
import PropTypes from 'prop-types';
import rechnen from "./rechnen";

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1
        }
    }

    render() {
        return (
            <div>
                <button>
                    {this.props.text}
                </button>
                <p>{this.state.count}</p>
            </div>
        )
    }
}

Test.propTypes = {
    text: PropTypes.oneOf(['one', 'two'])
};

export default Test;