import { render, screen } from "@testing-library/react";
import { PostCard } from ".";
import postCardPropsMock from "./mock";

const props = postCardPropsMock;

describe('<PostCard />', () => {
  it('should render PostCard correctly', () => {
    render(<PostCard {...props}/>);

    expect(screen.getByRole('img', { title: props.title })).toHaveAttribute('src', 'img/img.png');
    expect(screen.getByRole('heading', { name: props.title })).toBeInTheDocument();
    expect(screen.getByText('Post body')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<PostCard {...props}/>);

    //Avoid accessing direct child node
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toMatchSnapshot()
  });
});