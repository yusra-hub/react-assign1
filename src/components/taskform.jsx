import { useState } from "react"
function Taskform() {

    const [task, setTasks] = useState("")
    const [addtasks, setaddtasks] = useState([])

    return (

        <>
        

            <div className="tasks">

                <div className="total-tasks">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke=" #e2daf7"
                        strokeWidth="2"
                    >
                        <path d="M9 6h11M9 12h11M9 18h11" />
                        <path d="m3 6 1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2" />
                    </svg>
                    <p className="para1">Total tasks</p>
                    <br />
                    <span className="spn1">{addtasks.length}</span>
                    <br />
                    <p className="para1">All your tasks</p>


                </div>

                <div className="completed-tasks">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#6ee7b7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="m8 12 3 3 5-6" />
                    </svg>
                    <p className="para1">Completed Tasks</p>
                    <br />
                    <span className="spn1">{addtasks.filter((item) => item.completed).length}</span>
                    <br />
                    <p className="para1">Tasks finished</p>

                </div>
            </div>

            <div className="inputs">
                <h1>Add a New Task</h1>
                <div className="main-inps">
                    <span className="spn2">New Tasks</span>
                    <br />
                    <div className="divs-flex" >
                        <input type="text"
                            name="tasks"
                            id="inps"
                            placeholder="Enter a new task"
                            className="inp1"
                            value={task}
                            onChange={(e) => setTasks(e.target.value)}
                        />
                        <button className="btn1"
                            onClick={() => {
                                if(task.trim() !== ""){
                                 setaddtasks([...addtasks, {
                                    id : Date.now(),
                                    text : task,
                                    completed : false
                                 }


                                 ])
                                 setTasks("")
                                }
                            }}>Add task</button>
                    </div>

                    <div className="lists">
                        {addtasks.map((stdtasks,index) => {
                            return (
                                <div className="task-item" key={stdtasks.id}>
                                    <p className={stdtasks.completed ? "completed" : ""}>
                                        {stdtasks.text}
                                    </p>
       
                                    <div className="task-buttons">
                                        <button className="complete-btn" onClick={() => 
                                            setaddtasks(addtasks.map((item) => 
                                            item.id === stdtasks.id
                                        ? {...item, completed : !item.completed}
                                        :item
                                            ))}>
                                    {stdtasks.completed ? "undo" : "Completed"}
                                        </button>

                                        <button className="delete-btn" onClick={() =>
                                            
                                        setaddtasks(addtasks.filter((task,i ) => i !== index))}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </>
    )
}
export default Taskform