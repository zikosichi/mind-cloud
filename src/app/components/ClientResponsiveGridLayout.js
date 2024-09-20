"use client"; // This directive ensures the component is treated as a Client Component

import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function ClientResponsiveGridLayout({ layouts, children }) {
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      cols={{lg: 12}}
      rowHeight={30}
      breakpoints={{ lg: 1200 }}
    >
      {children}
    </ResponsiveGridLayout>
  );
}
