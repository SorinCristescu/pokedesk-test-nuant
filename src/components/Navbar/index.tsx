import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '../ThemeToggle';

export const Navbar = () => {
  return (
    <header className="fixed z-10 w-full bg-background">
      <nav
        className="container mx-auto flex items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/">
            <span className="sr-only">Your Logo</span>
            <Image
              width={100}
              height={250}
              src="/assets/images/pokedesk-logo.png"
              alt="Logo image"
            />
          </Link>
        </div>
        <div className="flex">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};
