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
        outline-none
        focus:ring-1
        focus:ring-blue-light
        focus:border-blue-light
        active:shadow-none
        transition-all
        duration-100
        ${
          props.isPrimary
            ? "border-blue hover:border-blue-dark bg-blue hover:bg-blue-dark focus:bg-blue-dark active:text-white-blue active:bg-blue-darker text-white"
            : "border-gray-lightish hover:bg-gray-faint focus:bg-gray-faint bg-white text-black"
        }
      `}
    >
      {props.text}
    </button>
  );
}
