import { useEffect } from "react";

function LifecycleDemo() {
  useEffect(() => {
    console.log("I was born! (Component mounted)");

    // Cleanup function - runs when component dies
    return () => {
      console.log("Goodbye! (Component unmounted)");
    };
  }, []);

  return <h1>Hello World!</h1>;
}

export default LifecycleDemo;
