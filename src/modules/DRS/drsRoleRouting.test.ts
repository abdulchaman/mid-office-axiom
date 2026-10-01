import {
  getRetailCMOSummaryScreen,
  isRetailCMORole,
} from "./drsRoleRouting";

describe("DRS role routing", () => {
  it("routes the two CMO roles to different summary screens", () => {
    expect(getRetailCMOSummaryScreen("HO_CMO_TASK")).toBe("ho-cmo");
    expect(getRetailCMOSummaryScreen("CMO_TASK")).toBe("cmo");
  });

  it.each(["CMO_TASK", "HO_CMO_TASK", " ho_cmo_task "])(
    "recognizes %s as a retail CMO-family role",
    (roleType) => {
      expect(isRetailCMORole(roleType)).toBe(true);
    },
  );

  it.each(["CVT_TASK", "DVT_TASK", "MAS_TASK", "CUW_TASK", undefined])(
    "does not classify %s as a retail CMO-family role",
    (roleType) => {
      expect(isRetailCMORole(roleType)).toBe(false);
      expect(getRetailCMOSummaryScreen(roleType)).toBeNull();
    },
  );
});
