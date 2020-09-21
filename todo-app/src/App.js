import React,{useState, useEffect} from 'react';
import { Button,FormControl,Input,InputLabel } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import logo from './logo.svg';
import './App.css';

import firebase from 'firebase';

function App() {


  // Set the states 
  const [todos, setTodos] = useState([]);
  const [input,setInput] = useState('');
  const [deadline,setDeadline] = useState('Open deadline');

  // When the app loads, listen to database and fetch new todos as they get added/removed

  // useEffect runs once when the app.js loads (when refreshed)
  useEffect(() => {
    
    // onSnapshot - every time the database changes
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo}) ))
    })

  },[]);
  // If [] then will only run once when the app loads
  // if [varX] then also when varX changes

  const addTodo = (event) => {
    // This will fire of when we click the button
    event.preventDefault(); // will stop the refresh

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setTodos([...todos,input]);
    setInput(''); //clear the input after hitting enter
  }

  return (
    <div className="App">
      <h1>My TodoList</h1>

      <form>

        <FormControl>
          <InputLabel>Write a todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>
        
        <Button disabled={!input} type='submit' onClick={addTodo} variant="contained" color="primary">
          Add todo
        </Button>

      </form>
      
      
      <ul>
        {todos.map(todo => (
          <Todo todo={todo}/>
        ))}

      </ul>
    </div>
  );
}

export default App;
