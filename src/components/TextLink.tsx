import React, { type ReactNode } from "react";

interface LinkProps {
  href: string,
  title: string,
  children: ReactNode
}

export const TextLink = ({ href, title, children }: LinkProps) => {
  return (
    <a
      className="font-bold underline underline-offset-2"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      title={title}
    >
      {children}
    </a>
  )
}

// For backward compatibility
export default TextLink;
