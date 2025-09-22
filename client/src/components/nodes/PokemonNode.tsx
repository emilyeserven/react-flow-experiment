import type { Node, NodeProps } from "@xyflow/react";

import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Handle, NodeToolbar, Position, useReactFlow } from "@xyflow/react";
import { Edit, Save } from "lucide-react";

import { ComboboxPokemon } from "@/components/ui/combobox/ComboboxPokemon.tsx";
import { fetchPokemon } from "@/utils/fetchFunctions.ts";

export type PokemonNodeProps = Node<
  {
    valueData?: string;
  },
  "pokemon"
>;

export function PokemonNode(props: NodeProps<PokemonNodeProps>) {
  const {
    setNodes,
  } = useReactFlow();
  const [valueData, setValueData] = useState<string>(props.data?.valueData ? props.data.valueData as string : "");
  const [editMode, setEditMode] = useState<boolean>(false);

  const {
    data, refetch,
  } = useQuery({
    queryKey: [`pokemon-${valueData}`],
    queryFn: () => fetchPokemon(valueData),
  });
  const [pokemonInfo, setPokemonInfo] = useState(data);

  const updateValue = async () => {
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
    await refetch();
  };

  useEffect(() => {
    setPokemonInfo(data);
  }, [data]);

  return (
    <div
      className={`
        rounded-sm border border-gray-900 bg-white p-1 px-3 py-2 shadow-gray-200
        hover:shadow
        dark:border-gray-700 dark:bg-gray-900
      `}
    >
      <div>

        <NodeToolbar
          isVisible={props.selected}
          position={Position.Right}
        >
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
        <div className="flex flex-col items-center gap-4">
          { editMode && (
            <ComboboxPokemon
              initialValue={valueData}
              setValueData={setValueData}
            />
          )}
          <div className="flex flex-col items-center gap-4">
            { !editMode && (
              <p className="px-6 py-1.5 text-sm">{valueData}</p>
            )}

            {pokemonInfo?.sprites?.front_default && (
              <p>
                <img
                  className={editMode ? "grayscale" : ""}
                  src={pokemonInfo?.sprites?.front_default}
                />
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
