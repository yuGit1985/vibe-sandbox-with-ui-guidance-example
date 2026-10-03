type AvatarProps = {
  color: string;
  name: string;
  size?: "small" | "medium" | "large";
};

export function Avatar({ color, name, size = "medium" }: AvatarProps) {
  const initials = name.replaceAll(" ", "").slice(0, 2);
  return (
    <span
      aria-hidden="true"
      className={`avatar avatar--${size}`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </span>
  );
}
