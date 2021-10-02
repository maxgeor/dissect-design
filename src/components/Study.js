import AdminButtons from "./AdminButtons";

export default function Study(props) {
  return (
    <article className="flex justify-between">
      <section className="h-full w-full self-start mr-7">
        <div className="flex items-baseline flex-wrap">
          <a
            href={props.link}
            target="_blank"
            rel="noreferrer"
            className="
            mr-1.5
            font-semibold
            text-blue
            visited:text-purple
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
        <p className="text-gray text-sm tracking-tighter">
          from
          <span className="tracking-tight text-13 ml-1 truncate">
            {props.adder}
          </span>
        </p>
      </section>
      <AdminButtons isApproved={props.isApproved} />
    </article>
  );
}
