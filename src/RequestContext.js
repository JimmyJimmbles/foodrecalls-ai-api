// Vendors
import { createNamespace, getNamespace } from 'cls-hooked';
import os from 'os';
import { v4 as uuid } from 'uuid';

// Create Session name
const SESSION_NAMESPACE = 'food-recalls-api-request';

// Create Request Session
const requestSession = createNamespace(SESSION_NAMESPACE);

// Get the context of the request
class RequestContext {
  constructor(req) {
    this.requestDate = new Date();
    this.requestIp = req.ip;
    this.baseRequestApplication =
      req.header('x-base-request-application') || 'MANUAL';
    this.requestId = uuid();
    this.parentRequestId = req.header('x-parent-request-id') || undefined;
    this.baseRequestId =
      req.header('x-base-request-id') || this.parentRequestId || this.requestId;
    this.startTime = process.hrtime();
    this.requestEndpoint = 'unknown';
  }

  // Set up the request context
  static async setup(req, res, next) {
    // store the request and response to eh current session
    requestSession.bindEmitter(req);
    requestSession.bindEmitter(res);

    // Recursively set the context for each request
    await requestSession.runPromise(async () => {
      requestSession.set('context', new RequestContext(req));
    });

    next();
  }

  // Get the namespace of the session
  static getNamespace() {
    return getNamespace(SESSION_NAMESPACE);
  }

  // Get the current request context
  static current() {
    const namespace = RequestContext.getNamespace();
    return namespace ? namespace.get('context') : undefined;
  }

  // Set's the request endpoint
  setRequestEndpoint(requestEndpoint) {
    this.requestEndpoint = requestEndpoint;
  }

  // Return the audit of the session request
  getAuditInformation() {
    return {
      baseRequestApplication: this.baseRequestApplication,
      baseRequestId: this.baseRequestId,
      hostname: os.hostname(),
      madeAt: this.requestDate,
      requestEndpoint: this.requestEndpoint,
      requestId: this.requestId,
      userIp: this.requestIp,
    };
  }
}

export default RequestContext;
