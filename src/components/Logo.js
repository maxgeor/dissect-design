import React from "react";

export default function Logo(props) {
  return (
    <div className="p-3 -ml-3.5 -mt-3 -mb-3 flex-shrink w-min text-black hover:text-blue">
      <svg
        className={`${props.isSmall ? "h-8 w-8" : "h-9 w-9"}`}
        width="440"
        height="440"
        viewBox="0 0 440 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="52"
          y="105.1"
          width="289.895"
          height="56.2208"
          rx="22"
          transform="rotate(-11.7631 52 105.1)"
          fill="#3569F8"
        />
        <rect
          x="111.849"
          y="393.98"
          width="190"
          height="92"
          rx="22"
          transform="rotate(-102.275 111.849 393.98)"
          fill="#04C98C"
        />
        <rect
          x="207.596"
          y="162.383"
          width="172.407"
          height="172"
          rx="22"
          transform="rotate(-2.69376 207.596 162.383)"
          fill="#F53F5E"
        />
      </svg>
    </div>
  );
}
