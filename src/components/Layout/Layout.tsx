import Navbar from '../Navigation/NavBar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen">
      {/* <div className='blur-overlay'></div> */}
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout