import renderer from "react-test-renderer";
import { ElementStates } from "../../../../types/element-states";
import { Circle } from "../circle";

describe("Circle component:", () => {
  it("should be rendered WITHOUT letters", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be rendered with letters", () => {
    const tree = renderer.create(<Circle letter="A" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be rendered with head", () => {
    const tree = renderer.create(<Circle head="A" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be rendered with React-element in head", () => {
    const tree = renderer
      .create(<Circle head={<Circle letter="A" />} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be rendered with tail", () => {
    const tree = renderer.create(<Circle tail="A" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be rendered with React-element in tail", () => {
    const tree = renderer
      .create(<Circle tail={<Circle letter="A" />} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be rendered with index", () => {
    const tree = renderer.create(<Circle index={1} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be rendered as small", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be rendered as default", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be rendered as changing", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be rendered as modified", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
