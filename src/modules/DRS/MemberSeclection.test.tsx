import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSelector } from "react-redux";

import MemberSelection from "./MemberSeclection";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

const mockUseSelector = useSelector as unknown as jest.Mock;

describe("MemberSelection", () => {
  beforeEach(() => {
    mockUseSelector.mockImplementation((selector) =>
      selector({ drs: { masters: [] } }),
    );
  });

  it("renders multi-member HO CMO data and selects a member without rendering DRS recursively", async () => {
    const onMemberSelect = jest.fn();
    const user = userEvent.setup();

    render(
      <MemberSelection
        applicationNumber="OB90377722"
        source={{
          applicationOverview: {
            productName: "iProtect Smart",
            channel: "Agency",
            sumAssured: 5000000,
          },
          summary: [
            {
              partyId: "P-1",
              memberType: "Life Assured 1",
              personalDetails: { fullName: "Aarav Sharma" },
            },
            {
              partyId: "P-2",
              memberType: "Life Assured 2",
              personalDetails: { fullName: "Anaya Sharma" },
            },
          ],
        }}
        onMemberSelect={onMemberSelect}
      />,
    );

    expect(screen.getByText("Select Member")).toBeInTheDocument();
    expect(screen.getByText("2 members are available in this application")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Open Life Assured 2 Anaya Sharma",
      }),
    );

    expect(onMemberSelect).toHaveBeenCalledTimes(1);
    expect(onMemberSelect).toHaveBeenCalledWith(1);
  });
});
