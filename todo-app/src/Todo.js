import React, {useState} from 'react'
import { List,Avatar, ListItemAvatar, Modal,  ListItem,ListItemText, Button } from '@material-ui/core';
import './Todo.css';
import db from './firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';


// Material ui style of the modal
const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {
    const classes=useStyles();

    const [input,setInput] = useState('');
    const [open,setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const UpdateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        },{merge: true});

        setOpen(false); // Close the modal
    }


    return (
        <>
        <Modal open={open} onClose={e => setOpen(false)}>
            <div className={classes.paper}>
                <h1>I am a modal</h1>
                <input placeholder={props.todo.todo} value={input} onChange = {event => setInput(event.target.value)}/>
                <Button onClick={UpdateTodo}>Update Todo</Button>
            </div>

        </Modal>
        <List className="todo__list">
            <ListItemAvatar>
            </ListItemAvatar>

            <ListItem>
                <ListItemText primary={props.todo.todo} secondary={props.todo.deadline} />
            </ListItem>
            <h1>{props.todo.deadline}</h1>
            <Button onClick = {e => setOpen(true)}>EDIT</Button>
            <Button onClick={event => 
                db.collection('todos').doc(props.todo.id).delete()}>
                    DELETE <DeleteIcon></DeleteIcon>
            </Button>
        </List>
        </>
    )
}

export default Todo
