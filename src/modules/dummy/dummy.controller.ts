import { Response, Request } from 'express';

class TestModuleController {
  async testHandler(_req: Request, res: Response) {
    const authenticated = false;
    const hasProfile = false;
    // throw new Error("Error");
    res.json({ message: 'Hello, World!', authenticated, hasProfile });
  }
}

export default TestModuleController;
