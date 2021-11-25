import { ColorPalette, palettes } from "@ledgerhq/ui-shared";

export const space = [0, 2, 4, 8, 12, 14, 16, 24, 32, 40, 48, 64, 80, 96, 120];

export type TextVariants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "large"
  | "body"
  | "bodyLineHeight"
  | "paragraph"
  | "paragraphLineHeight"
  | "small"
  | "subtitle"
  | "tiny";

export type ThemeScale<Type, Aliases extends string> = Array<Type> &
  Record<Aliases, Type>;

export const fontSizes = [10, 11, 12, 13, 14, 16, 18, 24, 28] as ThemeScale<
  number,
  TextVariants
>;

[
  fontSizes.tiny,
  fontSizes.subtitle,
  fontSizes.small,
  fontSizes.paragraph,
  fontSizes.body,
  fontSizes.large,
  fontSizes.h3,
  fontSizes.h2,
  fontSizes.h1,
] = fontSizes;
fontSizes.bodyLineHeight = fontSizes.body;
fontSizes.paragraphLineHeight = fontSizes.paragraph;
fontSizes.h4 = fontSizes.h3;

export const radii = [0, 4, 8];
export const zIndexes = [-1, 0, 1, 9, 10, 90, 100, 900, 1000];

export type Theme = {
  theme: string;
  sizes: {
    topBarHeight: number;
    sideBarWidth: number;
  };
  radii: number[];
  fontSizes: number[];
  space: number[];
  colors: ColorPalette & {
    /**
     * @deprecated Do not use the .palette prefix anymore!
     */
    palette: ColorPalette;
  };
  zIndexes: number[];
};

const theme: Theme = {
  theme: "light",
  sizes: {
    topBarHeight: 58,
    sideBarWidth: 230,
  },
  radii,
  fontSizes,
  space,
  colors: {
    ...palettes.light,
    palette: palettes.light,
  },
  zIndexes,
};

export default theme;