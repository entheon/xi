// Base code from: https://tailwindui.com/components/marketing/elements/flyout-menus

import React, { Fragment, type ReactNode } from "react";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { buttonStyle } from "../styles/index.js";

interface PopoverProps {
  text?: string;
  icon?: string;
  children: ReactNode;
}

export const IconedPopover = ({ text, icon, children }: PopoverProps) => {
  const Display = () => {
    // Assumes that one of text or icon has to be defined
    if (typeof text !== "undefined") {
      return (
        <span>{text}</span>
      )
    } else  {
      return (
        <div className={buttonStyle}>
          <img height="24" width="24" alt="Icon" src={`https://cdn.simpleicons.org/${icon}`} />
        </div>
      )
    }
  }

  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6">
        <Display />
        { typeof text !== "undefined" &&
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        }
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-1/2 z-10 mt-5 flex w-48 max-w-max -translate-x-1/2 px-4">
          <div className="w-48 max-w-md flex-auto overflow-hidden rounded-lg text-sm leading-6 shadow-lg ring-1 bg-violet-50 dark:bg-slate-900">
            <div className="p-4">
              {children}
            </div>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
};
