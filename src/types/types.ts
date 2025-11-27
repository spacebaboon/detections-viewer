export type Severity = 'low' | 'high';
export type Status = 'triggered' | 'acknowledged' | 'resolved';
export type Category =
  | 'execution_with_malicious_intent'
  | 'malicious_behavior_on_a_system'
  | 'unauthorized_data_access'
  | 'unusual_login_or_user_activity'
  | 'unusual_software_activity'
  | 'uncategorized';

export interface Alert {
  id: string;
  eyed: string;
  pagerdutyIncidentId: string;
  status: Status;
  resolutionStatus: string | null;
  service: string;
  title: string;
  severity: Severity;
  createdAt: string;
  updatedAt: string;
  triggeredAt: string;
  acknowledgedAt: string | null;
  acknowledgedBy: string | null;
  resolvedAt: string | null;
  resolvedBy: string | null;
  categoryRef: Category;
}
