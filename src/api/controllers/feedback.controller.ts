import joi from 'core/lib/app/Validator';
import { Request } from 'express';
import { FeedbackService } from '../../domain/feedback/feedback.service';
import { AuthType } from '../auth/auth.types';
import { handler } from '../decorators';

export class FeedbackController {
  constructor(
    private readonly feedbackService: FeedbackService
  ) { }

  @handler({
    description: 'Create feedback',
    method: 'POST',
    path: '/feedbacks',
    auth: AuthType.None,
    validate: {
      body: joi.object().keys({
        email: joi.string(),
        text: joi.string().required(),
      }),
    },
    response: {
      200: joi.object(), // TODO: make it for swagger
    },
  })
  public async createFeedback(req: Request): Promise<object> {
    return this.feedbackService.create({
      text: req.body.text,
      email: req.body.email
    });
  }
}