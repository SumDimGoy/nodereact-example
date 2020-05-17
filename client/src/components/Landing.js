import React from 'react';

const Landing = () => {
  return (
    <div style={{textAlign: 'center' }}>
      <h3>
        <span>React Survey Web App!</span><br/>
        <img
          src={process.env.PUBLIC_URL+'/React.png'}
          width="80"
          height="70"
          style={{marginTop: "20px"}}
        />
    </h3>
      Collect feedback from your users
    </div>
  );
};
export default Landing;
