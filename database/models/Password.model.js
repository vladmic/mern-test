module.exports = ({ Schema }) => new Schema({
  userId: {
    ref: 'User',
    type: Schema.Types.ObjectId,
  },
  hash: String,
});
