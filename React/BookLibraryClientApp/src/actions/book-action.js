import axios from 'axios';
import { GET_BOOKS, ADD_BOOK, UPDATE_BOOK, DELETE_BOOK } from './types';

export const getBooks = (dispatch) => {
    return new Promise(resolve => {
        axios.get('/api/book')
            .then(res => {
                dispatch({ type: GET_BOOKS, payload: res.data });
                resolve();
            })
    });
};

export const addBook = (dispatch, book) => {
    return new Promise(resolve => {
        axios.post('/api/book', book)
            .then(res => {
                dispatch({ type: ADD_BOOK, payload: res.data });
                resolve();
            })
    });
};

export const updateBook = (dispatch, book) => {
    return new Promise(resolve => {
        axios.put('/api/book/' + book.id, book)
            .then(() => {
                dispatch({ type: UPDATE_BOOK, payload: book });
                resolve();
            })
    });
};

export const deleteBook = (dispatch, book) => {
    return new Promise(resolve => {
        axios.delete('/api/book/' + book.id)
            .then(() => {
                dispatch({ type: DELETE_BOOK, payload: book });
                resolve();
            })
    });
};