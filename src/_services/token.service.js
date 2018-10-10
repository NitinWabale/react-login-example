import config from 'config';
import { authHeader, userData } from '../_helpers';

export const tokenService = {
    create,
    all,
    revoke
};

function create() {
    const requestOptions = {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json'}, authHeader()),
        body: JSON.stringify({ username: userData().username})
    };

    return fetch(`${config.apiUrl}/token/create`, requestOptions)
        .then(handleResponse)
        .then(token => {
            return token;
        });
}

function all() {
    const requestOptions = {
        method: 'GET',
        headers: Object.assign({ 'Content-Type': 'application/json'}, authHeader()),
    };

    return fetch(`${config.apiUrl}/token/All`, requestOptions)
        .then(handleResponse)
        .then(tokens => {
            return tokens;
        });
}

function revoke(inputdata) {
    const requestOptions = {
        method: 'PATCH',
        headers: Object.assign({ 'Content-Type': 'application/json'}, authHeader()),
        body: JSON.stringify(inputdata)
    };

    return fetch(`${config.apiUrl}/token/revoke`, requestOptions)
        .then(handleResponse)
        .then(token => {
            return token;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}