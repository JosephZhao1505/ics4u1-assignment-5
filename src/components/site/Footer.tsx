import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="mt-10 w-full py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4">
        <nav className="flex items-center space-x-4">
          <a
            className="text-2xl text-gray-600 transition-colors duration-200 hover:text-black"
            href="https://github.com/JosephZhao1505"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaGithub />
          </a>
        </nav>

        <div className="text-center">
          <p className="font-medium text-sm">Taking up space on the internet since 2008</p>
          <p className="mt-1 text-gray-500 text-xs">&copy; {new Date().getFullYear()} BrokeFlix+. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
