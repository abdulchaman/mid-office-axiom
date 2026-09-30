import { isRetailHOCMOTask } from "./drsRoleRouting";

describe("DRS role routing", () => {
  it.each(["CMO_TASK", "HO_CMO_TASK", " ho_cmo_task "])(
    "routes %s to the retail HO CMO screen",
    (roleType) => {
      expect(isRetailHOCMOTask(roleType)).toBe(true);
    },
  );

  it.each(["CVT_TASK", "DVT_TASK", "MAS_TASK", "CUW_TASK", undefined])(
    "does not route %s to the HO CMO screen",
    (roleType) => {
      expect(isRetailHOCMOTask(roleType)).toBe(false);
    },
  );
});
