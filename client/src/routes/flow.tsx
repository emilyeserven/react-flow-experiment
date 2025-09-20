import { useCallback, useState } from "react";

import { createFileRoute } from "@tanstack/react-router";
import { addEdge, applyEdgeChanges, applyNodeChanges, ReactFlow } from "@xyflow/react";

// @ts-expect-error It works, don't worry.
import "@xyflow/react/dist/style.css";

const initialNodes = [
  {
    id: "n1",
    position: {
      x: 0,
      y: 0,
    },
    data: {
      label: "Node 1",
    },
  },
  {
    id: "n2",
    position: {
      x: 0,
      y: 100,
    },
    data: {
      label: "Node 2",
    },
  },
];
const initialEdges = [{
  id: "n1-n2",
  source: "n1",
  target: "n2",
}];

export const Route = createFileRoute("/flow")({
  component: Flow,
});

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    changes => setNodes(nodesSnapshot => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    changes => setEdges(edgesSnapshot => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    params => setEdges(edgesSnapshot => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}
