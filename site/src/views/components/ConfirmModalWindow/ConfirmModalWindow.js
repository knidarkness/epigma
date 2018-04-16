import React, {Component} from 'react';
import {fromEvent} from 'most';
import PropTypes from 'prop-types';

class ConfirmModalWindow extends Component {
    componentDidMount() {
        fromEvent('click', document.querySelector('.modal'))
            .observe(e => {
                e.stopPropagation();
            });

        fromEvent('click', document.querySelector('#confirm'))
            .observe(e => {
                e.stopPropagation();
                this.props.onConfirm();
                this.props.hideModal();
            });

        fromEvent('click', document.querySelector('#no'))
            .observe(e => {
                e.stopPropagation();
                this.props.hideModal();
            });
    }

    render() {
        return (
            <div className='modal'>
                <h1 className='modal__title'>Are you sure?</h1>
                <div className='modal__btns'>
                    <input id='confirm' className='modal__button modal__button_submit' type="button" value='Yes'/>
                    <input id='no' className='modal__button  modal__button_cancel' type="button" value='Cancel'/>
                </div>
            </div>
        );
    }
}


ConfirmModalWindow.propTypes = {
    hideModal: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
};

export default ConfirmModalWindow;