export default function (state = {}, action) {
  console.log(action);
  switch (action.type) {

    //default fallback to always return state
    default:
      return state;
  }
};
