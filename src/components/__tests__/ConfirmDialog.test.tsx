import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ConfirmDialog from "@/components/ConfirmDialog";

describe("ConfirmDialog", () => {
  it("should render a dialog with passed props and call the action when the action button is pressed", () => {
    const confirmDialogAction = jest.fn();

    render(
      <ConfirmDialog
        title="Confirm Dialog Title"
        description="Confirm Dialog Description"
        actionButton="Confirm Dialog Action Button"
        cancelButton="Confirm Dialog Cancel Button"
        action={confirmDialogAction}
      >
        <button>Alert Trigger</button>
      </ConfirmDialog>
    );

    const trigger = screen.getByText("Alert Trigger");
    fireEvent.click(trigger);

    expect(screen.getByText("Confirm Dialog Title")).toBeInTheDocument();
    expect(screen.getByText("Confirm Dialog Description")).toBeInTheDocument();
    expect(
      screen.getByText("Confirm Dialog Action Button")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Confirm Dialog Cancel Button")
    ).toBeInTheDocument();

    const actionButton = screen.getByText("Confirm Dialog Action Button");
    fireEvent.click(actionButton);

    expect(confirmDialogAction).toHaveBeenCalled();
    expect(screen.queryByText("Confirm Dialog Title")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Confirm Dialog Description")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Confirm Dialog Action Button")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Confirm Dialog Cancel Button")
    ).not.toBeInTheDocument();
  });

  it("should render a dialog with passed props and close the dialog when the cancel button is pressed", () => {
    const confirmDialogAction = jest.fn();

    render(
      <ConfirmDialog
        title="Confirm Dialog Title"
        description="Confirm Dialog Description"
        actionButton="Confirm Dialog Action Button"
        cancelButton="Confirm Dialog Cancel Button"
        action={confirmDialogAction}
      >
        <button>Alert Trigger</button>
      </ConfirmDialog>
    );

    const trigger = screen.getByText("Alert Trigger");
    fireEvent.click(trigger);

    expect(screen.getByText("Confirm Dialog Title")).toBeInTheDocument();
    expect(screen.getByText("Confirm Dialog Description")).toBeInTheDocument();
    expect(
      screen.getByText("Confirm Dialog Action Button")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Confirm Dialog Cancel Button")
    ).toBeInTheDocument();

    const cancelButton = screen.getByText("Confirm Dialog Cancel Button");
    fireEvent.click(cancelButton);

    expect(confirmDialogAction).not.toHaveBeenCalled();
    expect(screen.queryByText("Confirm Dialog Title")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Confirm Dialog Description")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Confirm Dialog Action Button")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Confirm Dialog Cancel Button")
    ).not.toBeInTheDocument();
  });
});
