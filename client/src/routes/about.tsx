import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Combobox } from "@/components/ui/combobox.tsx";
import { fetchFilms, fetchTest } from "@/utils/fetchFunctions.ts";

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

  const {
    data: filmData, refetch,
  } = useQuery({
    queryKey: ["films"],
    queryFn: () => fetchFilms(),
    enabled: false,
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
      <Combobox
        data={filmData}
        refetch={refetch}
        selectString="Select a film"
        searchString="Search for a film"
        emptyString="No movies found."
      />
      {data && data.item}
    </div>
  );
}
