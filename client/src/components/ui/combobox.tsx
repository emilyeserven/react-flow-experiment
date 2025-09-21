import * as React from "react";

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

export interface SelectOption {
  id: string | number;
  value: string;
  label: string;
}

interface ComboboxProps {
  data: SelectOption[] | undefined;
  refetch: () => void;
  selectString?: string;
  searchString?: string;
}

export function ComboboxDemo({
  data,
  refetch,
  selectString = "Select...",
  searchString = "Search...",
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleOpen = async () => {
    if (!open) {
      await refetch();
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
            ? data?.find(item => item.value === value)?.label
            : selectString}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={searchString}
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
