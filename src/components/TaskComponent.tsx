import { getTaskList, TaskDetail } from "@/api/task"
import { useEffect, useState } from "react"

export const TaskComponent: React.FC<TaskDetail> = (task) => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [showChildren, setShowChildren] = useState<boolean>(false)
  const [children, setChildren] = useState<TaskDetail[]>([])

  const handleAddChild = async (currPage: number) => {
    try {
      const data = await getTaskList({ parentTaskId: task.id, page: currPage })
      setChildren(data?.items || [])
      setTotalPage(data?.totalPages || 1)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleAddChild(currentPage)
  }, [currentPage])

  const borderColor = BORDER_COLOR[task.status as keyof typeof BORDER_COLOR] || ""

  return (
    <div className={`flex flex-col w-full text-gray-600 gap-1 m-2 p-2 border-2 ${borderColor}`}>
      <div className="flex gap-4 flex-wrap">
        <FieldComponent label="URL" value={task.url} />
        <FieldComponent label="STATUS" value={task.status} custom={TEXT_COLOR[task.status as keyof typeof TEXT_COLOR] || ""} />
        {task.totalDescendant > 0 && <FieldComponent label="DESCENDANTS" value={task.totalDescendant.toString()} />}
        <FieldComponent label="CREATED AT" value={task.createdAt} />
      </div>
      {(task.totalDescendant > 0) && (
        <div className="flex flex-wrap gap-2">
          <StatusComponent status={"SUCCESS"} count={task.totalDescendantSuccess} />
          <StatusComponent status={"RUNNING"} count={task.totalDescendantRunning} />
          <StatusComponent status={"PENDING"} count={task.totalDescendantPending} />
          <StatusComponent status={"ERROR"} count={task.totalDescendantError} />
          <div className="flex gap-2">
            { currentPage > 1 && <button onClick={() => { if (currentPage > 1) setCurrentPage(currentPage - 1) }}>{"<"}</button> }
            <button onClick={() => {
                setShowChildren(!showChildren)
                if (currentPage === 0) { setCurrentPage(1) }
            }}>{showChildren ? 'Hide' : 'Show'}</button>
            { currentPage < totalPage && <button onClick={() => {if (currentPage < totalPage) setCurrentPage(currentPage + 1)}}>{">"}</button> }
          </div>
        </div>
      )}
      {(showChildren && children.length > 0) && children.map((child) => (
        <TaskComponent key={child.id} {...child} />
      ))}
    </div>
  )
}

const BORDER_COLOR = {
  "PENDING": "border-yellow-500",
  "RUNNING": "border-blue-500",
  "SUCCESS": "border-green-800",
  "ERROR": "border-red-500"
}

const TEXT_COLOR = {
  "PENDING": "text-yellow-500",
  "RUNNING": "text-blue-500",
  "SUCCESS": "text-green-800",
  "ERROR": "text-red-500"
}

const FieldComponent: React.FC<{ label: string, value: string, custom?: string }> = ({ label, value, custom }) => {
  return (
    <div className="flex gap-2">
      <p className="min-w-16 underline">{label}:</p>
      <p className={custom ?? ''}>{value}</p>
    </div>
  )
}

const StatusComponent: React.FC<{ status: string, count?: number, custom?: string }> = ({ status, count }) => {
  const textColor = TEXT_COLOR[status as keyof typeof TEXT_COLOR] || ""
  const borderColor = BORDER_COLOR[status as keyof typeof BORDER_COLOR] || ""
  return (
    <div className={`flex w-32 justify-between gap-2 px-1 border-2 rounded ${textColor} ${borderColor}`}>
      <p className="w-20 max-w-20">{status}</p>
      {typeof count === "number" && <p className="">{count}</p>}
    </div>
  )
}
