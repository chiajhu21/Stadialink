import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Work from "./components/Work";
import Capabilities from "./components/Capabilities";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Work />
      <Capabilities />
      <Contact />
    </main>
  );
}
