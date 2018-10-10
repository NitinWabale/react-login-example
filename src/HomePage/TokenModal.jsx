import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { tokenActions } from '../_actions';
import { connect } from 'react-redux';
class TokenModal extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            token: null
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (!!nextProps.token.token && nextProps.token.token !== this.props.token.token) {
            this.setState({ showModal: true, token: nextProps.token.token });
        }
    }
    componentWillUnmount() {
        this.setState({ showModal: false, token: null });
    }
    handleOpenModal() {
        this.props.dispatch(tokenActions.create());
    }

    handleCloseModal() {
        this.setState({ showModal: false});
        this.props.dispatch(tokenActions.all());
    }

    render() {
        return (
            <div>
                <button onClick={this.handleOpenModal}>Generate Token</button>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal}
                    shouldCloseOnOverlayClick={false}
                >
                    <div>
                        <p>Token: {this.state.token}</p>
                        <button onClick={this.handleCloseModal}>Close</button>
                    </div>
                </ReactModal>
            </div>
        );
    }
}
function mapStateToPropsa(state) {
    const { token } = state;
    return {
        token
    };
}

const connectedTokenModal = connect(mapStateToPropsa)(TokenModal);
export { connectedTokenModal as TokenModal };
// TokenModal.displayName = 'TokenModal';

// export default TokenModal;