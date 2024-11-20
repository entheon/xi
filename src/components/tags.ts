import type { Tag } from "./types.js";

// GitHub language colors from https://github.com/ozh/github-colors/blob/master/colors.json
export const languageColours: { [key: string]: string } = {
  JavaScript: '#f7df1e',
  TypeScript: '#007acc',
  Python: '#3572a5',
  Shell: '#89e051',
  Astro: '#ff6f47',
}

export function createLanguageTags(languages: string[]): Tag[] {
  return languages.map(lang => ({
    name: lang,
    colour: languageColours[lang]
  }));
}
