import type { Node, Edge, OnNodesChange, OnEdgesChange, OnConnect } from "@xyflow/react";

import { useCallback, useState } from "react";

import { createFileRoute } from "@tanstack/react-router";
import { addEdge, applyEdgeChanges, applyNodeChanges, Position, ReactFlow, MiniMap, Background, Controls, BackgroundVariant } from "@xyflow/react";

// @ts-expect-error It works, don't worry.
import "@xyflow/react/dist/style.css";

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
}];

export const Route = createFileRoute("/flow")({
  component: Flow,
});

function Flow() {
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

  return (
    <div
      style={{
        width: "100vw",
        height: "calc(100vh - 50px)",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background
          variant={BackgroundVariant.Cross}
          gap={50}
        />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
