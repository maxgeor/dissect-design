export default function Button(props) {
  return (
    <li>
      <section className="flex items-baseline flex-wrap">
        <a
          href={props.url}
          className="
            mr-1.5
            font-semibold
            text-blue
            visited:text-purple
            hover:underline
            focus:underline
          "
        >
          props.title
        </a>
        <a
          href={`www.${props.domain}`}
          className="
            text-gray text-13
            hover:underline
            focus:underline
            tracking-tight
          "
        >
          {props.domain}
        </a>
      </section>
      <p className="text-gray text-sm tracking-tighter">
        from<span className="tracking-tight text-13 ml-1">{props.adder}</span>
      </p>
    </li>
  );
}
