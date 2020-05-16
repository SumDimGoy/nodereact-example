const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
  //filter for invalid emails
  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
      //validate email against regex
      .filter(email => re.test(email) === false);

  if (emails.length && invalidEmails.length > 0) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return;
};
