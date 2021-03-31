import React, { useState, useEffect } from "react";
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux'
import { getAuthors, addAuthor, updateAuthor, deleteAuthor, deleteAuthorWithBooks } from '../actions/author-action';
import { deleteType } from "../utils";

const Author = () => {
  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();
  const data = useSelector(state => state.author);
  const columns = [{ title: 'Name', field: 'name' }];

  useEffect(() => {
    getAuthors(dispatch);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const deleteAuthorWithReferencedBooks = (type) => {
    deleteAuthorWithBooks(dispatch, author, type);
    handleClose();
  }

  return (
    <div>
      <MaterialTable
        title="Auhtors"
        columns={columns}
        data={data.authors}
        options={{
          addRowPosition: "first"
        }}
        editable={{
          onRowAdd: newData => addAuthor(dispatch, newData),
          onRowUpdate: (newData) => updateAuthor(dispatch, newData),
          onRowDelete: oldData => deleteAuthor(dispatch, oldData, (error) => {
            if (error.response.data.errorCode === "DbUpdateException") {
              setAuthor(oldData);
              handleOpen();
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
            Author of some books is <b>{author.name}</b>.
            Delete books or only empty author fields?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteAuthorWithReferencedBooks(deleteType.DELETE_BOOKS)} color="primary">
            Delete Books
          </Button>
          <Button onClick={() => deleteAuthorWithReferencedBooks(deleteType.ONLY_EMPTY_AUTHORS)} color="primary" autoFocus>
            Empty Author Fields
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Author;