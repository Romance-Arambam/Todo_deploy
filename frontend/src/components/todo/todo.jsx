import "./todo.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import TodoCards from "./todoCards";
import UpdateUI from "./UpdateUI";

export default function Todo() {
  const [id, setId] = useState(sessionStorage.getItem("Id"));
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [tasks, setTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${window.location.origin}/getTasks/` + id);
      setTasks(res.data.list);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  // 🔹 Runs when id changes
  useEffect(() => {
    if (id) fetchTasks();
  }, [id]);

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    if (Inputs.title.trim() === "" || Inputs.body.trim() === "") {
      toast.error("Title and Body cannot be empty!");
      return;
    }

    if (id) {
      try {
        const res = await axios.post(`${window.location.origin}/addTask`, {
          title: Inputs.title,
          body: Inputs.body,
          id,
        });

        setTasks((prev) => [...prev, res.data.list]); // push new task
        setInputs({ title: "", body: "" });
        document.getElementById("textarea").style.display = "none";
        toast.success("Task Added Successfully!");
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Server error, please try again later."
        );
      }
    } else {
      setTasks((prev) => [...prev, Inputs]);
      setInputs({ title: "", body: "" });
      toast.success("Task Added Successfully!");
      toast.info("Note: Your tasks won't be saved as you are not logged in.");
    }
  };

  
const del = async (cardid) => {
  if (!id) {
    toast.error("You are not logged in! Please login to delete tasks.");
    return;
  }

  try {
    setTasks((prev) => prev.filter((t) => t._id !== cardid));

    const res = await axios.delete(`${window.location.origin}/deleteTask/` + cardid, {
      data: { id },
    });
    console.log("delete response:", res.data);

    toast.success("Task Deleted Successfully!");
    if (res.data && Array.isArray(res.data.list)) {
      setTasks(res.data.list);
    }
  } catch (err) {
    console.error("Delete failed:", err);
    toast.error("Failed to delete task on server. Refreshing list.");
    await fetchTasks();
  }
};


  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);

 
  const showUpdate = (item) => {
    if(id){
    setShowUpdateModal(true);
    setUpdateItem(item);

    }else{
      toast.error("You are not logged in! Please login to update tasks.");
    }
  };
 
  const hideUpdate = () => {
    setShowUpdateModal(false);
    setUpdateItem(null);
  }
  return (
    <>
      <div className="todo">
        <ToastContainer />
        {!showUpdateModal && (
        <div>
          <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
            <div className="d-flex flex-column todo-inputs-div w-50 p1">
              <input
                type="text"
                placeholder="TITLE"
                className="my-2 p-2 todo-inputs"
                onClick={show}
                name="title"
                value={Inputs.title}
                onChange={change}
              />
              <textarea
                id="textarea"
                placeholder="BODY"
                className="p-2 todo-inputs"
                name="body"
                value={Inputs.body}
                onChange={change}
                style={{ display: "none" }}
              />
            </div>
            <div className="w-50 d-flex justify-content-end my-3">
              <button className="todo-btn px-2" onClick={submit}>
                Add Task
              </button>
            </div>
          </div>
          <div className="todo-body">
            <div className="container-fluid">
              <div className="row">
                {tasks.map((item, index) => (
                  <div
                    className="col-lg-3 col-10 mx-5 my-2"
                    key={item._id || index}
                  >
                    
                    <TodoCards
                      id={item._id}
                      item={item}
                      onDelete={del}
                      onUpdate={showUpdate}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        )}
        {showUpdateModal && (
      <div className="bg-red-500">
        <UpdateUI item={updateItem} onUpdated={hideUpdate} tasks={tasks} setTasks={setTasks}/>
      </div>
        )}
      </div>
    </>
  );
}
