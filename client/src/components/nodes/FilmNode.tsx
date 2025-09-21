import type { NodeProps } from "@xyflow/react";

import { useState } from "react";

import { Handle, Position } from "@xyflow/react";

import { ComboboxFilms } from "@/components/ui/combobox/ComboboxFilms.tsx";

export function FilmNode({
  data,
}: Partial<NodeProps>) {
  const [valueData, setValueData] = useState<string>(data?.value ? data.value as string : "");

  return (
    <div
      className={`
        h-12.5 rounded-s-sm border-gray-100 bg-white p-1 shadow-gray-200
        hover:shadow
        dark:border-gray-500 dark:bg-gray-900
      `}
    >
      <div>

        <Handle
          type="target"
          position={Position.Left}
        />
        <Handle
          type="source"
          position={Position.Right}
        />
        <ComboboxFilms
          initialValue={valueData}
          setValueData={setValueData}
        />
      </div>
    </div>
  );
}
