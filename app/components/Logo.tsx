// Stadia brand mark — forward double-chevron. Inherits color via currentColor.

export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform="translate(50,50) scale(1.1781) translate(-45,-50)">
        <path
          d="M16,24 L46,50 L16,76"
          fill="none"
          stroke="currentColor"
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.32"
        />
        <path
          d="M44,24 L74,50 L44,76"
          fill="none"
          stroke="currentColor"
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
