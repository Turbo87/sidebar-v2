/// <reference types="leaflet" />

declare namespace L {

  namespace Control {

    interface SidebarOptions {
      position: string;
    }

    class Sidebar extends Control {
      constructor(id: string, options?: SidebarOptions);
      options: Control.ControlOptions;
      addTo(map: L.Map): this;
      remove(map: L.Map): this;
      open(id: string): this;
      close(): this;
    }

  }

  namespace control {
    function sidebar(id: string, options?: Control.SidebarOptions): L.Control.Sidebar;
  }

}
