import AdminButtons from "./AdminButtons";

export default function Study(props) {
  return (
    <article className="flex justify-between">
      <section className="h-full">
        <div className="flex items-baseline flex-wrap">
          <a
            href={props.link}
            target="_blank"
            rel="noreferrer"
            className="
            mr-1.5
            font-medium
            text-blue
            hover:underline
            focus:underline
          "
          >
            {props.title}
          </a>
          <span
            className="
           
            text-gray text-13
            tracking-tight
            font-normal
            hover:no-underline
          "
          >
            {props.domain}
          </span>
        </div>
        <p className="text-gray text-sm tracking-tighter truncate flex-shrink min-w-0 flex-1">
          from
          <span className="tracking-tight text-13 ml-1 truncate min-w-0 flex-shrink overflow-hidden">
            {props.adder}
          </span>
        </p>
      </section>
      <AdminButtons
        inSuccessMsg={props.inSuccessMsg}
        isApproved={props.isApproved}
      />
    </article>
  );
}
