import axios from 'axios';
import { GET_BOOK_CATEGORIES, ADD_BOOK_CATEGORY, UPDATE_BOOK_CATEGORY, DELETE_BOOK_CATEGORY } from './types';

export const getBookCategories = (dispatch) => {
    return new Promise(resolve => {
        axios.get('/api/bookcategory')
            .then(res => {
                dispatch({ type: GET_BOOK_CATEGORIES, payload: res.data });
                resolve();
            })
    });
};

export const addBookCategory = (dispatch, bookCategory) => {
    return new Promise(resolve => {
        axios.post('/api/bookcategory', bookCategory)
            .then((res) => {
                dispatch({ type: ADD_BOOK_CATEGORY, payload: res.data })
                resolve();
            })
    });
};

export const updateBookCategory = (dispatch, bookCategory) => {
    return new Promise(resolve => {
        axios.put('/api/bookcategory/' + bookCategory.id, bookCategory)
            .then(() => {
                dispatch({ type: UPDATE_BOOK_CATEGORY, payload: bookCategory });
                resolve();
            })
    });
};

export const deleteBookCategory = (dispatch, bookCategory, callback) => {
    return new Promise(resolve => {
        axios.delete('/api/bookcategory/' + bookCategory.id)
            .then(() => dispatch({ type: DELETE_BOOK_CATEGORY, payload: bookCategory }))
            .catch(error => callback(error))
            .then(() => resolve()); // always
    });
};

export const deleteBookCategoryWithBooks = (dispatch, bookCategory, deleteType) => {
    return new Promise(resolve => {
        axios.delete('/api/bookcategory/' + bookCategory.id + '/' + deleteType)
            .then(res => {
                dispatch({ type: DELETE_BOOK_CATEGORY, payload: bookCategory });
                resolve();
            });
    });
};