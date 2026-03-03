interface LogoProps {
  className?: string;
  variant?: 'default' | 'light' | 'dark';
}

export function Logo({ className = '', variant = 'default' }: LogoProps) {
  const colors = {
    default: {
      primary: '#10b981',
      secondary: '#059669',
      text: '#f8fafc',
    },
    light: {
      primary: '#10b981',
      secondary: '#059669',
      text: '#0f172a',
    },
    dark: {
      primary: '#10b981',
      secondary: '#059669',
      text: '#f8fafc',
    },
  };

  const { primary, secondary, text } = colors[variant];

  return (
    <svg
      viewBox="0 0 200 60"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="30%" stopColor="#34d399" />
          <stop offset="60%" stopColor="#6ee7b7" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>

        <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>

      {/* Icon */}
      <g transform="translate(0, 10)">
        {/* Outer hexagon */}
        <path
          d="M 20 8 L 32 1 L 44 8 L 44 22 L 32 29 L 20 22 Z"
          fill="none"
          stroke="url(#icon-gradient)"
          strokeWidth="2"
        />

        {/* Inner arrow/chevron representing automation/forward movement */}
        <path
          d="M 26 12 L 32 15 L 38 12 M 26 18 L 32 21 L 38 18"
          stroke="url(#icon-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* Text: ETA */}
      <text
        x="55"
        y="35"
        fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
        fontSize="28"
        fontWeight="700"
        fill="url(#text-gradient)"
        letterSpacing="-0.02em"
      >
        ETA
      </text>

      {/* Text: DIGITAL */}
      <text
        x="110"
        y="35"
        fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
        fontSize="28"
        fontWeight="300"
        fill="url(#text-gradient)"
        letterSpacing="0.05em"
      >
        DIGITAL
      </text>
    </svg>
  );
}
