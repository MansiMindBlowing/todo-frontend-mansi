import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchTodosStart, fetchTodosSuccess, fetchTodosFailure, type Todo, deleteTodo } from "../features/todo/todoSlice";
// import { FaEdit, FaTrash } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import {updateTodo} from '../features/todo/todoSlice'

import Modal from "../components/Modal";
import Button from "../../constants/Button";
import AddForm from "./AddForm";
import ToDoFilters from "../components/TodoFilters";
import Navbar from "../components/Nabvar";
import ToDoItem from "../components/TodoItems";



const TodoDetails = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!token) return;
      dispatch(fetchTodosStart());

      try {
        // const url = searchQuery ? `http://localhost:3000/api/todos?search=${searchQuery}`
        //   : "http://localhost:3000/api/todos";

        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (statusFilter) params.append('status', statusFilter);
        if (priorityFilter) params.append('priority', priorityFilter);

        const url = `http://localhost:3000/api/todos?${params.toString()}`

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data: { todos: Todo[] } = await response.json();
        dispatch(fetchTodosSuccess(data.todos));
      } catch (err) {
        console.error("Error fetching todos:", err);
        dispatch(fetchTodosFailure((err as Error).message));
      }
    };

    fetchTodos();
  }, [dispatch, token, searchQuery, statusFilter, priorityFilter]);

  const handleDelete = async () => {
    if (!selectedTodo || !token) return;

    try {

      const response = await fetch(`http://localhost:3000/api/todos/${selectedTodo.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }


      dispatch(deleteTodo(selectedTodo.id));
      setIsDeleteModalOpen(false);
      setSelectedTodo(null);
    } catch (error) {
      console.error("Failed to delete task:", error);

    }
  };

  const handleUpdateTodo = async (id: string, updateData: { [key: string]: any }) => {
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

     
      dispatch(updateTodo({ id, updateData }));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    
    <>
     <Navbar/>
       <div className="min-h-screen bg-gray-100 font-inter text-gray-800">
        
      
   
      <div className="min-h-screen bg-gray-100 font-inter text-gray-800 p-8 ">
    
      <div className="p-10">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">My Todos</h1>
          <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center space-x-2">
            <span>➕</span>
            <span>Add Todo</span>
          </Button>
        </div>

        <ToDoFilters searchQuery={searchQuery} onSearchChange={setSearchQuery} statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter} />

        {loading && <p className="text-center text-gray-500">Loading todos...</p>}

        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && todos.length > 0 ? (
          <div className="flex flex-col gap-3 ">
            {todos.map((todo) => (
              // <div key={todo.id} className="w-full p-3 bg-white rounded-lg shadow">
              //   <h3 className="text-lg font-bold">{todo.title}</h3>
              //   <p className="text-gray-600">{todo.desc}</p>
              //   <div className="flex justify-between text-sm text-gray-500 mt-2">
              //     <span>Status: {todo.status}</span>
              //     <span>Priority: {todo.priority}</span>

              //   </div>
              //   <div className="mt-4 flex justify-end space-x-2">
              //     <button onClick={() => { setSelectedTodo(todo); setIsEditModalOpen(true) }}> <MdEdit />
              //     </button>
              //     <button onClick={() => {
              //       setSelectedTodo(todo); setIsDeleteModalOpen(true);
              //     }}>
              //       <FaDeleteLeft />
              //     </button>
              //   </div>
              // </div>
              <ToDoItem
              key={todo.id}
              todo={todo}
              onEdit={()=>{setSelectedTodo(todo); setIsAddModalOpen(true)}} 
              onDelete={()=>{setSelectedTodo(todo); setIsDeleteModalOpen(true)}}
              onUpdate={handleUpdateTodo}/>
            ))}
          </div>
        ) : (
          !loading && <p className="text-center text-gray-500">No todos found.</p>
        )}


        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Task">
          <AddForm onCancel={() => setIsAddModalOpen(false)} />
        </Modal>


        <Modal isOpen={isEditModalOpen} onClose={() => { setIsEditModalOpen(false); setSelectedTodo(null); }} title="Edit Task">
          {selectedTodo && <AddForm onCancel={() => { setIsEditModalOpen(false); setSelectedTodo(null); }} initialData={selectedTodo} />}
        </Modal>


        <Modal isOpen={isDeleteModalOpen} onClose={() => { setIsDeleteModalOpen(false); setSelectedTodo(null); }} title="Confirm Deletion">
          <p className="text-gray-700 mb-4">Are you sure you want to delete the task: <span className="font-semibold">{selectedTodo?.title}</span>?</p>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => { setIsDeleteModalOpen(false); setSelectedTodo(null); }}>
              Edit
            </Button>
            <Button onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    </div>

     </div>
    </>
  
  );
};

export default TodoDetails;
