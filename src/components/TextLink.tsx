import React, { type ReactNode } from "react";

import { linkStyle } from "../styles/index.js";

interface LinkProps {
  href: string;
  title: string;
  children: ReactNode;
}

export const TextLink = ({ href, title, children }: LinkProps) => {
  return (
    <a className={linkStyle} href={href} rel="noopener noreferrer" target="_blank" title={title}>
      {children}
    </a>
  );
};
