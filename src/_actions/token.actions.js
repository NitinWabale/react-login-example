import { tokenConstants } from '../_constants';
import { tokenService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const tokenActions = {
    create,
    all,
    revoke
};

function create() {
    return dispatch => {
        dispatch(request());

        tokenService.create()
            .then(
                token => { 
                    dispatch(success(token));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(token) { return { type: tokenConstants.CREATE_REQUEST, token } }
    function success(token) { return { type: tokenConstants.CREATE_SUCCESS, token } }
    function failure(error) { return { type: tokenConstants.CREATE_FAILURE, error } }
}

function all() {
    return dispatch => {
        dispatch(request());

        tokenService.all()
            .then(
                tokens => { 
                    dispatch(success(tokens));
                    history.push('/');
                    dispatch(alertActions.success('Retrieved successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(tokens) { return { type: tokenConstants.ALL_REQUEST, tokens } }
    function success(tokens) { return { type: tokenConstants.ALL_SUCCESS, tokens } }
    function failure(error) { return { type: tokenConstants.ALL_FAILURE, error } }
}

function revoke(id, status) {
    return dispatch => {
        dispatch(request(id, status));

        tokenService.revoke({ 'status': status, 'id': id })
            .then(
                token => dispatch(success(token)),
                dispatch(alertActions.success('Update status successful')),
                // history.push('/'),
                // dispatch(all()),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: tokenConstants.REVOKE_REQUEST, id } }
    function success(id) { return { type: tokenConstants.REVOKE_SUCCESS, id } }
    function failure(id, error) { return { type: tokenConstants.REVOKE_FAILURE, id, error } }
}