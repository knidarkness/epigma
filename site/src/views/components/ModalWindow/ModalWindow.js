import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ModalWindow.scss';
import {fromEvent} from 'most';

class ModalWindow extends Component{
    componentDidMount() {
        fromEvent('click', document.querySelector('.modal-container'))
            .observe(() => {
                if (this.props.visible) {
                    this.props.hideModal();
                }
            });
    }

    render() {
        return (
            <div id='modal-container' className='modal-container' style={{display: this.props.visible ? 'block' : 'none'}}>
                {React.createElement(this.props.content, {
                    ...this.props.contentProps,
                    hideModal: this.props.hideModal
                })}
            </div>
        );
    }
}

ModalWindow.propTypes = {
    contentProps: PropTypes.object,
    content: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired
};

export default ModalWindow;