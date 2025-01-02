'use client';

import { useState } from 'react';

export default function Counter({ users }) {
  const [count, setCount] = useState(0);
  console.log(users.length);
  return (
    <>
      <p>This is the number of the users {users.length}</p>
      <button onClick={() => setCount((count) => count + 1)}>{count}</button>
    </>
  );
}
