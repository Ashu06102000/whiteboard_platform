type Props = {
  onClick: () => void;
  children: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
};

export default function IconButton({
  onClick,
  children,
  isActive,
  disabled,
}: Props) {
  return (
    <button
      className={`${"min-w-[28px] min-h-[28px] rounded-sm flex items-center justify-center text-foreground-200"} ${isActive ? "text-[#0044ff] bg-[#f3f3f3]" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
