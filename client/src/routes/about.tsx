import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { ComboboxDemo } from "@/components/ui/combobox.tsx";
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

  return (
    <div className="p-2">
      <h2>Hello from About!</h2>
      <p>
        Test data is{" "}
        {isPending && "Pending"}
        {error && "Erroring"}
        {data && "loaded!"}
      </p>
      <ComboboxDemo />
      {data && data.item}
    </div>
  );
}
