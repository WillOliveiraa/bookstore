import { createContext, useContext, useState } from 'react';

const CycleContext = createContext({
  activeCycle: 54
} as any);

function Component1() {
  const { activeCycle, setActiveCycle } = useContext(CycleContext);
  return (
    <div>
      <h1>Component 1: {activeCycle}</h1>
      <button
        onClick={() => {
          setActiveCycle(5);
        }}
      >
        Update
      </button>
    </div>
  );
}

function Component2() {
  const { activeCycle } = useContext(CycleContext);
  return <h1>Component 2: {activeCycle}</h1>;
}

export default function Home() {
  const [activeCycle, setActiveCycle] = useState(1);

  return (
    <CycleContext.Provider value={{ activeCycle, setActiveCycle }}>
      <div>
        <Component1 />
        <Component2 />
      </div>
    </CycleContext.Provider>
  );
}
