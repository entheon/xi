import classNames from "classnames";

export const textStyle = classNames("font-roboto text-slate-600 dark:text-zinc-300")

export const mdStyle = classNames(textStyle, "prose dark:prose-invert max-w-none");

export const bgColour = classNames("bg-violet-50/50 dark:bg-slate-900")

export const hoverColour = classNames("hover:bg-rose-300/30 hover:dark:bg-fuschia-700 hover:shadow-lg")

export const buttonStyle = classNames("flex rounded-lg p-2 transition", hoverColour)

export const linkStyle = classNames("font-bold", "transition", "hover:text-cyan-500")

export const flexStyle = classNames("flex flex-col flex-1")

export const shadowBorder = classNames("rounded-2xl px-6 py-2 shadow-lg bg-rose-300/30 dark:bg-fuschia-700");

export const bodyBorder = classNames(flexStyle, textStyle, bgColour, "min-h-screen")

export const mainBorder = classNames(flexStyle, "items-center px-6 lg:px-8")

export const marginalBorder = classNames(textStyle, "relative mx-auto max-w-screen-md px-6 py-6");
