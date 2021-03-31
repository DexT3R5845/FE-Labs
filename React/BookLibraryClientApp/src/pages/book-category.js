import React, { useEffect, useState } from "react";
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux'
import { getBookCategories, addBookCategory, updateBookCategory, deleteBookCategory, deleteBookCategoryWithBooks } from '../actions/book-category-action';
import { deleteType } from "../utils";

const BookCategory = () => {
  const [open, setOpen] = useState(false);
  const [bookCategory, setBookCategory] = useState("");
  const dispatch = useDispatch();
  const data = useSelector(state => state.bookCategory)
  const columns = [{ title: 'Name', field: 'name' }];

  useEffect(() => {
    getBookCategories(dispatch);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const deleteBookCategoryWithReferencedBooks = (type) => {
    deleteBookCategoryWithBooks(dispatch, bookCategory, type);
    handleClose();
  }

  return (
    <div>
      <MaterialTable
        title="Book Categories"
        columns={columns}
        data={data.bookCategories}
        options={{
          addRowPosition: "first"
        }}
        editable={{
          onRowAdd: newData => addBookCategory(dispatch, newData),
          onRowUpdate: (newData) => updateBookCategory(dispatch, newData),
          onRowDelete: oldData => deleteBookCategory(dispatch, oldData, (error) => {
            if (error.response.data.errorCode === "DbUpdateException") {
              setBookCategory(oldData);
              handleClickOpen();
            }
          })
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Category of some books is <b>{bookCategory.name}</b>.
            Delete books or only empty category fields?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteBookCategoryWithReferencedBooks(deleteType.DELETE_BOOKS)} color="primary">
            Delete Books
          </Button>
          <Button onClick={() => deleteBookCategoryWithReferencedBooks(deleteType.ONLY_EMPTY_AUTHORS)} color="primary" autoFocus>
            Empty Category Fields
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BookCategory;