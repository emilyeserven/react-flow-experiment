import type { NodeProps, Node } from "@xyflow/react";

import { useState } from "react";

import { useReactFlow, Handle, Position } from "@xyflow/react";

import { Button } from "@/components/ui/Button.tsx";
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
  const [editMode, setEditMode] = useState<boolean>(false);

  const updateValue = () => {
    setNodes(nodes =>
      nodes.map((node) => {
        if (node.id === props.id) {
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
    setEditMode(false);
  };

  console.log("props", props);
  return (
    <div
      className={`
        h-12.5 rounded-sm border border-gray-900 bg-white p-1 shadow-gray-200
        hover:shadow
        dark:border-gray-700 dark:bg-gray-900
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
        { editMode && (
          <div>
            <ComboboxFilms
              initialValue={valueData}
              setValueData={setValueData}
            />
            {" "}
            <Button onClick={() => { updateValue(); }}>Save</Button>

          </div>
        )}
        { !editMode && (
          <div>
            {valueData}
            <Button onClick={() => { setEditMode(true); }}>Edit</Button>
          </div>
        )}

      </div>
    </div>
  );
}
