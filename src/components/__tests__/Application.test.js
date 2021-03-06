import React from "react";
import Application from "components/Application";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  // getByText,
  // prettyDOM,
  // getAllByTestId,
  // getByAltText,
  // getByPlaceholderText,
  // queryByText,
  // waitForElementToBeRemoved,
  // getByDisplayValue,
  
} from "@testing-library/react";


afterEach(cleanup);

describe("Form", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  // it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  //  
  //   const { container, debug } = render(<Application/>);
  //  
  //   await waitForElement(() => getByText(container, "Archie Cohen"));
  // 
  //   const appointment = getAllByTestId(container, "appointment")[0];
  //   fireEvent.click(getByText(appointment, "Add"));

  //   fireEvent.change(getByPlaceholderText(appointment,/enter student name/i), {
  //     target: { value: "Lydia Miller-Jones" }
  //   });
    
  //   fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  //   fireEvent.click(getByText(appointment, "Save"))
  // });
}) 