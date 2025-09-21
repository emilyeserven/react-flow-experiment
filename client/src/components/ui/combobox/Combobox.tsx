import * as React from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/shadui/Button.tsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadui/command.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadui/popover.tsx";
import { cn } from "@/lib/utils.ts";

export interface SelectOption {
  id: string | number;
  value: string;
  label: string;
}

interface ComboboxProps {
  initialValue?: string;
  data?: SelectOption[] | undefined;
  refetch?: () => void;
  setValueData?: React.Dispatch<React.SetStateAction<string>>;
  selectString?: string;
  searchString?: string;
  emptyString?: string;
}

export function Combobox({
  initialValue = "",
  data,
  refetch,
  setValueData,
  selectString = "Select...",
  searchString = "Search...",
  emptyString = "Nothing found",
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initialValue ?? "");

  const handleOpen = async () => {
    if (!open && refetch) {
      await refetch();
    }

    console.log("open", open);
    console.log("sVD", setValueData);
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
            ? data ? data?.find(item => item.value === value)?.label : initialValue
            : selectString}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] bg-white p-0">
        <Command>
          <CommandInput
            placeholder={searchString}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>{emptyString}</CommandEmpty>
            <CommandGroup>
              {data && data.map(item => (
                <CommandItem
                  key={item.id}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    if (setValueData) {
                      setValueData(currentValue === value ? "" : currentValue);
                    }
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
