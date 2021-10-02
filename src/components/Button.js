export default function Button(props) {
  return (
    <button
      onClick={props.handleClick}
      type={props.type}
      id={props.id}
      className={`
        border 
        font-medium
        px-4
        h-9
        h-min
        box-border
        rounded-full
        shadow-outer
        active:shadow-none
        transition-all
        ${
          props.isPrimary
            ? "border-blue hover:border-blue-dark bg-blue hover:bg-blue-dark active:text-white-blue active:bg-blue-darker text-white"
            : "border-gray-lightish hover:bg-gray-faint bg-white text-black"
        }
      `}
    >
      {props.text}
    </button>
  );
}
