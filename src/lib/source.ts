import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import * as TablerIcons from "@tabler/icons-react";
import { createElement } from "react";

export const source = loader({
  // it assigns a URL to your pages
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return;

    let IconComponent;

    // First try: exact match
    if (icon in TablerIcons) {
      IconComponent = TablerIcons[icon as keyof typeof TablerIcons];
    }
    // Second try: with Icon prefix
    else if (`Icon${icon}` in TablerIcons) {
      IconComponent = TablerIcons[`Icon${icon}` as keyof typeof TablerIcons];
    }
    // Third try: with Icon prefix and capitalized first letter
    else {
      const capitalizedIcon = `Icon${
        icon.charAt(0).toUpperCase() + icon.slice(1)
      }`;
      if (capitalizedIcon in TablerIcons) {
        IconComponent =
          TablerIcons[capitalizedIcon as keyof typeof TablerIcons];
      }
    }

    if (IconComponent) {
      return createElement(IconComponent as React.ComponentType);
    }
  },
});
