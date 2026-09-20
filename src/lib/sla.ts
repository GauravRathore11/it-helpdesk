import type { Priority } from "@/types/dashboard";

// SLA response times in hours (kept local so this module is self-contained).

// Use explicit lowercase keys (these match the Prisma values). We normalize
// incoming `Priority` values (which may be uppercase in some UI code) to
// lowercase before lookup.
const SLA_HOURS: Record<"critical" | "high" | "medium" | "low", number> = {
    critical: 4,
    high: 8,
    medium: 24,
    low: 72,
};
export type SLAStatus = "on_track" | "at_risk" | "breached" | "resolved";
export function calculateSLADeadline(priority: Priority): Date {

    const key = String(priority).toLowerCase() as keyof typeof SLA_HOURS;
    const hours = SLA_HOURS[key] ?? 24;

    const deadline = new Date();
    deadline.setHours(deadline.getHours() + hours);
    return deadline;
}
export function getSLAStatus(
    deadline: Date | string | null | undefined,
    resolvedAt: Date | string | null | undefined
): SLAStatus {
    if (resolvedAt) return "resolved";
    if (!deadline) return "on_track";

    const now = new Date();
    const deadlineDate = new Date(deadline);
    const msLeft = deadlineDate.getTime() - now.getTime();
    const hoursLeft = msLeft / (1000 * 60 * 60);

    if (hoursLeft < 0) return "breached";
    if (hoursLeft < 2) return "at_risk";
    return "on_track";
}
export function formatSLATimeLeft(
    deadline: Date | string | null | undefined,
    resolvedAt: Date | string | null | undefined
): string {
    if (resolvedAt) return "Resolved";
    if (!deadline) return "N/A";

    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffMs = deadlineDate.getTime() - now.getTime();
    const absDiff = Math.abs(diffMs);
    const hours = Math.floor(absDiff / (1000 * 60 * 60));
    const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));

    const timeStr = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    return diffMs < 0 ? `${timeStr} overdue` : `${timeStr} left`;
}
