import { registerRichText } from "@lexical/rich-text";
import { $createParagraphNode, $getRoot, createEditor } from "lexical";
import {
  $convertFromMarkdownString,
  BOLD_STAR,
  ITALIC_STAR,
  TRANSFORMERS,
  registerMarkdownShortcuts,
} from "@lexical/markdown";

const state = {
  current: null,
  redoStack: [],
  undoStack: [],
};

window.state = state;

import { registerHistory } from "@lexical/history";

export const init = () => {
  const lexical = createEditor({
    namespace: "vanilla-lexical",
    theme: {
      paragraph: "teste",
      root: "lexical-editor",
      text: { base: "text" },
    },
    onError: console.log,
  });

  registerRichText(lexical);
  registerHistory(lexical, state);
  registerMarkdownShortcuts(lexical, [ITALIC_STAR]);

  lexical.setRootElement(document.querySelector("#lexical"));

  /**
   * @param {string} [text]
   */
  const setText = (text = "") => {
    lexical.update(() => {
      const root = $getRoot();
      const splitted = text.split("\n");

      splitted.forEach((text) => {
        const paragraph = $createParagraphNode();

        $convertFromMarkdownString(text, [BOLD_STAR], paragraph);

        root.append(paragraph);
      });
    });
  };

  // setText("**oiiii**");
  // setText("**oi**\nkkk www.google.com");
};
