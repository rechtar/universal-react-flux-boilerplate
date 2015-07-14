import React, { PropTypes } from 'react';

class DemoItem extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        price: PropTypes.number
    };

    render() {
        const { title, price } = this.props;

        return (
            <div>{title} - $ {price}</div>
        );
    }
}

export default DemoItem;
