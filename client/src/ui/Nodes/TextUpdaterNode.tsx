import type { NodeProps } from "@xyflow/react";

import { useCallback } from "react";

import { Handle, Position } from "@xyflow/react";

export function TextUpdaterNode() {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

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
        <label
          htmlFor="text"
          className={`
            block text-sm text-gray-600
            dark:text-white
          `}
        >Text:
        </label>
        <input
          id="text"
          name="text"
          onChange={onChange}
          className="nodrag"
        />
      </div>
    </div>
  );
}
