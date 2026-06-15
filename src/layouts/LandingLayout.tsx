import { Outlet } from 'react-router-dom';
import { LandingNavbar } from '../components/LandingNavbar/LandingNavbar';
import { Footer } from '../components/Footer/Footer';

export const LandingLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#1a1a2e' }}>
      <LandingNavbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
