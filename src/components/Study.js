export default function Study(props) {
  return (
    <article>
      <section className="flex items-baseline flex-wrap">
        <a
          href={props.link}
          target="_blank"
          rel="noreferrer"
          className="
            font-semibold
            text-blue
            visited:text-purple
            hover:underline
            focus:underline
          "
        >
          {props.title}
          <span
            className="
            ml-1.5
            text-gray text-13
            tracking-tight
            font-normal
          "
          >
            {props.domain}
          </span>
        </a>
      </section>
      <p className="text-gray text-sm tracking-tighter">
        from
        <span className="tracking-tight text-13 ml-1 truncate">
          {props.adder}
        </span>
      </p>
    </article>
  );
}
