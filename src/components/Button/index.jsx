import "./styles.css"

export const Button = ({ text, handleMorePosts,disabled}) => {
  return <button disabled={disabled} onClick={handleMorePosts}>{text}</button>;
};
