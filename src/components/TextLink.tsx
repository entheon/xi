import classNames from "classnames";
import React, { type ReactNode } from "react";

import { linkStyle } from "../styles/index.js";

interface LinkProps {
  href: string;
  title: string;
  children: ReactNode;
  black?: boolean;
  underline?: boolean;
}

export const TextLink = ({
  href,
  title,
  children,
  black = false,
  underline = false,
}: LinkProps) => {
  const colourStyle = black ? "" : "text-sky-600";
  const underlineStyle = underline ? "underline underline-offset-auto" : "";
  const textStyleLink = classNames(colourStyle, underlineStyle, linkStyle);

  return (
    <a
      className={textStyleLink}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      title={title}
    >
      {children}
    </a>
  );
};
