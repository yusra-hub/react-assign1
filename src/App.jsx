import Taskform from './components/taskform'
import './App.css'
import img1 from './assets/download.png'
import Userlist from './components/userlist'
import './components/user.css'
import { useState } from 'react'
function App() {
  const [pagetask , setUserlist] = useState("tasks")

  return (
    <div className='app'>

      <aside className='sidebar'>

        <h2>TaskManager</h2>

        <nav>

          <p onClick={() => setUserlist("tasks")}>
            <svg 
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 6h11M9 12h11M9 18h11" />
              <path d="m3 6 1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2" />
            </svg>
            Tasks
          </p>

          <p onClick={() => setUserlist("users")}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="8" r="4" />
              <path d="M3 21v-2a6 6 0 0 1 12 0v2" />
              <path d="M16 4.5a4 4 0 0 1 0 7.5" />
              <path d="M21 21v-2a6 6 0 0 0-4-5.65" />
            </svg>
            Users
          </p>

        </nav>

      </aside>

      <main className='main-content'> 

        <div className="brand">
          <img src={img1} alt="Graduation cap" className="img1" />

          <div className="brand-text">
            <h1>
              Student <span>Management Systems</span>
            </h1>

            <p>Manage your tasks and stay productive.</p>
          </div>
        </div>

        <div className="main-sec">
         {pagetask === "tasks" && <Taskform/>}
          {pagetask === "users" && <Userlist/>}
        </div>


      </main>

    </div>
  )
}
export default App