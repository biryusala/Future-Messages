import './ThemeButton.scss';
import { FC } from "react";

interface ThemeButtonProps {
  name: string;
  type?: 'submit' | undefined;
  onClick?: () => void;
  disabled?: boolean;
}

const ThemeButton: FC<ThemeButtonProps> = ({type, name, onClick, disabled}) => {
  return (
    <button
      disabled={disabled}
      className={'loginButton'}
      onClick={onClick}
      type={type}>{name}</button>
  )
}

export default ThemeButton;