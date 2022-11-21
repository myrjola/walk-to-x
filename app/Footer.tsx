import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

export default function Footer() {
  return (
    <footer className="flex justify-between bg-stone-800 p-5 gap-2 items-baseline">
      <div className="text-gray-400 text-xs">© 2022 Martin Yrjölä</div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/myrjola/walk-to-x"
        className="group rounded whitespace-nowrap text-gray-300 hover:text-white p-4 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white"
      >
        Fork me on Github
        <span className="flex items-center">
          <ArrowTopRightOnSquareIcon
            aria-hidden="true"
            className="h-5 w-5 text-gray-300 group-hover:text-white"
          />
        </span>
      </a>
    </footer>
  );
}
