import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './PromptDocumentModal.scss';

class PromptDocumentModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputVal: ''
        };
    }

    confirmed() {
        this.props.onOk(this.state.inputVal);
        this.setState({
            inputVal: ''
        });
        this.props.hideModal();
    }

    render() {

        return (
            <div className='modal' onClick={(e) => {
                e.stopPropagation();
            }}>
                <h1 className='modal__title'>{this.props.message}</h1>
                <input onChange={(e) => {
                    this.setState({
                        inputVal: e.target.value
                    });
                }} value={this.state.inputVal} className='modal__input' type="text" placeholder={this.props.placeholder}/>
                <div className='modal__btns'>
                    <input className='modal__button modal__button_submit' type="button" value='OK' onClick={() => {
                        console.log('123');
                        this.confirmed();
                    }}/>
                    <input className='modal__button  modal__button_cancel' type="button" value='Cancel' onClick={this.props.hideModal}/>
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