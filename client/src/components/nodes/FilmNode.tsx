import type { NodeProps, Node } from "@xyflow/react";

import { useEffect, useState } from "react";

import { useReactFlow, Handle, Position } from "@xyflow/react";

import { ComboboxFilms } from "@/components/ui/combobox/ComboboxFilms.tsx";

export type FilmNodeProps = Node<
  {
    valueData?: string;
  },
  "film"
>;

export function FilmNode(props: NodeProps<FilmNodeProps>) {
  const {
    setNodes,
  } = useReactFlow();
  const [valueData, setValueData] = useState<string>(props.data?.valueData ? props.data.valueData as string : "");

  useEffect(() => {
    setNodes(nodes =>
      nodes.map((node) => {
        if (node.id === props.id) {
          console.log("node", node);
          return {
            ...node,
            data: {
              ...node.data,
              valueData,
            },
          };
        }

        return node;
      }));
  }, [valueData]);

  console.log("props", props);
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
