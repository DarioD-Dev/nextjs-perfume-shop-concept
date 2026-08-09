import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "./buttonStyles";

type Props = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function ButtonLink({ variant, size, className, ...props }: Props) {
  return <Link className={buttonStyles({ variant, size, className })} {...props} />;
}
