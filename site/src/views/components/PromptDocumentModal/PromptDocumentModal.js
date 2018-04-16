import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {fromEvent} from 'most';

import './PromptDocumentModal.scss';

class PromptDocumentModal extends Component {
    componentDidMount() {
        fromEvent('click', document.querySelector('.modal'))
            .observe(e => {
                e.stopPropagation();
            });

        fromEvent('click', document.querySelector('#send'))
            .observe(e => {
                e.stopPropagation();
                this.confirmed();
            });

        fromEvent('click', document.querySelector('#cancel'))
            .observe(e => {
                e.stopPropagation();
                this.props.hideModal();
            });
    }

    confirmed() {
        const docName = document.querySelector('#newDocName').value;
        this.props.onOk(docName);
        document.querySelector('#newDocName').value = '';
        this.props.hideModal();
    }

    render() {
        return (
            <div className='modal'>
                <h1 className='modal__title'>{this.props.message}</h1>
                <input id='newDocName' className='modal__input' type="text" placeholder={this.props.placeholder}/>
                <div className='modal__btns'>
                    <input id='send' className='modal__button modal__button_submit' type="button" value='OK'/>
                    <input id='cancel' className='modal__button  modal__button_cancel' type="button" value='Cancel'/>
                </div>
            </div>
        );
    }
}

PromptDocumentModal.propTypes = {
    message: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    hideModal: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired
};

export default PromptDocumentModal;