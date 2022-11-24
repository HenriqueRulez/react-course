import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

describe('<Button/>', () => {
  it('should render the button with text "Load More"', () => {
    render(<Button text="Load more" />);

    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    const fn = jest.fn();
    //Props of the teste component SHOULD BE the same as the one being implemented
    render(<Button text="Load more" handleMorePosts={ fn } />);

    const button = screen.getByRole('button', { name: /load more/i });

    userEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);

  });

  it('should be disabled when disabled is true', () => {
    render(<Button text="Load more" disabled={ true } />);

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toBeDisabled();

  });

  it('should be enabled when disabled is false', () => {
    render(<Button text="Load more" disabled={ false } />);

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toBeEnabled();

  });
})