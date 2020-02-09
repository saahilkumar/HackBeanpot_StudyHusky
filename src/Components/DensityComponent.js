import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

class DensityComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>{this.props.roomName}</h2>
                <Button>{this.props.cur} / {this.props.max}</Button>
            </div>
        );
    }
}

export default DensityComponent;