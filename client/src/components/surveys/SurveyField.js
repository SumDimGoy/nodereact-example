//render a single field
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  //destructure input, label and meta object from props.
  //destructure error, and touched object from meta object
  // use ... to pass entire object
  return (
    <div>
      <label>{ label }</label>
      <input {...input} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </ div>
  );
};
