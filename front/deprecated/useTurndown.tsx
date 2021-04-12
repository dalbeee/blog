import { useState } from "react";
import TurndownService from "turndown";

const useTurndown = () => {
  const [turndown, setTurndown] = useState(new TurndownService());
  const [convertedMarkDown, setConvertedMarkDown] = useState(null);

  const convertMarkDown = (htmlString: string) => {
    if (!htmlString) return;
    const result = turndown.turndown(htmlString);
    return setConvertedMarkDown(result);
  };
  console.log(convertedMarkDown);
  return {
    turndown,
    operation: {
      getConvertedMarkDown: convertedMarkDown,
      tryConvertMarkDown: convertMarkDown,
    },
  };
};

export default useTurndown;
