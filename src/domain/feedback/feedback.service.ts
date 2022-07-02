import { Feedback } from "./feedback.entity";
import { IFeedbackRepository } from "./feedback.repository.i";

export class FeedbackService {
  constructor(
    private readonly feedbackRepository: IFeedbackRepository,
  ) { }

  public async create(data: Partial<Feedback>): Promise<Feedback> {
    return this.feedbackRepository.create(data);
  }
}