import React, { useRef, useState } from "react";

import "./Crud.css";

function Crud() {
  const list = [
    // {
    //   id: 1,
    //   name: "abc",
    //   price: "543",
    // },
    // {
    //   id: 2,
    //   name: "ell",
    //   price: "456",
    // },
  ];

  const [lists, setList] = useState(list);
  const [newID, setNewId] = useState(1);
  const [updateState, setUpdateState] = useState(-1);
  console.log("hello:", list);
  return (
    <div className="crud">
      <div>
        <AddList setList={setList} lists={lists} newID={newID} setNewId={setNewId} />
        <form onSubmit={handleSubmit}>
          <table>
            {lists.map((current) =>
                updateState === current.id ? (
                  <EditList current={current} lists={lists} setList={setList} />
                ) : (
                  //  <tbody>
                  <tr>
                    <td>{current.name}</td>
                    <td>{current.price}</td>
                    <td>
                      <button
                        className="edit"
                        onClick={() => handleEdit(current.id)}
                      >
                        edit
                      </button>
                      <button
                        className="delete"
                        type="button"
                        onClick={() => handleDelete(current.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              //  </tbody>
            )}
          </table>
        </form>
      </div>
    </div>
  );

  function handleEdit(id) {
    setUpdateState(id);
    console.log("edit:", id);
  }
  function handleDelete(id) {
    const newlist = lists.filter((li) => li.id !== id);
    setList(newlist);
  }
  function handleSubmit(event) {
    console.log("updateState", updateState);
    event.preventDefault();

    const name = event.target.elements.name.value;
    const price = event.target.elements.price.value;
    const newlist = lists.map((li) =>
      li.id === updateState ? { ...li, name: name, price: price } : li
    );
    setList(newlist);

    setUpdateState(-1);
  }
}

function EditList({ current, lists, setList }) {
  console.log("current", current);
  function handleInputname(event) {
    const value = event.target.value;
    const newlist = lists.map((li) =>
      li.id === current.id ? { ...li, name: value } : li
    );
    setList(newlist);
  }
  function handleInputprice(event) {
    const value = event.target.value;
    const newlist = lists.map((li) =>
      li.id === current.id ? { ...li, price: value } : li
    );
    setList(newlist);
  }
  return (
    <tr>
      <td>
        <input
          type="text"
          onChange={handleInputname}
          name="name"
          value={current.name}
        />
      </td>
      <td>
        <input
          type="text"
          onChange={handleInputprice}
          name="price"
          value={current.price}
        />
      </td>
      <td>
        <button type="submit">update</button>
      </td>
    </tr>
  );
}
function AddList({ setList, lists, newId, setNewId }) {
  const nameRef = useRef();
  const priceRef = useRef();
  function handleSubmit(event) {
    setNewId(newId+1)
    console.log("newId+1", newId+1);

    event.preventDefault();
    const name = event.target.elements.name.value;
    const price = event.target.elements.price.value;
    const newlist = {
      id: lists.length +1,
      name,
      price,
    };
    setList((preList) => {
      console.log("gggg", preList.concat(newlist));
      return preList.concat(newlist);
    });
    nameRef.current.value = "";
    priceRef.current.value = "";
  }
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <div className="text">
        <input type="text" id="name" ref={nameRef} />
        <input type="text" id="price" ref={priceRef} />
        <button type="submit" id="Add">
          Add
        </button>
      </div>
    </form>
  );
}
export default Crud;
