import { getEvents } from "@/lib/server-utilis";
import { EventoEvent } from "@prisma/client";
import EventCard from "./event-card";
import PaginationControls from "./pagination-controls";

type EventListProps = {
  city: string;
  page?: number;
};

export async function EventsList({ city, page = 1 }: EventListProps): Promise<JSX.Element> {
  const { events, totalCount } = await getEvents(city, page);
  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : "";
  const nextPath = totalCount > 6 * page ? `/events/${city}?page=${page + 1}` : "";
  return (
    <section className=" max-w-[1100px] flex flex-wrap gap-10 justify-center">
      {events.map(
        (event: EventoEvent): JSX.Element => (
          <EventCard
            key={event.id}
            event={event}
          />
        )
      )}
      {nextPath && (
        <PaginationControls
          previousPath={previousPath}
          nextPath={nextPath}
        />
      )}
    </section>
  );
}
