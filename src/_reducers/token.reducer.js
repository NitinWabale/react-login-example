import { tokenConstants } from '../_constants';

export function token(state = {}, action) {
    switch (action.type) {
        case tokenConstants.CREATE_REQUEST:
            return {
                loading: true
            };
        case tokenConstants.CREATE_SUCCESS:
            return {
                token: action.token[0].key_name
            };
        case tokenConstants.CREATE_FAILURE:
            return {
                error: action.error
            };
        case tokenConstants.ALL_REQUEST:
            return {
                loading: true
            };
        case tokenConstants.ALL_SUCCESS:
            return {
                items: action.tokens
            };
        case tokenConstants.ALL_FAILURE:
            return {
                error: action.error
            };
        case tokenConstants.REVOKE_REQUEST:
            // add 'revoking:true' property to token being revoked
            return {
                ...state,
                items: state.items && state.items.map(token =>
                    token.id === action.id
                        ? { ...token, revoking: true, status: token.status }
                        : token
                )
            };
        case tokenConstants.REVOKE_SUCCESS:
            return {
                items: state.items.map(token =>
                    token.id === action.id
                        ? { ...token, revoking: false, status: action.status}
                        : token
                )
            }
        case tokenConstants.REVOKE_FAILURE:
            return {
                ...state,
                items: state.items.map(token => {
                    if (token.id === action.id) {
                        // make copy of token without 'revoking:true' property
                        const { revoking, ...tokenCopy } = token;
                        // return copy of token with 'revokeError:[error]' property
                        return { ...tokenCopy, revokeError: action.error };
                    }

                    return token;
                })
            };
        default:
            return state
    }
}