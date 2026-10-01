export type RetailCMOSummaryScreen = "cmo" | "ho-cmo" | null;

// CMO_TASK and HO_CMO_TASK share supporting UI rules but use separate screens.
export const getRetailCMOSummaryScreen = (
  roleType: unknown,
): RetailCMOSummaryScreen => {
  const normalizedRole = String(roleType ?? "").trim().toUpperCase();

  if (normalizedRole === "HO_CMO_TASK") return "ho-cmo";
  if (normalizedRole === "CMO_TASK") return "cmo";

  return null;
};

export const isRetailCMORole = (roleType: unknown): boolean =>
  getRetailCMOSummaryScreen(roleType) !== null;
