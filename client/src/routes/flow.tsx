import type { Node, Edge, OnNodesChange, OnEdgesChange, OnConnect, ColorMode } from "@xyflow/react";
import type { ChangeEventHandler } from "react";

import { useCallback, useState } from "react";

import { createFileRoute } from "@tanstack/react-router";
import { addEdge, Panel, applyEdgeChanges, applyNodeChanges, Position, ReactFlow, MiniMap, Background, Controls, BackgroundVariant } from "@xyflow/react";

// @ts-expect-error It works, don't worry.
import "@xyflow/react/dist/style.css";
import { FilmNode } from "@/components/nodes/FilmNode.tsx";
import { PokemonNode } from "@/components/nodes/PokemonNode.tsx";
import { TextUpdaterNode } from "@/components/nodes/TextUpdaterNode.tsx";

const initialNodes: Node[] = [
  {
    id: "n1",
    position: {
      x: 0,
      y: 0,
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: {
      label: "Node 1",
    },
  },
  {
    id: "n2",
    position: {
      x: 250,
      y: 0,
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: {
      label: "Node 2",
    },
  },
  {
    id: "n3a",
    position: {
      x: 500,
      y: -50,
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: {
      label: "Node 3 A",
    },
  },
  {
    id: "n3b",
    type: "textUpdater",
    position: {
      x: 500,
      y: 50,
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: {
      label: "Node 3 B",
    },
  },
  {
    id: "n3c",
    type: "film",
    position: {
      x: 500,
      y: 150,
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: {
      valueData: "The Empire Strikes Back",
    },
  },
  {
    id: "n4",
    type: "pokemon",
    position: {
      x: 700,
      y: 0,
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: {
      valueData: "bulbasaur",
    },
  },
];
const initialEdges: Edge[] = [{
  id: "n1-n2",
  source: "n1",
  target: "n2",
}, {
  id: "n2-n3a",
  source: "n2",
  target: "n3a",
}, {
  id: "n2-n3b",
  source: "n2",
  target: "n3b",
}, {
  id: "n2-n3c",
  source: "n2",
  target: "n3c",
}, {
  id: "n3c-n4",
  source: "n3c",
  target: "n4",
}];

const nodeTypes = {
  textUpdater: TextUpdaterNode,
  film: FilmNode,
  pokemon: PokemonNode,
};

export const Route = createFileRoute("/flow")({
  component: Flow,
});

function Flow() {
  const [colorMode, setColorMode] = useState<ColorMode>("light");
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    changes => setNodes(nodesSnapshot => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    changes => setEdges(edgesSnapshot => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect: OnConnect = useCallback(
    params => setEdges(edgesSnapshot => addEdge(params, edgesSnapshot)),
    [],
  );

  const onChange: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    setColorMode(evt.target.value as ColorMode);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "calc(100vh - 50px)",
      }}
    >
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode={colorMode}
        fitView
      >
        <Background
          variant={BackgroundVariant.Cross}
          gap={50}
        />
        <Controls />
        <MiniMap />

        <Panel position="top-left">
          <select
            className={`
              bg-black text-white
              dark:bg-white dark:text-black
            `}
            onChange={onChange}
            data-testid="colormode-select"
          >
            <option value="dark">dark</option>
            <option value="light">light</option>
            <option value="system">system</option>
          </select>
        </Panel>
      </ReactFlow>
    </div>
  );
}
