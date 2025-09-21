import * as React from "react";

import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/shadui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadui/popover";
import { cn } from "@/lib/utils";
import { fetchFilms } from "@/utils/fetchFunctions.ts";

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const {
    data, refetch,
  } = useQuery({
    queryKey: ["films"],
    queryFn: () => fetchFilms(),
    enabled: false,
  });

  const handleOpen = async () => {
    console.log(open);
    if (!open) {
      await refetch();
      console.log(data);
      console.log("value", value);
      console.log("data", data.find(item => item.label === value));
    }
    setOpen(!open);
  };

  return (
    <Popover
      open={open}
      onOpenChange={handleOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? data.find(item => item.label === value)?.label
            : "Select..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No movies found.</CommandEmpty>
            <CommandGroup>
              {data && data.map(item => (
                <CommandItem
                  key={item.id}
                  value={item.value}
                  onSelect={(currentValue) => {
                    console.log("value", currentValue, value);
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
