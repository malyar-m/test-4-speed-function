import ClientOnly from "./components/ClientOnly";
import EarthquakeList from "./components/EarthquakesList";

export default function Home() {
  return (
    <ClientOnly>
      <EarthquakeList />
    </ClientOnly>
  );
}
