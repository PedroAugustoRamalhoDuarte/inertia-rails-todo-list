import { Controller } from "@hotwired/stimulus"
import {createInertiaApp} from "@inertiajs/react";
import {createRoot} from "react-dom/client";
import React from "react";

export default class extends Controller {
  connect() {
    console.log("Hello, Stimulus!", this.element)

    createInertiaApp({
      id: "dialog",
      resolve: async (name) => {
        console.log(name);
        const pages = import.meta.glob("../pages/**/*.jsx", { eager: true });
        console.log(pages);
        let page = pages[`../pages/Todos/Index.jsx`];

        return page;
      },
      setup({ el, App, props }) {
        console.log("Hello, element", el);
        const container = document.getElementById(el.id);
        const root = createRoot(container);
        root.render(<App {...props} />);
      },
    });

  }
}
