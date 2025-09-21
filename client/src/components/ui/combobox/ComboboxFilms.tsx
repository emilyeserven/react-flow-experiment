import { useQuery } from "@tanstack/react-query";

import { Combobox } from "@/components/ui/combobox/Combobox.tsx";
import { fetchFilms } from "@/utils/fetchFunctions.ts";

export function ComboboxFilms() {
  const {
    data: filmData, refetch,
  } = useQuery({
    queryKey: ["films"],
    queryFn: () => fetchFilms(),
    enabled: false,
  });

  return (

    <Combobox
      data={filmData}
      refetch={refetch}
      selectString="Select a film"
      searchString="Search for a film"
      emptyString="No movies found."
    />
  );
}
