import { useQuery } from "@tanstack/react-query";

import { Combobox } from "@/components/ui/combobox/Combobox.tsx";
import { fetchPokemonAll } from "@/utils/fetchFunctions.ts";

interface ComboboxFilmsProps {
  initialValue?: string;
  setValueData?: React.Dispatch<React.SetStateAction<string>>;
}

export function ComboboxPokemon({
  initialValue,
  setValueData,
}: ComboboxFilmsProps) {
  const {
    data, refetch,
  } = useQuery({
    queryKey: ["pokemon"],
    queryFn: () => fetchPokemonAll(),
    enabled: false,
  });

  return (

    <Combobox
      data={data?.selectData}
      refetch={refetch}
      initialValue={initialValue}
      setValueData={setValueData}
      selectString="Select a pokemon"
      searchString="Search for a pokemon"
      emptyString="No pokemon found."
    />
  );
}
