import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { ComboboxFilms } from "@/components/ui/combobox/ComboboxFilms.tsx";
import { fetchTest } from "@/utils/fetchFunctions.ts";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const {
    isPending, error, data,
  } = useQuery({
    queryKey: ["test"],
    queryFn: () => fetchTest(),
  });

  const [valueData, setValueData] = useState<string>("");

  return (
    <div className="p-2">
      <h2>Hello from About!</h2>
      <p>
        Test data is{" "}
        {isPending && "Pending"}
        {error && "Erroring"}
        {data && "loaded!"}
      </p>
      <ComboboxFilms setValueData={setValueData} />
      <p>
        Selected: {valueData}
      </p>
      <p>
        {data && data.item}
      </p>
    </div>
  );
}
