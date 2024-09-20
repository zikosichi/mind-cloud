import ClientResponsiveGridLayout from "./components/ClientResponsiveGridLayout";
import Project from "./components/Project";

export default function Home() {
  const layouts = {
    lg: [
      { i: "a", x: 0, y: 0, w: 1, h: 5 },
      { i: "b", x: 1, y: 0, w: 3, h: 5 },
      { i: "c", x: 4, y: 0, w: 1, h: 5 },
    ],
  };
  return (
    <>
      <Project projectKey={'asd'} />
      <ClientResponsiveGridLayout layouts={layouts}>
        {layouts.lg.map((layout) => (
          <Project projectKey={layout.i} />
        ))}
      </ClientResponsiveGridLayout>
    </>
  );
}
