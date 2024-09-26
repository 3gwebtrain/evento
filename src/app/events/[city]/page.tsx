import { EventsList } from "@/components/events-list";
import H1 from "@/components/h1";
import { Suspense } from "react";
import z from "zod";
import Loading from "../loading";

type Props = {
  params: {
    city: string;
  };
};

type EventsPageProps = Props & {
  searchParams: {
    page: { [key: string]: string | string[] | undefined };
  };
};

export function generateMetadata({ params }: Props) {
  const city = params.city;
  return {
    title: city === "all" ? "All Events" : `Events in ${city}`,
  };
}

export async function generateStaticParams() {
  return [{ city: "austin" }];
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function EventsPage({ params, searchParams }: EventsPageProps): Promise<JSX.Element> {
  const city = params.city;
  const parsedPage = pageNumberSchema.safeParse(searchParams.page);
  if (!parsedPage.success) {
    throw new Error("Invalid page Number");
  }
  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1 className="mb-28">
        {city === "All" && "All Events"} {city !== "All" && `Events in ${city.replace(/^[a-z]/, (v) => v.toUpperCase())}`}
      </H1>
      <Suspense
        key={city + parsedPage.data}
        fallback={<Loading />}
      >
        <EventsList
          city={city}
          page={parsedPage.data}
        />
      </Suspense>
    </main>
  );
}
