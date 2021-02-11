module.exports = ({ Schema }) => new Schema({
  userId: {
    ref: 'User',
    type: Schema.Types.ObjectId,
  },
  completed: {
    default: false,
    type: Boolean,
  },
  text: String,
});
