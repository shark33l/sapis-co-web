import { NavItem } from '@/types';
import SocialMediaIcons from '../UI/SocialMediaIcons/SocialMediaIcons';

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navItems: NavItem[];
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, setIsOpen, navItems }) => {
  return (
    <div
      className={`fixed inset-0 bg-light-nav-bg transform transition-transform duration-300 ease-in-out grid grid-rows-5 ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      } lg:hidden z-40`}
    >
      <div className="flex flex-col items-center justify-center h-full space-y-8 row-span-3 row-start-2">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-xl nav-style"
            onClick={() => setIsOpen(false)}
          >
            {item.title}
          </a>
        ))}
      </div>
      <div className='flex items-center justify-center h-full row-start-5'><SocialMediaIcons width={30} /></div>
    </div>
  );
};

export default MobileNav