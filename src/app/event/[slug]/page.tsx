import { getEvent } from "@/lib/server-utilis";
import { EventoEvent } from "@/lib/types";
import { Metadata } from "next";
import Image from "next/image";

type EventPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const slug: string = params.slug;
  const event: EventoEvent = await getEvent(slug);
  return {
    title: event.name,
  };
}

export async function generateStaticParams() {
  return [{ slug: "comedy-extravaganza" }, { slug: "dj-practice-session" }];
}

export default async function EventPage({ params }: EventPageProps): Promise<JSX.Element> {
  const slug: string = params.slug;
  const event: EventoEvent = await getEvent(slug);
  return (
    <main>
      <section className="relative  overflow-hidden flex justify-center items-center">
        <Image
          src={event.imageUrl}
          className="object-cover z-0 blur-3xl"
          alt="Event background image"
          fill
          quality={50}
          sizes="(max-width:1280px) 100vw, 1280px"
          priority
        />
        <div className="z-1 relative flex-col lg:flex-row flex gap-x-6 lg:gap-x-16">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
            className="rounded-xl border-2 border-white/50 object-cover"
          />

          <div>
            {new Date(event.date).toLocaleDateString("en-us", { weekday: "long", month: "long", day: "numeric" })}
            <h1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">{event.name}</h1>
            <p className="whitespace-nowrap text-xl text-white/75">
              Organized by <span className="italic">{event.organizerName}</span>
            </p>
            <button className="bg-white/20 text-lg capitalize bg-blur mt-5 lg:mt-auto w-[95vw] rounded-md border-white/10 border-2 sm:w-full py-2 state-effects">Get tickets</button>
          </div>
        </div>
      </section>
      <div className="min-h-[75vh] text-center px-5 py-16">
        <Section>
          <SectionHeading>About this Event</SectionHeading>
          <SectionContent>{event.description}</SectionContent>
        </Section>
        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionContent>{event.location}</SectionContent>
        </Section>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }): JSX.Element {
  return <section className="mb-12">{children}</section>;
}

function SectionHeading({ children }: { children: React.ReactNode }): JSX.Element {
  return <h2 className="text-2xl">{children}</h2>;
}

function SectionContent({ children }: { children: React.ReactNode }): JSX.Element {
  return <p className="max-w-4xl mx-auto text-lg leading-8 text-white/75">{children}</p>;
}
