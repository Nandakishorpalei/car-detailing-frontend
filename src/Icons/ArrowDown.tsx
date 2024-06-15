export function ArrowDown({
  color = "#808099",
  strokeWidth = "2",
  height = "20",
  width = "20",
}: {
  color?: string;
  strokeWidth?: string;
  height?: string;
  width?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m5 7.5 5 5 5-5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
