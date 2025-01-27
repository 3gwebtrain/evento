"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm(): JSX.Element {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!searchText) return;
    router.push(`/events/${searchText}`);
  }
  return (
    <form
      className="w-full sm:w-[580px]"
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Search events in any city... "
        spellCheck={false}
        type="text"
        name=""
        id=""
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full h-16 rounded-lg bg-white/[7%] px-6 outline-none ring-accent/50 transition focus:ring-2 focus:bg-white/10"
      />
    </form>
  );
}
