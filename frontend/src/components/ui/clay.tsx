"use client";

import { forwardRef, type ReactNode, type HTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

/* ═══════════════════════════════════════════
   CLAY CARD
   ═══════════════════════════════════════════ */

export interface ClayCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "interactive" | "surface" | "compact";
  glow?: "periwinkle" | "safe" | "danger" | "none";
  padding?: "none" | "sm" | "md" | "lg";
  animated?: boolean;
  children: ReactNode;
}

export const ClayCard = forwardRef<HTMLDivElement, ClayCardProps>(
  ({ variant = "default", glow = "none", padding = "md", animated = false, className, children, ...props }, ref) => {
    const baseClasses: Record<string, string> = {
      default: "bg-white border border-[#E2E8F0] rounded-xl shadow-sm",
      interactive: "bg-white border border-[#E2E8F0] rounded-xl shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all cursor-pointer",
      surface: "bg-[#F8FAFB] border border-[#E2E8F0] rounded-lg",
      compact: "bg-white border border-[#E2E8F0] rounded-xl shadow-sm",
    };

    const paddingClasses: Record<string, string> = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    const combined = cn(
      baseClasses[variant],
      paddingClasses[padding],
      className
    );

    if (animated) {
      return (
        <motion.div
          ref={ref}
          className={combined}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          {...(props as HTMLMotionProps<"div">)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={combined} {...props}>
        {children}
      </div>
    );
  }
);
ClayCard.displayName = "ClayCard";

/* ═══════════════════════════════════════════
   CLAY BUTTON
   ═══════════════════════════════════════════ */

export interface ClayButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const ClayButton = forwardRef<HTMLButtonElement, ClayButtonProps>(
  ({ variant = "primary", size = "md", loading, icon, iconRight, disabled, className, children, ...props }, ref) => {
    const variantClasses: Record<string, string> = {
      primary: "bg-[#16A34A] border border-[#16A34A] text-white hover:bg-[#15803D] shadow-sm",
      secondary: "bg-white border border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFB] hover:border-[#CBD5E1] hover:text-[#1E293B]",
      danger: "bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] hover:bg-[#FEE2E2]",
      success: "bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] hover:bg-[#DCFCE7]",
      ghost: "bg-transparent border border-transparent text-[#475569] hover:text-[#1E293B] hover:bg-[#F1F5F9] transition-all",
    };

    const sizeClasses: Record<string, string> = {
      sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
      md: "px-4 py-2.5 text-sm rounded-lg gap-2",
      lg: "px-6 py-3 text-base rounded-lg gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150",
          variantClasses[variant],
          sizeClasses[size],
          (disabled || loading) && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-0.5 mr-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {!loading && icon}
        {children}
        {iconRight}
      </button>
    );
  }
);
ClayButton.displayName = "ClayButton";

/* ═══════════════════════════════════════════
   GLASS PANEL
   ═══════════════════════════════════════════ */

export interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  intensity?: "subtle" | "medium" | "strong";
  padding?: "none" | "sm" | "md" | "lg";
  children: ReactNode;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ intensity = "medium", padding = "md", className, children, ...props }, ref) => {
    const intensityClasses: Record<string, string> = {
      subtle: "bg-white/80 backdrop-blur-md border border-[#E2E8F0] rounded-xl",
      medium: "bg-white/85 backdrop-blur-lg border border-[#E2E8F0] rounded-xl shadow-sm",
      strong: "bg-white/92 backdrop-blur-xl border border-[#E2E8F0] rounded-xl shadow-sm",
    };

    const paddingClasses: Record<string, string> = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div ref={ref} className={cn(intensityClasses[intensity], paddingClasses[padding], className)} {...props}>
        {children}
      </div>
    );
  }
);
GlassPanel.displayName = "GlassPanel";

/* ═══════════════════════════════════════════
   STATUS BADGE
   ═══════════════════════════════════════════ */

export type BadgeVariant = "safe" | "danger" | "info" | "warning" | "neutral";

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
  pulseDot?: boolean;
  children: ReactNode;
}

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ variant = "info", dot = false, pulseDot = false, className, children, ...props }, ref) => {
    const badgeClasses: Record<string, string> = {
      safe: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-xs font-medium",
      danger: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] text-xs font-medium",
      info: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] text-xs font-medium",
      warning: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#D97706] text-xs font-medium",
      neutral: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[#64748B] text-xs font-medium",
    };

    const dotColors: Record<string, string> = {
      safe: "bg-[#16A34A]",
      danger: "bg-[#DC2626]",
      info: "bg-[#2563EB]",
      warning: "bg-[#D97706]",
      neutral: "bg-[#94A3B8]",
    };

    return (
      <span ref={ref} className={cn(badgeClasses[variant], className)} {...props}>
        {dot && (
          <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[variant], pulseDot && "animate-pulse")} />
        )}
        {children}
      </span>
    );
  }
);
StatusBadge.displayName = "StatusBadge";

/* ═══════════════════════════════════════════
   CLAY METRIC CARD
   ═══════════════════════════════════════════ */

export interface ClayMetricProps {
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  trendUp?: boolean;
  icon?: ReactNode;
  accentColor?: string;
  animated?: boolean;
}

export function ClayMetric({ label, value, subtitle, trend, trendUp, icon, accentColor = "#16A34A", animated = true }: ClayMetricProps) {
  const content = (
    <>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#94A3B8] uppercase tracking-wide">{label}</span>
        {icon && (
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: `${accentColor}12`,
              color: accentColor
            }}
          >
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2.5 mt-1">
        <span className="text-3xl font-bold text-[#1E293B] tabular-nums tracking-tight">{value}</span>
        {trend && (
          <span className={cn(
            "text-xs font-medium flex items-center gap-0.5",
            trendUp ? "text-[#16A34A]" : "text-[#DC2626]"
          )}>
            {trend}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-xs text-[#94A3B8] mt-1">{subtitle}</p>
      )}
    </>
  );

  if (animated) {
    return (
      <motion.div
        className="bg-white border border-[#E2E8F0] rounded-xl p-5 space-y-2 shadow-sm"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 space-y-2 shadow-sm">
      {content}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION HEADER
   ═══════════════════════════════════════════ */

export function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
  children
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={cn("space-y-2 max-w-3xl", centered && "mx-auto text-center")}>
      {eyebrow && (
        <span className="text-xs font-medium text-[#16A34A] uppercase tracking-wide">{eyebrow}</span>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-sm text-[#64748B] leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   CODE BLOCK (replaces terminal)
   ═══════════════════════════════════════════ */

export function ClayTerminal({
  prompt = "broker@airlock:~$",
  status = "Active",
  children
}: {
  prompt?: string;
  status?: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-[#1E293B] rounded-lg p-4 space-y-2 text-xs">
      <div className="text-[#94A3B8] flex items-center justify-between border-b border-[#334155] pb-2">
        <span className="font-mono text-[#CBD5E1]">{prompt}</span>
        <StatusBadge variant="safe" dot pulseDot>{status}</StatusBadge>
      </div>
      <div className="font-mono text-[#CBD5E1] space-y-1">
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   AMBIENT ORB (no-op in light theme)
   ═══════════════════════════════════════════ */

export function AmbientOrb(_props: {
  color?: string;
  size?: number;
  blur?: number;
  opacity?: number;
  position?: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  // Intentionally renders nothing in the light theme
  return null;
}
