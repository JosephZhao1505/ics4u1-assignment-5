import { FaGithub } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="mt-10 w-full py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4">
        <nav className="flex items-center space-x-4">
          <a
            href="https://github.com/JosephZhao1505"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 transition-colors duration-200 hover:text-black"
          >
            <FaGithub />
          </a>
        </nav>

        <div className="text-center">
          <p className="text-sm font-medium">Taking up space on the internet since 2008</p>
          <p className="mt-1 text-xs text-gray-500">&copy; {new Date().getFullYear()} BrokeFlix+. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
