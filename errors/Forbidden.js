export default class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}
