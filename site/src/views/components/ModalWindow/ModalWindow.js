import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ModalWindow.scss';

class ModalWindow extends Component{
    componentDidUpdate() {
        const modals = document.querySelectorAll('.modal-container');
        const visibleModal = Array.from(modals).filter(el => {
            return !el.className.split(' ').includes('modal-container_hidden');
        });
        if (visibleModal.length > 0){
            visibleModal[0].querySelector('.modal__button').focus();
            if (visibleModal[0].querySelector('.modal__input')){
                const inputField = visibleModal[0].querySelector('.modal__input');
                if (inputField) {
                    inputField.focus();
                }
            }
        }
    }

    render() {
        return (
            <div className={`modal-container${!this.props.visible ? ' modal-container_hidden' : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    if (this.props.visible) {
                        this.props.hideModal();
                    }
                }}
                onKeyDown={e => {
                    if (!this.props.visible) {
                        e.stopImmediatePropagation();
                    } else {
                        if (e.key === 'Escape') {
                            this.props.hideModal();
                        }
                    }
                }}>
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