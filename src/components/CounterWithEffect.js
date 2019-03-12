import React, { useState, useEffect, Fragment } from 'react';


const Counter = () => {

  // This is a hook. Starts set to 0, modified with setCount, state viewed from count
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <Fragment>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </Fragment>
  );
}

export default Counter
