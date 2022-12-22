import { MouseEventHandler, useEffect, useState } from 'react';
import { HeaderLinkProps, headerLinks } from '../lib/config';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../img/logo.svg';
import Container from './Container';

export default function Header() {
  const location = useLocation();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleMenuState: MouseEventHandler = () => {
    setIsMenuOpened(prev => !prev);
  };
  useEffect(() => {
    setIsMenuOpened(false);
  }, [location]);

  return (
    <header className="bg-slate-900 text-white mb-4 dark:bg-neutral-800">
      <Container>
        <div className="flex justify-between items-center h-14">
          <a href="/" className="flex flex-col items-center">
            <img
              src={logo}
              alt="РЯЗАНСКИЙ КОЛЛЕДЖ ЭЛЕКТРОНИКИ"
              className="h-6"
            />
          </a>
          <button
            className="w-9 h-6 flex flex-col justify-between md:hidden"
            onClick={handleMenuState}
          >
            <span className="block w-full h-[3px] bg-slate-300"></span>
            <span className="block w-full h-[3px] bg-slate-300"></span>
            <span className="block w-full h-[3px] bg-slate-300"></span>
          </button>
          <div
            className={`bg-[#0007] transition-opacity fixed inset-0 z-30 md:hidden ${
              isMenuOpened ? '' : 'opacity-0 pointer-events-none'
            }`}
            onClick={handleMenuState}
          ></div>
          <div
            className={`bg-slate-900 dark:bg-neutral-800 md:bg-transparent fixed top-0 left-0 bottom-0 right-1/3 z-40 overflow-y-auto transition-transform md:static md:p-0 md:translate-x-0 ${
              isMenuOpened ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <nav>
              <ul className="flex flex-col my-12 gap-1 md:my-0 md:gap-10 md:flex-row">
                {headerLinks.map(linkProps => (
                  <li key={linkProps.href}>
                    <HeaderLink {...linkProps} />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
}

function HeaderLink(props: HeaderLinkProps) {
  if (props.kind === 'external') {
    return (
      <a
        target="_blank"
        href={props.href}
        className={createHeaderLinkClassName({
          isActive: false,
        })}
      >
        {props.text}
      </a>
    );
  }
  return (
    <NavLink to={props.href} className={createHeaderLinkClassName}>
      {props.text}
    </NavLink>
  );
}

interface HeaderClassName {
  isActive: boolean;
}

const headerLinkBaseClassName =
  'block p-4 pl-6 font-semibold md:text-sm md:p-1 transition-colors uppercase';

function createHeaderLinkClassName({ isActive }: HeaderClassName) {
  if (isActive) {
    return `${headerLinkBaseClassName} text-slate-50 dark:text-neutral-50`;
  }
  return `${headerLinkBaseClassName} text-slate-400 hover:text-slate-50 dark:text-neutral-400 dark:hover:text-neutral-50`;
}
