import { Application } from "@hotwired/stimulus"

import InertiaController from "../controllers/inertia_controller"
window.Stimulus = Application.start();

Stimulus.register("inertia", InertiaController)