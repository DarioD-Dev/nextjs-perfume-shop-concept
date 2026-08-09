import type { ButtonHTMLAttributes } from "react";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "./buttonStyles";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ variant, size, className, ...props }: Props) {
  return <button className={buttonStyles({ variant, size, className })} {...props} />;
}
