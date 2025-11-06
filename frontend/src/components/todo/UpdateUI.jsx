import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

function UpdateUI({item, onUpdated, tasks, setTasks}) {
    const [inputs, setInputs] = useState({ title: "", body: "" });
      const [userId, setUserId] = useState(sessionStorage.getItem("Id"));
    useEffect(() => {
        setInputs({ title: item.title, body: item.body });
    }, [])

     const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleUpdate = async () => {
      try {
          console.log("weufhoweuhfuio")
        const res = await axios.put(`${window.location.origin}/updateTask/${item._id}`, {
          title: inputs.title,
          body: inputs.body,
          userId: userId
        });
        console.log("updated response", res.data);
        setTasks(tasks.filter(task => task._id !== item._id));
        setTasks((prev) => [...prev, res.data.list]);
        onUpdated();

        toast.success("Task updated successfully!");
        onUpdated();
      } catch (err) {
        toast.error(err.response?.data?.message || "Error updating task");
      }
  };
  return (
    <div>
        <ToastContainer />
      <div className="p-5 d-flex flex-column justify-content-center align-items-start todo-update">
      <h2>Update Your Task</h2>
      <input
        type="text"
        name="title"
        className="todo-inputs my-4 w-100 p-3 bg-white"
        value={inputs.title}
        onChange={handleChange}
      />

      <textarea
        name="body"
        className="todo-inputs w-100 p-3 bg-white"
        value={inputs.body}
        onChange={handleChange}
      />

      <div>
        <button className="btn btn-primary my-4" onClick={handleUpdate}>
          Update
        </button>
        <button
          className="btn btn-danger my-4 mx-4"
          onClick={() => onUpdated()}
        >
          Close
        </button>
      </div>
    </div>
    </div>
  )
}

export default UpdateUI
