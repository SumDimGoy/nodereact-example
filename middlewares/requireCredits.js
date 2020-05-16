
module.exports = (req, res, next) => {
  //check if the user has enough credits
  if(req.user.credits < 1) {
    return res.status(403).send({ error: 'not enough credits' });
  }
  next();
}
