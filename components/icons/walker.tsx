import React, { SVGProps } from "react";

const Walker = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => {
    return (
      <svg
        width="512"
        height="512"
        version="1.1"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <g transform="translate(-2.1046 1.0098)">
          <g transform="matrix(1.469 0 0 1.469 96.987 -79.958)">
            <circle cx="102.59" cy="108.09" r="54.347" strokeWidth="2" />
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="33.789"
            >
              <path d="m106.55 187.64c34.464 130.86-62.934 197.79-62.934 197.79" />
              <path d="m107.46 186.45c25.482 53.939 56.371 58.29 56.371 58.29" />
              <path d="m106.89 186.3c-47.45 41.956-50.447 80.416-50.447 80.416" />
            </g>
            <path
              d="m138.63 273.69c-2.6428 17.853-7.5281 33.899-13.562 48.08l35.58 70.412c4.2083 8.3282 14.371 11.668 22.699 7.459 8.3282-4.2083 11.668-14.371 7.459-22.699z"
              color="currentColor"
              strokeWidth="round"
            />
          </g>
        </g>
      </svg>
    );
  }
);

Walker.displayName = "Walker";

export default Walker;
