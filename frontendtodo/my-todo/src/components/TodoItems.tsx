


import { MdEdit } from "react-icons/md";
import Chip from "./Chip";
import { FaDeleteLeft } from "react-icons/fa6";




interface ToDoItemProps {
    todo: any;
    onEdit: () => void;
    onDelete: () => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, onEdit, onDelete }) => {
    return (
        <div className="w-full p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="w-full flex flex-col items-start justify-between p-4">
                <h3 className="text-lg font-bold">{todo.title}</h3>
                <p className="text-gray-600">{todo.desc}</p>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex space-x-2 ">
                    <Chip label={todo.status} color={todo.status} />
                    <Chip label={todo.priority} color={todo.priority} />
                </div>
                <div className="flex justify-end space-x-2">
                    <button onClick={onEdit} className="text-indigo-600 hover:text-indigo-800">
                        <MdEdit size={20} />
                    </button>
                    <button onClick={onDelete} className="text-red-600 hover:text-red-800">
                        <FaDeleteLeft size={20} />
                    </button>
                </div>

            </div>

        </div>
    )
}

export default ToDoItem