import { Hero } from '../components/sections/Hero';
import { TrustBar } from '../components/sections/TrustBar';
import { Problem } from '../components/sections/Problem';
import { Process } from '../components/sections/Process';
import { Outcomes } from '../components/sections/Outcomes';
import { Capabilities } from '../components/sections/Capabilities';
import { Results } from '../components/sections/Results';
import { FAQ } from '../components/sections/FAQ';
import { FinalCTA } from '../components/sections/FinalCTA';

export function Home() {
  return (
    <div className="overflow-x-hidden w-full">
      <Hero />
      <TrustBar />
      <Problem />
      <Process />
      <Outcomes />
      <Capabilities />
      <Results />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
