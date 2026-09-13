import Link, { type LinkProps } from "next/link";
import { type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { buttonVariants } from "./button";

export interface LinkButtonProps
  extends LinkProps,
    VariantProps<typeof buttonVariants> {
  className?: string;
  children: React.ReactNode;
}

/**
 * A real navigational <a> (via next/link) styled with the Button variants.
 *
 * Use this, not <Button render={<Link .../>} />, for anything that navigates
 * to another page. Base UI's Button always forces role="button" on whatever
 * it renders when `nativeButton={false}` — correct for a non-button element
 * standing in for an action, wrong for a genuine link, which should keep its
 * native role="link" so it's announced correctly and behaves like a link
 * (e.g. open-in-new-tab, Enter-only activation) rather than a button.
 * Reserve <Button> itself for real actions: form submits, dialog triggers,
 * anything that doesn't change the URL.
 */
export function LinkButton({
  className,
  variant,
  size,
  ...props
}: LinkButtonProps) {
  return <Link className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
