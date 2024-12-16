import { getTaskList, TaskDetail } from "@/api/task"
import { TaskComponent } from "@/components/TaskComponent"
import { useEffect, useState } from "react"

export default function TaskManagement() {
  const [tasks, setTasks] = useState<TaskDetail[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  
  const handleFetch = async () => {
    const data = await getTaskList({ root: true, page: currentPage })
    setTasks(data?.items || [])
    setTotalPages(data?.totalPages || 1)
  }

  useEffect(() => {
    handleFetch()
  }, [currentPage])

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-extrabold text-gray-900">Task Status</h1>
      {tasks.map((task) => <TaskComponent {...task} />)}
      <div className="text-gray-600">
        {currentPage > 1 && <button onClick={() => setCurrentPage(currentPage - 1)}>{"<"}</button>}
        <p>{currentPage}/{totalPages}</p>
        {currentPage < totalPages && <button onClick={() => setCurrentPage(currentPage + 1)}>{">"}</button>}
      </div>
    </div>
  )    
}
