import { NavItem } from '@/types';

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navItems: NavItem[];
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, setIsOpen, navItems }) => {
  return (
    <div
      className={`fixed inset-0 bg-light-nav-bg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      } md:hidden z-40`}
    >
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-xl font-manrope font-medium nav-style"
            onClick={() => setIsOpen(false)}
          >
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MobileNav