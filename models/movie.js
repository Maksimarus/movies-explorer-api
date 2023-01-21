import mongoose from 'mongoose';
import { regExpForLink } from '../validation/dataValidator.js';

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate(v) {
      return regExpForLink.test(v);
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate(v) {
      return regExpForLink.test(v);
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate(v) {
      return regExpForLink.test(v);
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

export default mongoose.model('movie', movieSchema);
