import React, {StrictMode} from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";

createInertiaApp({
  resolve: async (name) => {
    const pages = import.meta.glob("../pages/**/*.jsx", { eager: true });
    return pages[`../pages/${name}.jsx`];
  },
  setup({ el, App, props }) {
    const container = document.getElementById(el.id);
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <App {...props} />
      </StrictMode>
    );
  },
});

