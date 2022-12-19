import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../button";

describe("Button component :", () => {
  it("should be rendered with text", () => {
    const tree = renderer.create(<Button text="Нажми меня" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be rendered WITHOUT text", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be rendered disabled", () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be rendered with loader", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should call the callback by click", () => {
    const mockCallback = jest.fn();
    mockCallback.mockImplementation((text) => {
      console.log(text);
    });
    render(<Button text={"Нажми меня"} onClick={() => mockCallback('test')} />);
    const button = screen.getByText("Нажми меня");
    fireEvent.click(button);
    expect(mockCallback).toHaveBeenCalledWith('test');
  });
});
