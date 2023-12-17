import React, { useState, useEffect } from "react";
import "./Style.css";

const getLocaldata = () => {

  const lists = localStorage.getItem("mytodolist");

  if(lists) {
    return JSON.parse(lists); // to convert it into array
  } else {
    return []; // to set state in its initial condition 
  }

}

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocaldata());
  const [isEditItem, setIsEditItem] = useState();
  const [toggleButton, setToggleButton] = useState(false);  // to toggling between button "add task" "update task"

  // add the items functtion
  const addItem = () => {
    if (!inputData) {
      alert("plz fill the data");
    } else if(inputData && toggleButton) {
      setItems(
        items.map((currElem) => {
          if(currElem.id === isEditItem) {
            return  {...currElem, name: inputData};
          }
          return currElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } 
    else {
      const myInputData = {
        id: new Date().getTime().toString(), // to genetrate unique id by time
        name: inputData,
      };
      console.log(myInputData);
      setItems([...items, myInputData]);
      setInputData(""); // after the adding task into list make input empty

      console.log(items);
    }
  };

  // updating the particular task:
  const updateItem = (index) => {
    const item_todo_edited = items.find((currElem) => {
      return currElem.id === index;
    });

    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  }

  // delete items:
  const deleteItem = (index) => {
    const updatedItems = items.filter((currElem) => {
        return currElem.id !== index;
    });
    setItems(updatedItems);

    console.log(items);
  }

  // in case if you want to delete all the task:
//   const removeAll = () => {
//     setItems([]);  // set items to it initial condition
//   }


  // adding local storage:
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]) // on change of state variable 'items' add data to the local storage.


  return (
    <>
      <div className="margin-top-30"></div>

      <div className="container">
        <span className="project-title">Project to-do list</span>
        <br />

        <input
          placeholder="What are your task today? tell me here.."
          className="align-center"
          type="text"
          name=""
          id=""
          value={inputData}
          onChange={(event) => setInputData(event.target.value)}
        />

        {toggleButton ? (
          <button className="button update-button" onClick={addItem}>update task</button>
        ):
        <button className="button update-button" onClick={addItem}>add task</button>
        }
      </div>
      <br />
      
      <div className="margin-top-45"></div>

      {/* show the current tasks: */}
      {items.map((currItem) => {
        return (
          <div className="container">
            <div className="todo-list-item">
              <p className="todo-list-text" key={currItem.id}>
                {currItem.name}
              </p>
              <button className="button update-button" onClick={() => updateItem(currItem.id)}>Update</button>
              <button className="button delete-button" onClick={() => deleteItem(currItem.id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Todo;
