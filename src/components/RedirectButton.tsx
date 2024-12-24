import React, { type ReactNode } from "react";

import { TextLink } from "./TextLink.js";
import { BorderedButton } from "./BorderedButton.js";

interface RedirectButtonProps {
  href: string;
  title: string;
  children: ReactNode;
}

export const RedirectButton = ({ href, title, children }: RedirectButtonProps) => {
  return (
    <BorderedButton>
      <TextLink href={href} title={title}>
        {children}
      </TextLink>
    </BorderedButton>
  );
};
