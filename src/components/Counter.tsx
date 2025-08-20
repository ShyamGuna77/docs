"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="text-base font-medium">Count: {count}</h2>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={increment}
          aria-label="Increment"
        >
          Increment
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={decrement}
          aria-label="Decrement"
        >
          Decrement
        </Button>
        <Button size="sm" variant="outline" onClick={reset} aria-label="Reset">
          Reset
        </Button>
      </div>
    </div>
  );
}

export default Counter;
