import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavItem } from '@/types';

// Custom Components
import MobileNav from './MobileNav';
import SocialMediaIcons from '../UI/SocialMediaIcons/SocialMediaIcons';

// Assets
import sapisLogo from '/Sapis_Logo_SHK_Full.svg'


const navItems: NavItem[] = [
  { title: 'HOME', href: '/' },
  { title: 'ABOUT US', href: '#about' },
  { title: 'OUR SERVICES', href: '#services' },
  { title: 'OUR PURPOSE', href: '#purpose' },
  { title: 'CONTACT US', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-3 bg-light-nav-bg z-50 border-b rounded-3xl m-3">
      <div className="mx-auto px-8 grid grid-cols-4">
        <div className='flex z-50'><a href='/' className='flex'><img className="w-[100px]" src={sapisLogo} alt="Sapis Logo"/></a></div>
        <div className="flex justify-end h-14 col-span-3">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm nav-style"
              >
                {item.title}
              </a>
            ))}
            <SocialMediaIcons width={20}/>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 flex items-center z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} color='black'/> : <Menu size={24} color='black'/>}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} navItems={navItems} />
    </nav>
  );
};

export default Navbar;