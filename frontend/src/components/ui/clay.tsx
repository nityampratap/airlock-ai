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
      default: "clay-card",
      interactive: "clay-card-interactive",
      surface: "clay-surface",
      compact: "clay-card",
    };

    const paddingClasses: Record<string, string> = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    const glowClasses: Record<string, string> = {
      none: "",
      periwinkle: "glow-periwinkle",
      safe: "glow-safe",
      danger: "glow-danger",
    };

    const combined = cn(
      baseClasses[variant],
      paddingClasses[padding],
      glowClasses[glow],
      className
    );

    if (animated) {
      return (
        <motion.div
          ref={ref}
          className={combined}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
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
      primary: "clay-btn-primary",
      secondary: "clay-btn-secondary",
      danger: "clay-btn-danger",
      success: "clay-btn-success",
      ghost: "bg-transparent border border-white/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.04] hover:border-white/20 transition-all",
    };

    const sizeClasses: Record<string, string> = {
      sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
      md: "px-4 py-2.5 text-sm rounded-xl gap-2",
      lg: "px-6 py-3.5 text-base rounded-xl gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all",
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
      subtle: "glass-panel border-white/[0.06]",
      medium: "glass-panel",
      strong: "glass-panel-strong",
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
      safe: "badge-safe",
      danger: "badge-danger",
      info: "badge-info",
      warning: "badge-warning",
      neutral: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-[var(--text-secondary)] text-[0.6875rem] font-mono font-medium",
    };

    const dotColors: Record<string, string> = {
      safe: "bg-[#75D6B1]",
      danger: "bg-[#EC8995]",
      info: "bg-[#8CA9FF]",
      warning: "bg-[#E9BD7B]",
      neutral: "bg-[var(--text-muted)]",
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

export function ClayMetric({ label, value, subtitle, trend, trendUp, icon, accentColor = "#8CA9FF", animated = true }: ClayMetricProps) {
  const content = (
    <>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">{label}</span>
        {icon && (
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ 
              backgroundColor: `${accentColor}15`,
              color: accentColor
            }}
          >
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2.5">
        <span className="text-3xl font-extrabold text-[var(--text-primary)] tabular-nums tracking-tight">{value}</span>
        {trend && (
          <span className={cn(
            "text-[11px] font-mono flex items-center gap-0.5",
            trendUp ? "text-[#75D6B1]" : "text-[#EC8995]"
          )}>
            {trend}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-[11px] text-[var(--text-muted)] font-mono">{subtitle}</p>
      )}
    </>
  );

  if (animated) {
    return (
      <motion.div
        className="clay-card p-5 space-y-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className="clay-card p-5 space-y-3">
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
    <div className={cn("space-y-3 max-w-3xl", centered && "mx-auto text-center")}>
      {eyebrow && (
        <span className="text-xs font-mono text-[#8CA9FF] uppercase tracking-wider">{eyebrow}</span>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   CLAY TERMINAL
   ═══════════════════════════════════════════ */

export function ClayTerminal({ 
  prompt = "broker@airlock:~$",
  status = "ACTIVE",
  children 
}: { 
  prompt?: string;
  status?: string;
  children: ReactNode; 
}) {
  return (
    <div className="terminal-block p-4 space-y-2 text-xs">
      <div className="text-[var(--text-muted)] flex items-center justify-between border-b border-white/[0.06] pb-2">
        <span className="font-mono">{prompt}</span>
        <StatusBadge variant="safe" dot pulseDot>{status}</StatusBadge>
      </div>
      <div className="font-mono text-[var(--text-secondary)] space-y-1">
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   AMBIENT ORB
   ═══════════════════════════════════════════ */

export function AmbientOrb({ 
  color = "#8CA9FF", 
  size = 400, 
  blur = 120,
  opacity = 0.08,
  position = "center"
}: { 
  color?: string; 
  size?: number;
  blur?: number;
  opacity?: number;
  position?: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const positionClasses: Record<string, string> = {
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "top-left": "top-0 left-0 -translate-x-1/4 -translate-y-1/4",
    "top-right": "top-0 right-0 translate-x-1/4 -translate-y-1/4",
    "bottom-left": "bottom-0 left-0 -translate-x-1/4 translate-y-1/4",
    "bottom-right": "bottom-0 right-0 translate-x-1/4 translate-y-1/4",
  };

  return (
    <div 
      className={cn("absolute rounded-full pointer-events-none", positionClasses[position])}
      style={{
        width: size,
        height: size * 0.6,
        background: `radial-gradient(ellipse, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        opacity,
      }}
    />
  );
}
