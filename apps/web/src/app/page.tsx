import HomeView from '@/view/home/homepage-registered-user';
import HeroSection from '@/view/home/components/heroSection';

function Home() {
  return (
    <main>
      <HeroSection />
      <HomeView />
    </main>
  );
}

export default Home;