import { Button, Footer } from '@/components';
import { useNavigate } from 'react-router-dom';

export const LandingPageView = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <section className="w-full max-w-3xl space-y-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight">BrokeFlix+</h1>
        <p className="text-lg text-gray-400">Waste your time exponentially quicker with this waste of computing resources.</p>
        <p>Or go outside, that's good too</p>
        <Button onClick={() => navigate('/home')}>Enter</Button>
        <Footer />
      </section>
    </main>
  );
};
