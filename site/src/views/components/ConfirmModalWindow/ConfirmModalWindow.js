import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ConfirmModalWindow extends Component {
    render() {
        return (
            <div className='modal' onClick={(e) => {
                e.stopPropagation();
            }}>
                <h1 className='modal__title'>Are you sure?</h1>
                <div className='modal__btns'>
                    <input id='confirm' className='modal__button modal__button_submit' type="button" value='Yes' onClick={(e) => {
                        e.stopPropagation();
                        this.props.onConfirm();
                        this.props.hideModal();
                    }}/>
                    <input id='no' className='modal__button  modal__button_cancel' type="button" value='Cancel' onClick={(e) => {
                        e.stopPropagation();
                        this.props.hideModal();
                    }}/>
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