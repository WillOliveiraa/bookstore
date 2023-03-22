import { cloneElement, ReactElement } from 'react';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
  isDark: boolean;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  isDark,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  let isActive = false;

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }

  if (
    !shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true;
  }

  function getColor() {
    if (isActive) {
      return 'pink.500';
    }
    return isDark ? 'gray.50' : 'gray.500';
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: getColor()
      })}
    </Link>
  );
}
