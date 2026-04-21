import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "full" | "mark";
};

export function Logo({ className, size = "md", variant = "full" }: LogoProps) {
  const markSizes = {
    sm: "size-6",
    md: "size-8",
    lg: "size-10",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "relative shrink-0 rounded-lg bg-primary text-primary-foreground grid place-items-center shadow-sm",
          markSizes[size],
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-[60%]"
        >
          <path
            d="M2 15.5c1.8 0 1.8-2 3.6-2s1.8 2 3.6 2 1.8-2 3.6-2 1.8 2 3.6 2 1.8-2 3.6-2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 19.5c1.8 0 1.8-2 3.6-2s1.8 2 3.6 2 1.8-2 3.6-2 1.8 2 3.6 2 1.8-2 3.6-2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />
          <path
            d="M8 11V6.5L12 4l4 2.5V11"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {variant === "full" && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-[0.95rem] font-semibold tracking-tight">
            Almeida Mares
          </span>
          <span className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
            Gestão de imóveis
          </span>
        </div>
      )}
    </div>
  );
}
