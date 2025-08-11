interface ChipProps {
    label: string;
    color: string;
}

const Chip: React.FC<ChipProps> = ({label, color})=>{

    let chipClasses = '';

      switch (color.toLowerCase()) {
    case 'in-progress':
      chipClasses = 'bg-blue-100 text-blue-800';
      break;
    case 'high':
      chipClasses = 'bg-red-100 text-red-800';
      break;
    case 'medium':
      chipClasses = 'bg-yellow-100 text-yellow-800';
      break;
    case 'low':
      chipClasses = 'bg-green-100 text-green-800';
      break;
    case 'todo':
      chipClasses = 'bg-gray-100 text-gray-800';
      break;
    case 'done':
      chipClasses = 'bg-green-100 text-green-800';
      break;
    case 'will-not-do':
      chipClasses = 'bg-red-100 text-red-800';
      break;
    default:
      chipClasses = 'bg-gray-200 text-gray-800';
      
    }
    return(
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${chipClasses}`}>
      {label}
    </span>
    )
}

export default Chip;