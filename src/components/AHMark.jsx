export function AHMark({ className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 52 32"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M0 32 L12 0 H20 L32 32 H24.2 L21.6 24.6 H10.4 L7.8 32 H0z M12.8 18.6 H19.2 L16 9.4z"
      />
      <rect x="36" y="0" width="6.5" height="32" />
      <rect x="45.5" y="0" width="6.5" height="32" />
      <rect x="36" y="13" width="16" height="6.5" />
    </svg>
  );
}

export function AHNavMark({ className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 22 16"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <rect x="1" y="1" width="2.2" height="14" />
      <rect x="7.6" y="1" width="2.2" height="14" />
      <rect x="3.2" y="1" width="4.4" height="2.2" />
      <rect x="3.2" y="7" width="4.4" height="2.2" />
      <rect x="12.2" y="1" width="2.2" height="14" />
      <rect x="18.6" y="1" width="2.2" height="14" />
      <rect x="14.4" y="7" width="4.2" height="2.2" />
    </svg>
  );
}
