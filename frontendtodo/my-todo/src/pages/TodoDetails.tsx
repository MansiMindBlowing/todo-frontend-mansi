import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchTodosStart, fetchTodosSuccess, fetchTodosFailure, type Todo, deleteTodo } from "../features/todo/todoSlice";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { FaDeleteLeft } from "react-icons/fa6";
// import { MdEdit } from "react-icons/md";
import { updateTodo } from '../features/todo/todoSlice'

import Modal from "../components/Modal";
import Button from "../../constants/Button";
import AddForm from "./AddForm";
import ToDoFilters from "../components/TodoFilters";
import Navbar from "../components/Nabvar";
import ToDoItem from "../components/TodoItems";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";



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
  // const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [page, setPage] = useState(1)
  const [totalTodos, setTotalTodos] = useState(0);

  const totalPages = Math.ceil(totalTodos/itemsPerPage);
  useEffect(() => {
    const fetchTodos = async () => {
      if (!token) return;
      dispatch(fetchTodosStart());

      try {
        // const url = searchQuery ? `http://localhost:3000/api/todos?search=${searchQuery}`
        //   : "http://localhost:3000/api/todos";

        const params = new URLSearchParams();
        if (searchQuery) params.append('title', searchQuery);
        if (statusFilter) params.append('status', statusFilter);
        if (priorityFilter) params.append('priority', priorityFilter);
        params.append('page', String(page));
        params.append('limit', String(itemsPerPage));

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

        const data: { todos: Todo[], total: number } = await response.json();
        dispatch(fetchTodosSuccess(data.todos));
        setTotalTodos(data.total);
      } catch (err) {
        console.error("Error fetching todos:", err);
        dispatch(fetchTodosFailure((err as Error).message));
      }
    };

    fetchTodos();
  }, [dispatch, token, searchQuery, statusFilter, priorityFilter, page]);

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


  const handleUpdateTodo = async (id: string, updatedData: Partial<Todo>) => {

    if (!token) {
      return;
    }

    try {

      const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update task.');
      }

      dispatch(updateTodo({ id: id, updatedData: updatedData }));
      setPage(page);

    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const paginate = (pageNumber: number)=>{
    if(pageNumber>=1 && pageNumber<=totalPages){
      setPage(pageNumber)
    }
  }

  return (

    <>
      <Navbar />
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
                    onEdit={() => { setSelectedTodo(todo); setIsEditModalOpen(true)}}
                    onDelete={() => { setSelectedTodo(todo); setIsDeleteModalOpen(true) }}
                    onUpdate={handleUpdateTodo} />
                ))}
              </div>
            ) : (
              !loading && <p className="text-center text-gray-500">No todos found.</p>
            )}

                  {!loading && totalTodos > itemsPerPage && (
                            <div className="flex justify-center items-center mt-6 space-x-2">
                                <button
                                    onClick={() => paginate(page - 1)}
                                    disabled={page === 1}
                                    className={`p-2 rounded-full transition-colors duration-200 ${page === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-800 text-white hover:bg-blue-600'}`}
                                >
                                    <FaChevronLeft />
                                </button>
                                {[...Array(totalPages).keys()].map(number => (
                                    <button
                                        key={number + 1}
                                        onClick={() => paginate(number + 1)}
                                        className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${number + 1 === page ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                    >
                                        {number + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => paginate(page + 1)}
                                    disabled={page === totalPages}
                                    className={`p-2 rounded-full transition-colors duration-200 ${page === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-800 text-white hover:bg-blue-600'}`}
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
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
