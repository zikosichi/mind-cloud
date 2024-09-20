"use client"; // This directive ensures the component is treated as a Client Component

import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

export default function ClientResponsiveGridLayout({ layouts, onLayoutChange, children }) {
  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={breakpoints}
      cols={cols}
      rowHeight={30}
      width={1200}
      autoSize={true}
      draggableCancel=".no-drag"
      onLayoutChange={(layout, allLayouts) => onLayoutChange(allLayouts)}
    >
      {children}
    </ResponsiveGridLayout>
  );
}