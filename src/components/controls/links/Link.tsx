import type { ReactNode } from 'react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

type LinkProps = {
  children: ReactNode;
  to: string;
  match?: string[];
};

const baseStyles = 'relative px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:text-white';

export const Link = ({ children, to, match = [] }: LinkProps) => {
  const { pathname } = useLocation();
  const matched = match.some((pattern) => matchPath({ path: pattern, end: false }, pathname));

  return (
    <NavLink
      replace
      to={to}
      className={({ isActive }) => {
        const isCurrent = isActive || matched;
        return `${baseStyles} ${isCurrent ? 'text-white' : 'text-slate-400'}`;
      }}
    >
      {({ isActive }) => {
        const isCurrent = isActive || matched;
        return (
          <>
            {children}
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-indigo-500 transition-all duration-300 ${
                isCurrent ? 'w-full opacity-100' : 'w-0 opacity-0'
              }`}
            />
          </>
        );
      }}
    </NavLink>
  );
};
