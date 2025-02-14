import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavItem, SectionId } from '@/types';

// Custom hooks
import { useScrollSpy } from '../hooks/useScrollSpy';

// Custom Components
import MobileNav from './MobileNav';
import SocialMediaIcons from '../UI/SocialMediaIcons/SocialMediaIcons';

// Assets
import sapisLogo from '/Sapis_Logo_SHK_Full.svg'


export const navItems: NavItem[] = [
  { id: 'home', title: 'Home', href: '/', order: 1 },
  { id: 'about',title: 'About Us', href: '#about', order: 2 },
  { id: 'services',title: 'Our Services', href: '#services', order: 3 },
  { id: 'our-purpose',title: 'Our Purpose', href: '#our-purpose', order: 4 },
  { id: 'contact',title: 'Contact Us', href: '#contact', order: 5 },
];

const Navbar = () => {
  const offset = 200;
  const activeSection = useScrollSpy();
  const [isOpen, setIsOpen] = useState(false);

  // Handle initial URL on page load
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          const top = element.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  // Handle URL on scroll
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if(hash !== activeSection){
      // Change only if the section is not home, if it is home, change it to root url '/'
      if(activeSection == 'home'){
        window.history.replaceState(null, '', '/');
      } else {
        window.history.replaceState(null, '', `#${activeSection}`);
      }
    }

    // Update Page Title
    const activeTitle = navItems.find(item => item.id === activeSection)?.title || 'Sapis';
    document.title = activeSection !== "home" ? `Sapis |  ${activeTitle}` : `Sapis | Super Alpha Petroleum Infrastructure Services`
  }, [activeSection])

  // Function to handle when a Nav is clicked
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: SectionId, path: string) => {
    e.preventDefault();
    
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
    } else {
      const element = document.getElementById(id);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
        window.history.pushState(null, '', path);
      }
    }
  };

  return (
    <div className='sticky top-3 z-50 '>
      <div className='blur-overlay absolute -top-3 w-full h-[55px]'></div>
    <nav className=" bg-light-nav-bg border-b rounded-3xl m-3">
      <div className="mx-auto px-8 grid grid-cols-4">
        <div className='flex z-50'><a href='/' className='flex'><img className="w-[100px]" src={sapisLogo} alt="Sapis Logo"/></a></div>
        <div className="flex justify-end h-10 col-span-3">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-xs uppercase nav-style ${activeSection === item.id && 'nav-selected' }`}
                onClick={(e) => handleNavClick(e, item.id, item.href)}
              >
                {item.title}
              </a>
            ))}
            <SocialMediaIcons width={16}/>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 flex items-center z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} color='black'/> : <Menu size={24} color='black'/>}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} navItems={navItems} handleNavClick={handleNavClick}/>
    </nav>
    </div>
  );
};

export default Navbar;