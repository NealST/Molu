import { beginRules } from "./rules";

const getLabelInfo = function (blockText: string) {
  const tokens = beginRules.reference_definition.exec(blockText);
  let label = null;
  let info = null;
  if (tokens) {
    label = (tokens[2] + tokens[3]).toLowerCase();
    info = {
      href: tokens[6],
      title: tokens[10] || "",
    };
  }

  return { label, info };
};

export default getLabelInfo;
