type IconName =
  | "arrow-right"
  | "bell"
  | "building"
  | "calendar"
  | "chevron"
  | "dashboard"
  | "mail"
  | "lock"
  | "logout"
  | "memo"
  | "more"
  | "people"
  | "phone"
  | "search"
  | "settings"
  | "sparkle";

type IconProps = {
  name: IconName;
  size?: number;
};

const paths: Record<IconName, React.ReactNode> = {
  "arrow-right": <path d="M5 12h14m-6-6 6 6-6 6" />,
  bell: <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />,
  building: <path d="M4 21V4h11v17M15 9h5v12M8 8h3m-3 4h3m-3 4h3M2 21h20" />,
  calendar: (
    <path d="M6 2v4m12-4v4M3 9h18M5 4h14a2 2 0 0 1 2 2v15H3V6a2 2 0 0 1 2-2Z" />
  ),
  chevron: <path d="m9 18 6-6-6-6" />,
  dashboard: (
    <path d="M4 13h6V4H4v9Zm0 7h6v-4H4v4Zm10 0h6v-9h-6v9Zm0-12h6V4h-6v4Z" />
  ),
  mail: <path d="M3 5h18v14H3V5Zm0 1 9 7 9-7" />,
  lock: <path d="M5 10h14v11H5V10Zm3 0V7a4 4 0 0 1 8 0v3m-4 4v3" />,
  logout: (
    <path d="M10 17l5-5-5-5m5 5H3m12-9h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-5" />
  ),
  memo: (
    <path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm3 5h6m-6 4h6m-6 4h4" />
  ),
  more: <path d="M5 12h.01M12 12h.01M19 12h.01" />,
  people: (
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.3 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
  ),
  search: <path d="m21 21-4.35-4.35M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />,
  settings: (
    <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7.4-3.5a7.6 7.6 0 0 0-.1-1l2-1.6-2-3.4-2.5 1a8 8 0 0 0-1.7-1l-.4-2.7h-4L10.3 6a8 8 0 0 0-1.7 1L6.1 6 4.1 9.4l2 1.6a7.6 7.6 0 0 0 0 2l-2 1.6 2 3.4 2.5-1a8 8 0 0 0 1.7 1l.4 2.7h4l.4-2.7a8 8 0 0 0 1.7-1l2.5 1 2-3.4-2-1.6a7.6 7.6 0 0 0 .1-1Z" />
  ),
  sparkle: (
    <path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Zm6 10 .8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8L18 13ZM5 13l.9 2.6L8.5 17l-2.6.9L5 20.5l-.9-2.6L1.5 17l2.6-1.4L5 13Z" />
  ),
};

export function Icon({ name, size = 20 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name]}
    </svg>
  );
}
