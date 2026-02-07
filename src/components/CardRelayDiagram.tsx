interface CardRelayDiagramProps {
  variant: "relay" | "food" | "n2o";
  className?: string;
}

const TEAL = "hsl(177, 64%, 52%)";
const VIOLET = "hsl(258, 76%, 67%)";
const CORAL = "hsl(6, 100%, 68%)";
const GREEN = "#4ade80";
const DIMMED = "rgba(255,255,255,0.25)";

interface NodeConfig {
  x: number;
  label: string;
  sub: string;
  color: string;
}

const nodes: NodeConfig[] = [
  { x: 45, label: "NO", sub: "3", color: TEAL },
  { x: 125, label: "NO", sub: "2", color: VIOLET },
  { x: 205, label: "N", sub: "2", color: CORAL },
  { x: 275, label: "N", sub: "2", color: GREEN },
];

// Superscript minus for nitrate/nitrite
const MINUS = "\u207B";

export const CardRelayDiagram = ({ variant, className }: CardRelayDiagramProps) => {
  const viewBoxHeight = variant === "food" ? 120 : variant === "n2o" ? 105 : 90;

  // Determine node opacity per variant
  const getNodeOpacity = (index: number) => {
    if (variant === "food") {
      return index <= 1 ? 1 : 0.3;
    }
    return 1;
  };

  const getNodeColor = (index: number) => {
    if (variant === "food" && index > 1) return DIMMED;
    return nodes[index].color;
  };

  const getArrowOpacity = (index: number) => {
    if (variant === "food" && index > 0) return 0.25;
    return 0.9;
  };

  const getArrowDash = (index: number) => {
    if (variant === "food" && index > 0) return "4 3";
    return "none";
  };

  // Node Y center
  const cy = variant === "n2o" ? 45 : 35;
  const r = 18;

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 320 ${viewBoxHeight}`}
        className="w-full h-auto"
        role="img"
        aria-label="Denitrification pathway diagram"
      >
        {/* Arrowhead marker definitions */}
        <defs>
          <marker
            id={`arrow-${variant}`}
            viewBox="0 0 10 8"
            refX="9"
            refY="4"
            markerWidth="8"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 4 L 0 8 z" fill="rgba(255,255,255,0.6)" />
          </marker>
          <marker
            id={`arrow-dim-${variant}`}
            viewBox="0 0 10 8"
            refX="9"
            refY="4"
            markerWidth="8"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 4 L 0 8 z" fill="rgba(255,255,255,0.2)" />
          </marker>
          <marker
            id={`arrow-green-${variant}`}
            viewBox="0 0 10 8"
            refX="9"
            refY="4"
            markerWidth="8"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 4 L 0 8 z" fill={GREEN} />
          </marker>
          <marker
            id={`arrow-coral-${variant}`}
            viewBox="0 0 10 8"
            refX="9"
            refY="4"
            markerWidth="6"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 4 L 0 8 z" fill={CORAL} />
          </marker>
        </defs>

        {/* Connection arrows */}
        {[0, 1, 2].map((i) => {
          const x1 = nodes[i].x + r + 2;
          const x2 = nodes[i + 1].x - r - 2;

          // Special arrow styling for n2o variant: last arrow (N2O->N2) is green
          let markerEnd = `url(#arrow-${variant})`;
          let strokeColor = "rgba(255,255,255,0.5)";
          let strokeDash = getArrowDash(i);
          let opacity = getArrowOpacity(i);

          if (variant === "n2o" && i === 2) {
            markerEnd = `url(#arrow-green-${variant})`;
            strokeColor = GREEN;
            opacity = 0.8;
          }
          if (variant === "food" && i > 0) {
            markerEnd = `url(#arrow-dim-${variant})`;
          }

          return (
            <line
              key={`arrow-${i}`}
              x1={x1}
              y1={cy}
              x2={x2}
              y2={cy}
              stroke={strokeColor}
              strokeWidth={1.5}
              strokeDasharray={strokeDash}
              opacity={opacity}
              markerEnd={markerEnd}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const nodeColor = getNodeColor(i);
          const nodeOpacity = getNodeOpacity(i);

          // Special ring for N2O in n2o variant
          const isN2OHighlight = variant === "n2o" && i === 2;
          // Special ring for N2 in n2o variant
          const isN2Safe = variant === "n2o" && i === 3;

          return (
            <g key={`node-${i}`} opacity={nodeOpacity}>
              {/* Glow */}
              <circle
                cx={node.x}
                cy={cy}
                r={r + 4}
                fill="none"
                stroke={nodeColor}
                strokeWidth={1}
                opacity={0.2}
              />

              {/* Main circle */}
              <circle
                cx={node.x}
                cy={cy}
                r={r}
                fill="rgba(255,255,255,0.08)"
                stroke={nodeColor}
                strokeWidth={isN2OHighlight ? 2.5 : 1.8}
              />

              {/* Chemical label */}
              {i === 0 && (
                <text
                  x={node.x}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  NO₃{MINUS}
                </text>
              )}
              {i === 1 && (
                <text
                  x={node.x}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  NO₂{MINUS}
                </text>
              )}
              {i === 2 && (
                <text
                  x={node.x}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  N₂O
                </text>
              )}
              {i === 3 && (
                <text
                  x={node.x}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  N₂
                </text>
              )}

              {/* N2 safe checkmark for n2o variant */}
              {isN2Safe && (
                <g>
                  <circle cx={node.x + 14} cy={cy - 14} r={7} fill={GREEN} opacity={0.9} />
                  <text
                    x={node.x + 14}
                    y={cy - 13}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontSize="8"
                    fontWeight="700"
                  >
                    ✓
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Step labels for "relay" variant */}
        {variant === "relay" && (
          <>
            {[0, 1, 2].map((i) => {
              const midX = (nodes[i].x + nodes[i + 1].x) / 2;
              return (
                <text
                  key={`step-${i}`}
                  x={midX}
                  y={cy + r + 16}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.5)"
                  fontSize="9"
                  fontWeight="500"
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  Step {i + 1}
                </text>
              );
            })}
          </>
        )}

        {/* Food variant: bracket annotations */}
        {variant === "food" && (
          <>
            {/* "Low food" bracket under Step 1 only */}
            <line
              x1={nodes[0].x}
              y1={cy + r + 14}
              x2={nodes[1].x}
              y2={cy + r + 14}
              stroke={TEAL}
              strokeWidth={1.5}
              opacity={0.7}
            />
            {/* Left tick */}
            <line
              x1={nodes[0].x}
              y1={cy + r + 10}
              x2={nodes[0].x}
              y2={cy + r + 14}
              stroke={TEAL}
              strokeWidth={1.5}
              opacity={0.7}
            />
            {/* Right tick */}
            <line
              x1={nodes[1].x}
              y1={cy + r + 10}
              x2={nodes[1].x}
              y2={cy + r + 14}
              stroke={TEAL}
              strokeWidth={1.5}
              opacity={0.7}
            />
            <text
              x={(nodes[0].x + nodes[1].x) / 2}
              y={cy + r + 27}
              textAnchor="middle"
              fill={TEAL}
              fontSize="9"
              fontWeight="600"
              fontFamily="Inter, system-ui, sans-serif"
            >
              Low food
            </text>

            {/* "Abundant food" bracket spanning all */}
            <line
              x1={nodes[0].x}
              y1={cy + r + 38}
              x2={nodes[3].x}
              y2={cy + r + 38}
              stroke={GREEN}
              strokeWidth={1.5}
              opacity={0.6}
            />
            {/* Left tick */}
            <line
              x1={nodes[0].x}
              y1={cy + r + 34}
              x2={nodes[0].x}
              y2={cy + r + 38}
              stroke={GREEN}
              strokeWidth={1.5}
              opacity={0.6}
            />
            {/* Right tick */}
            <line
              x1={nodes[3].x}
              y1={cy + r + 34}
              x2={nodes[3].x}
              y2={cy + r + 38}
              stroke={GREEN}
              strokeWidth={1.5}
              opacity={0.6}
            />
            <text
              x={(nodes[0].x + nodes[3].x) / 2}
              y={cy + r + 51}
              textAnchor="middle"
              fill={GREEN}
              fontSize="9"
              fontWeight="600"
              fontFamily="Inter, system-ui, sans-serif"
            >
              Abundant food
            </text>
          </>
        )}

        {/* N2O variant: escape arrow above N2O node */}
        {variant === "n2o" && (
          <>
            {/* Escape arrow going up from N2O */}
            <line
              x1={nodes[2].x}
              y1={cy - r - 4}
              x2={nodes[2].x}
              y2={cy - r - 22}
              stroke={CORAL}
              strokeWidth={1.8}
              markerEnd={`url(#arrow-coral-${variant})`}
              opacity={0.85}
            />
            {/* "escapes!" label */}
            <text
              x={nodes[2].x}
              y={cy - r - 28}
              textAnchor="middle"
              fill={CORAL}
              fontSize="9"
              fontWeight="700"
              fontFamily="Inter, system-ui, sans-serif"
              letterSpacing="0.5"
            >
              escapes!
            </text>

            {/* "safe" label near N2 */}
            <text
              x={nodes[3].x}
              y={cy + r + 16}
              textAnchor="middle"
              fill={GREEN}
              fontSize="8"
              fontWeight="600"
              fontFamily="Inter, system-ui, sans-serif"
            >
              safe
            </text>

            {/* "greenhouse gas" label near N2O */}
            <text
              x={nodes[2].x}
              y={cy + r + 16}
              textAnchor="middle"
              fill={CORAL}
              fontSize="7"
              fontWeight="500"
              fontFamily="Inter, system-ui, sans-serif"
              opacity={0.7}
            >
              greenhouse gas
            </text>
          </>
        )}
      </svg>
    </div>
  );
};
