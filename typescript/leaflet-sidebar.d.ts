/// <reference types="leaflet" />

import * as L from "leaflet"

declare module "leaflet" {
  namespace Control {
    class _Sidebar extends Control {
      constructor(id: string, options?: ControlOptions)
      options: ControlOptions
      addTo(map: Map): this
      remove(): this
      open(id: string): this
      close(): this
    }

    interface Sidebar extends _Sidebar, Evented {}
  }

  namespace control {
    function sidebar(
      id: string,
      options?: ControlOptions
    ): L.Control.Sidebar
  }
}

