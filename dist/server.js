"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// HTTP SERVER
const app = (0, _express.default)();

const setPort = (port = 5000) => {
  app.set('port', parseInt(port, 10));
};

const listen = () => {
  const port = app.get('port') || 5000;
  app.listen(port, () => {
    console.log(`The server is running and listening at http://localhost:${port}`);
  });
};

app.use((0, _cors.default)({
  origin: '*',
  // Be sure to switch to production domain
  optionsSuccessStatus: 200
})); // Endpoint to check if the API is running

app.get('/api/status', (req, res) => {
  res.send({
    status: 'ok'
  });
});
var _default = {
  getApp: () => app,
  setPort,
  listen
};
exports.default = _default;