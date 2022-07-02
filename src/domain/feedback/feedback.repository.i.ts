import { Feedback } from "./feedback.entity";

export interface IFeedbackRepository {
  create(data: Partial<Feedback>): Promise<Feedback>
}