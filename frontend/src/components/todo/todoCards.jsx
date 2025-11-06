import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";

function TodoCards({id, item, onDelete, onUpdate}) {
  return (
    <div>
      <div className="todo-cards p-3 shadow-md">
            <div>
                {/* <p>{id}</p> */}
              <h5>{item.title}</h5>
              <p>{item.body.length > 80 ? item.body.substring(0, 80) + "..." : item.body}</p>
            </div>
            <div className="d-flex justify-content-around">
              <div className="d-flex justify-content-center align-items-center card-item px-1 py-1" onClick={() => onUpdate(item)}>
                <GrUpdate className="card-icons " /> Update
              </div>
              <div
                className="d-flex justify-content-center align-items-center card-item px-1 py-1"
                onClick={() => {
                    onDelete(id)
                }}
              >
                <MdDeleteForever className="card-icons del" /> Delete
              </div>
            </div>
          </div>
    </div>
  )
}

export default TodoCards
