import type { NodeProps, Node } from "@xyflow/react";

import { useState } from "react";

import { NodeToolbar, useReactFlow, Handle, Position } from "@xyflow/react";
import { Edit, Save } from "lucide-react";

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

  return (
    <div
      className={`
        rounded-sm border border-gray-900 bg-white p-1 px-3 py-2 shadow-gray-200
        hover:shadow
        dark:border-gray-700 dark:bg-gray-900
      `}
    >
      <div>

        <NodeToolbar isVisible={true}>
          {!editMode && (
            <button>
              <Edit onClick={() => setEditMode(true)} />
            </button>
          )}
          {editMode && (
            <button onClick={() => updateValue()}>
              <Save />
            </button>
          )}
        </NodeToolbar>
        <Handle
          type="target"
          position={Position.Left}
        />
        <Handle
          type="source"
          position={Position.Right}
        />
        <div className="flex items-center gap-4">
          { editMode && (
            <ComboboxFilms
              initialValue={valueData}
              setValueData={setValueData}
            />
          )}
          { !editMode && (
            <p className="px-6 py-1.5 text-sm">{valueData}</p>
          )}
        </div>

      </div>
    </div>
  );
}
