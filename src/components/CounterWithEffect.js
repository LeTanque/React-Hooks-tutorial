import React, { useEffect, Fragment } from 'react';

// This is a Hook Effect
// Effects are similar to componentDidMount and componentDidUpdate:
// The hook side effect is when you click on the counter, it changes the page title

const Counter = props => {


  // Moved this function to App so that I could play with the counter's state in components above it
  // const [count, setCount] = useState(0);


  // When the component is mounted, changes something. componentDidMount() essentially
  useEffect(() => {
    document.title = `You clicked ${props.count} times`;  // Update the document title using the browser API
  });

  
  console.log('What counter receives\nprops:',props)


  return (
    <Fragment>
      
      
      {props.editing ? (
        <Fragment>
          <p>
            {props.currentUser.name}<br />
            {props.currentUser.username} {props.currentUser.score}<br />
            Score: <strong>{props.userScore}</strong></p>
          <button onClick={() => props.setUserScore(props.userScore + 1)}>
            Score
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <p>Edit a user to score points</p>
          <button onClick={() => props.setCount(props.count + 1)}>
            Count
          </button>
        </Fragment>
      )}
        
      
    </Fragment>
  );
}

export default Counter
