import { useQuery } from "@tanstack/react-query";

import { Combobox } from "@/components/ui/combobox/Combobox.tsx";
import { fetchPokemon } from "@/utils/fetchFunctions.ts";

interface ComboboxFilmsProps {
  initialValue?: string;
  setValueData?: React.Dispatch<React.SetStateAction<string>>;
}

export function ComboboxPokemon({
  initialValue,
  setValueData,
}: ComboboxFilmsProps) {
  const {
    data: filmData, refetch,
  } = useQuery({
    queryKey: ["pokemon"],
    queryFn: () => fetchPokemon(),
    enabled: false,
  });

  return (

    <Combobox
      data={filmData}
      refetch={refetch}
      initialValue={initialValue}
      setValueData={setValueData}
      selectString="Select a film"
      searchString="Search for a film"
      emptyString="No movies found."
    />
  );
}
