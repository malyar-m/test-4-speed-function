import ClientOnly from "./components/ClientOnly";
import Earthquake from "./components/Earchquakes";

export default function Home() {
  return (
    <ClientOnly>
      <Earthquake />
    </ClientOnly>
  );
}
