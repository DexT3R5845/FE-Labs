import React from "react";
import Book from '../pages/book';
import BookCategory from '../pages/book-category';
import Author from '../pages/author';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import Category from '@material-ui/icons/Category';
import Person from '@material-ui/icons/Person';

const routes = [
    { 
        name: "Books",
        key: 1,
        path: "/",
        icon: <LibraryBooks />,
        component: Book,
        exact:true
    },
    {
        name: "Book Categories",
        key: 2,
        path: "/bookcategory/",
        icon: <Category />,
        component: BookCategory,
        exact:false
    },
    {
        name: "Authors",
        key: 3,
        path: "/author/",
        icon: <Person />,
        component: Author,
        exact:false
    }
]

export default routes;