interface ChipProps {
    label: string;
    color: string;
    value: string;
    options: string;
     onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Chip: React.FC<ChipProps> = ({label, color, options, value, onChange})=>{

    let chipClasses = '';

      switch (color.toLowerCase()) {
    case 'in-progress':
      chipClasses += 'bg-blue-100 text-blue-800';
      break;
    case 'high':
      chipClasses += 'bg-red-100 text-red-800';
      break;
    case 'medium':
      chipClasses +=  'bg-yellow-100 text-yellow-800';
      break;
    case 'low':
      chipClasses +=  'bg-green-100 text-green-800';
      break;
    case 'todo':
      chipClasses +=  'bg-gray-100 text-gray-800';
      break;
    case 'done':
      chipClasses +=  'bg-green-100 text-green-800';
      break;
    case 'will-not-do':
      chipClasses +=  'bg-red-100 text-red-800';
      break;
    default:
      chipClasses +=  'bg-gray-200 text-gray-800';
      
    }
    return(
         <select
      value={value}
      onChange={onChange}
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none cursor-pointer ${chipClasses}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    )
}

export default Chip;