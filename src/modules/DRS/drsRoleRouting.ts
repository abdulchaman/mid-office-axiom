// The inbox uses HO_CMO_TASK while older DRS flows use CMO_TASK; both identify
// the same retail HO CMO screen and must remain routing aliases.
export const isRetailHOCMOTask = (roleType: unknown): boolean =>
  ["CMO_TASK", "HO_CMO_TASK"].includes(
    String(roleType ?? "").trim().toUpperCase(),
  );
