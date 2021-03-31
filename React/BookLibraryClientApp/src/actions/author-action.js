import axios from 'axios';
import { GET_AUTHORS, ADD_AUTHOR, UPDATE_AUTHOR, DELETE_AUTHOR } from './types';

export const getAuthors = (dispatch) => {
    return new Promise(resolve => {
        axios.get('/api/author')
            .then(res => {
                dispatch({ type: GET_AUTHORS, payload: res.data });
                resolve();
            })
    });
};

export const addAuthor = (dispatch, author) => {
    return new Promise(resolve => {
        axios.post('/api/author', author)
            .then((res) => {
                dispatch({ type: ADD_AUTHOR, payload: res.data });
                resolve();
            })
    });
};

export const updateAuthor = (dispatch, author) => {
    return new Promise(resolve => {
        axios.put('/api/author/' + author.id, author)
            .then(() => {
                dispatch({ type: UPDATE_AUTHOR, payload: author })
                resolve();
            })
    });
};

export const deleteAuthor = (dispatch, author, callback) => {
    return new Promise(resolve => {
        axios.delete('/api/author/' + author.id)
            .then(() => dispatch({ type: DELETE_AUTHOR, payload: author }))
            .catch(error => callback(error))
            .then(() => resolve()); // always
    });
};

export const deleteAuthorWithBooks = (dispatch, author, deleteType) => {
    return new Promise(resolve => {
        axios.delete('/api/author/' + author.id + '/' + deleteType)
            .then(() => {
                dispatch({ type: DELETE_AUTHOR, payload: author });
                resolve();
            });
    });
};