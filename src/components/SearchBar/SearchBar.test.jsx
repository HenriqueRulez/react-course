import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from '.'

describe('<SearchBar />', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn();
    render(<SearchBar handleChange={fn}  searchValue={'testando'}/>);
    const searchBox = screen.getByPlaceholderText(/type your search/i);

    expect(searchBox.value).toBe('testando');
  });

  it('should call handleChange on each key press', () => {
    const fn = jest.fn();
    render(<SearchBar handleChange={fn}  searchValue={'value to be searched'}/>);
    const searchBox = screen.getByPlaceholderText(/type your search/i);
    const searchParam = 'value to be searched';

    userEvent.type(searchBox, searchParam);
    expect(searchBox.value).toBe(searchParam);
    expect(fn).toHaveBeenCalledTimes(searchParam.length);
  });

  it('should match snapeshot', () => {
    const fn = jest.fn();
    const {container} = render(<SearchBar handleChange={fn}  searchValue={'value to be searched'}/>);

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toMatchSnapshot();
  });
})