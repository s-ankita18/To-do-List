import React, { useState, useEffect } from 'react';
import './App.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);

  const handleAddNewToDo = () => {
    const date = new Date();
    const finalDate = date.toLocaleString();
    
    const newToDoObj = {
      title: newTodoTitle,
      description: newDescription,
      createdAt: finalDate,
    };

    const updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newToDoObj);

    setAllTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    setNewDescription('');
    setNewTodoTitle('');
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todolist'));
    const savedCompletedToDos = JSON.parse(localStorage.getItem('completedTodos'));

    if (savedTodos) {
      setAllTodos(savedTodos);
    }

    if (savedCompletedToDos) {
      setCompletedTodos(savedCompletedToDos);
    }
  }, []);

  const handleToDoDelete = index => {
    const reducedTodos = [...allTodos];
    reducedTodos.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodos));
    setAllTodos(reducedTodos);
  };

  const handleCompletedTodoDelete = index => {
    const reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice(index, 1);

    localStorage.setItem('completedTodos', JSON.stringify(reducedCompletedTodos));
    setCompletedTodos(reducedCompletedTodos);
  };

  const handleComplete = index => {
    const date = new Date();
    const finalDate = date.toLocaleString();

    const filteredTodo = {
      ...allTodos[index],
      completedOn: finalDate,
    };

    const updatedCompletedList = [...completedTodos, filteredTodo];
    setCompletedTodos(updatedCompletedList);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedList));

    handleToDoDelete(index);
  };

  const handleTitleChange = (newTitle, index) => {
    setAllTodos(prevTodos => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index].title = newTitle;
      localStorage.setItem('todolist', JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const handleDescriptionChange = (newDescription, index) => {
    setAllTodos(prevTodos => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index].description = newDescription;
      localStorage.setItem('todolist', JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  return (
    <div className="App">
      <h1>Conquer Your Day : To-Do Mastery</h1>
       <p className='paraApp'>Manage Your Day with Ease 😊</p>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              value={newTodoTitle}
              onChange={e => setNewTodoTitle(e.target.value)}
              placeholder="Enter the title of your To Do"
            />
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              placeholder="Give the description of your To Do"
            />
          </div>
          <div className="todo-input-item">
            <button
              className="primary-btn"
              type="button"
              onClick={handleAddNewToDo}
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompletedScreen === false && 'active'}`}
            onClick={() => setIsCompletedScreen(false)}
          >
            To Do
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
            onClick={() => setIsCompletedScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompletedScreen === false &&
            allTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3
                    contentEditable={true}
                    onBlur={e => handleTitleChange(e.target.innerText, index)}
                  >
                    {item.title}
                  </h3>
                  <p
                    contentEditable={true}
                    onBlur={e => handleDescriptionChange(e.target.innerText, index)}
                  >
                    {item.description}
                  </p>
                  <p>Created At: {item.createdAt}</p>
                </div>
                <div>
                  <AiOutlineDelete
                    title="Delete?"
                    className="icon"
                    onClick={() => handleToDoDelete(index)}
                  />
                  <BsCheckLg
                    title="Completed?"
                    className="check-icon"
                    onClick={() => handleComplete(index)}
                  />
                </div>
              </div>
            ))}
          {isCompletedScreen === true &&
            completedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p> <i>Completed at: {item.completedOn}</i></p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleCompletedTodoDelete(index)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;








