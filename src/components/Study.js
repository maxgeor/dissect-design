export default function Study(props) {
  return (
    <article>
      <section className="flex items-baseline flex-wrap">
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
        <p
          className="
            text-gray text-13
            tracking-tight
          "
        >
          {props.domain}
        </p>
      </section>
      <p className="text-gray text-sm tracking-tighter">
        from<span className="tracking-tight text-13 ml-1">{props.adder}</span>
      </p>
    </article>
  );
}
