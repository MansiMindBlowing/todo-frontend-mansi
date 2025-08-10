interface Filters {
    searchQuery: string;
    onSearchChange: (query: string) => void 
    statusFilter: string;
    onStatusChange: (status: string) => void;
    priorityFilter: string;
    onPriorityChange: (priority: string) => void;

}

const ToDoFilters: React.FC<Filters> = ({ searchQuery, onSearchChange, statusFilter,
    onStatusChange,
    priorityFilter,
    onPriorityChange }) => {

    return (
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
            <input type="text"
                placeholder="Search tasks by.. "
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none" />

            <div className="flex gap-4">
                <select
                    value={statusFilter}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                >
                    <option value="">Filter by Status</option>
                    <option value="todo">todo</option>
                    <option value="in-progress">in-progress</option>
                    <option value="done">done</option>
                    <option value="will-not-do">will-not-do</option>
                </select>
                <select
                    value={priorityFilter}
                    onChange={(e) => onPriorityChange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                >
                    <option value="">Filter by Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

        </div>
    )
}

export default ToDoFilters;