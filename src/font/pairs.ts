import { fontIaMono } from "./ia-mono/face";
import { fontIaQuattro } from "./ia-quattro/face";
import { fontLato } from "./lato/face";
import { fontSourceCode } from "./source-code/face";
import { fontSourceSerif } from "./source-serif/face";

export const fontPairs = {
  ia: `${fontIaQuattro} ${fontIaMono}`,
  lato: `${fontLato} ${fontSourceCode}`,
  source: `${fontSourceSerif} ${fontSourceCode}`,
};
