import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo } from '../features/todo/todoSlice';
import type { Todo } from '../features/todo/todoSlice';
import type { RootState } from "../redux/store";
import Button from '../../constants/Button';
// import { MdDescription } from 'react-icons/md';


interface TaskFormProps {
    onCancel: () => void;
    initialData?: Todo | null
}

const AddForm: React.FC<TaskFormProps> = ({ onCancel, initialData }) => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.desc || '');
    const [priority, setPriority] = useState(initialData?.priority || '');
    const [status, setStatus] = useState(initialData?.status || '');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.desc);
            setPriority(initialData.priority);
            setStatus(initialData.status);
        } else {
            setTitle('');
            setDescription('');
            setPriority('');
            setStatus('');
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            console.error("Authentication token is missing. Please log in.");
            return;
        }

        const taskData = {
            title,
            desc: description,
            priority,
            status
        };

       
        try {
            if (initialData) {

                const response = await fetch(`http://localhost:3000/api/todos/${initialData.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(taskData)
                });

                if (!response.ok) {
                    throw new Error("Failed to update todo");
                }

                const updatedTodo: Todo = await response.json();
                dispatch(updateTodo({ id: updatedTodo.id, updatedData: updatedTodo }));
            } else {

                const response = await fetch("http://localhost:3000/api/todos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(taskData)
                });

                if (!response.ok) {
                    throw new Error("Failed to add todo");
                }

                const addedTodo: Todo = await response.json();
                dispatch(addTodo(addedTodo));
            }
            onCancel();
        } catch (error) {
            console.error(`Failed to ${initialData ? 'update' : 'add'} task:`, error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
                <input
                    type="text"
                    placeholder='Add a title....'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none'
                    required
                />
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                <textarea
                    placeholder='Provide desc....'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md resize-none h-24 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    required
                />
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    >
                        <option value="">Select Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                        <option value="critical">Critical</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="todo">TODO</option>
                        <option value="in-progress">INPROGRESS</option>
                        <option value="on-hold">ONHOLD</option>
                        <option value="will-not-do">WILLNOTDO</option>
                        <option value="done">DONE</option>
                    </select>
                </div>
            </div>
            <div className='flex gap-2 justify-end'>
                <Button type='button' onClick={onCancel}>
                    Cancel
                </Button>
                <Button type='submit' >
                    Submit Task
                </Button>
            </div>
        </form>
    )
}
    




export default AddForm;
