import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ModalWindow.scss';

class ModalWindow extends Component{
    render() {
        return (
            <div className='modal-container' style={{display: this.props.visible ? 'block' : 'none', pointerEvents: this.props.visible ? 'all' : 'none'}}
                onClick={(e) => {
                    e.stopPropagation();
                    if (this.props.visible) {
                        this.props.hideModal();
                    }
                } }>
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