


import { MdEdit } from "react-icons/md";
import Chip from "./Chip";
import { FaDeleteLeft } from "react-icons/fa6";




interface ToDoItemProps {
    todo: any;
    onEdit: () => void;
    onDelete: () => void;
    onUpdate: (id: string, updateData: { [key: string]: any }) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, onEdit, onDelete, onUpdate}) => {

    const statusOptions = [
        { label: 'todo', value: 'todo' },
        { label: 'in-progress', value: 'in-progress' },
        { label: 'done', value: 'done' },
        { label: 'will-not-do', value: 'will-not-do' }
    ]

    const priorityOptions = [
        { label: 'low', value: 'low' },
        { label: 'medium', value: 'medium' },
        { label: 'high', value: 'high' },

    ]

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        onUpdate(todo.id, { status: newStatus });
    }

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPriority = e.target.value;
        onUpdate(todo.id, { priority: newPriority });
    };

    return (
        <div className="w-full p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="w-full flex flex-col items-start justify-between p-4">
                <h3 className="text-lg font-bold">{todo.title}</h3>
                <p className="text-gray-600">{todo.desc}</p>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex space-x-2 mt-2">
                    <Chip label={todo.status} color={todo.status} value={todo.status} options={statusOptions} onChange={handleStatusChange} />
                    <Chip label={todo.priority} color={todo.priority} value={todo.priority}
                        options={priorityOptions}
                        onChange={handlePriorityChange} />
                </div>
                <div className="flex justify-end space-x-2">
                    <button onClick={onEdit} className="text-indigo-600 hover:text-indigo-800">
                        <MdEdit size={20} className="text-indigo-600 hover:text-indigo-800" />
                    </button>
                    <button onClick={onDelete} >
                        <FaDeleteLeft size={20} />
                    </button>
                </div>

            </div>

        </div>
    )
}

export default ToDoItem