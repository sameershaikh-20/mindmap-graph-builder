import { Hero } from './Hero';
import { Features } from './Features';
import { Testimonials } from './Testimonials';
import { FAQ } from './FAQ';
import { Newsletter } from './Newsletter';

export const Landing = () => {
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </>
  );
};

export default Landing;
