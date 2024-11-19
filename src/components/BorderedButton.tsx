import React, { type ReactNode } from "react";

import { buttonStyle } from "../styles";

interface BorderedButtonProps {
  id?: string
  children: ReactNode,
}

export const BorderedButton = ({ id, children }: BorderedButtonProps) => {
  return (
    <button id={id ? id : undefined} className={buttonStyle}>
      {children}
    </button>
  )
}

// For backward compatibility
export default BorderedButton;
