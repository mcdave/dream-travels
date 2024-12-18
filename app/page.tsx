import Hero from "@/components/Hero";
import TripList from "@/components/TripList";
import { StateProvider } from "@/lib/provider";
import { Trip } from "@/lib/types";
import { filterTrips } from "@/lib/utils";
import { Params } from "next/dist/server/request/params";
import { SearchParams } from "next/dist/server/request/search-params";
import Navbar from "@/components/Navbar";
import CountdownWrapper from "@/components/CountdownWrapper";

export default async function Home(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.query as string | undefined;

  const data = await fetch(
    "https://my-json-server.typicode.com/mariosanz92/dream-travels-data/travels"
  );
  const travels: Trip[] = await data.json();

  const filteredTravels = query ? filterTrips(travels, query) : travels;

  return (
    <StateProvider initialData={{ travels: filteredTravels }}>
      <Navbar />

      <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center max-w-screen-lg w-full">
          <Hero query={query} />

          <CountdownWrapper travels={filteredTravels} />

          <TripList />
        </main>
      </div>
    </StateProvider>
  );
}
