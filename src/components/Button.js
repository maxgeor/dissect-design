export default function Button(props) {
  return (
    <button
      onClick={props.handleClick}
      type={props.type}
      id={props.id}
      className={`
        whitespace-nowrap
        border 
        font-medium
        text-md
        px-4
        h-9
        h-min
        box-border
        rounded-full
        shadow-outer
        active:shadow-none
        transition-all
        duration-100
        ${props.isFullWidth && "w-full"}
        ${
          props.isPrimary
            ? "border-blue hover:border-blue-dark bg-blue hover:bg-blue-dark focus:bg-blue-dark hover:text-white-blue focus:text-white-blue text-white"
            : "border-gray-lightish hover:bg-gray-faint focus:bg-gray-faint bg-white text-black"
        }
      `}
    >
      {props.text}
    </button>
  );
}
