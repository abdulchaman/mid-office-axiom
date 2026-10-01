import type { ComponentProps } from "react";

import HOCMOApplicationSummary from "./HOCMOApplicationSummary";

type CMOApplicationSummaryProps = Omit<
  ComponentProps<typeof HOCMOApplicationSummary>,
  | "showClaimAudit"
  | "showRiskAnalytics"
  | "medicalDecisionTitle"
  | "cmoDecisionFieldsRequired"
  | "showSpecialMedicalTest"
  | "reorderDecisionColumns"
>;

/**
 * CMO_TASK keeps the original CMO summary design: it has no Claim Audit table
 * and its decision section is labelled "CMO Medical Decision".
 */
const CMOApplicationSummary = (props: CMOApplicationSummaryProps) => (
  <HOCMOApplicationSummary
    {...props}
    showClaimAudit={false}
    showRiskAnalytics={false}
    medicalDecisionTitle="CMO Medical Decision"
    cmoDecisionFieldsRequired={false}
    showSpecialMedicalTest={false}
    reorderDecisionColumns={false}
  />
);

export default CMOApplicationSummary;
