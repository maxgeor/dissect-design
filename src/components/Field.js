import { ExclamationCircleIcon } from "@heroicons/react/solid";
export default function Field({
  name,
  type,
  placeholder,
  handleChange,
  error,
}) {
  return (
    <section>
      <input
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        type={type}
        className={`
                px-2.5
                placeholder-gray
                border
                rounded-md
                w-full
                text-base
                sm:text-md
                box-border
                h-9
                truncate
                pr-8
                shadow-inset
                ${
                  error
                    ? "border-yellow-500"
                    : "border-gray-lighter border-opacity-80"
                }
              `}
      />
      <div
        className={`flex items-center text-yellow-600 my-1.5 ml-1 ${
          error ? "block" : "hidden"
        }`}
      >
        <ExclamationCircleIcon className="flex-shrink-0 self-start fill-current text-yellow-600 rounded-full h-4 w-4 mr-1" />
        <p className="text-sm font-semibold mr-7">{error}</p>
      </div>
    </section>
  );
}
