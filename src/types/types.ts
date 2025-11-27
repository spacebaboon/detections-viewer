export interface Alert {
  id: string;
  eyed: string;
  pagerdutyIncidentId: string;
  status: string;
  resolutionStatus: string | null;
  service: string;
  title: string;
  severity: string;
  createdAt: string;
  updatedAt: string;
  triggeredAt: string;
  acknowledgedAt: string | null;
  acknowledgedBy: string | null;
  resolvedAt: string | null;
  resolvedBy: string | null;
  categoryRef: string;
}
