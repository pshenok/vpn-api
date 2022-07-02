import { Feedback as FeedbackModel } from "@prisma/client";
import { Feedback } from "../../domain/feedback/feedback.entity";
import { IFeedbackRepository } from "../../domain/feedback/feedback.repository.i";
import { DB } from "../DB";

export class FeedbackRepository implements IFeedbackRepository {
  constructor(private db: DB) {}

  private toEntity(feedbackModel: FeedbackModel): Feedback {
    return new Feedback(feedbackModel)
  }

  public async create(data: Partial<Feedback>): Promise<Feedback> {
    const newFeedback = await this.db.client.feedback.create({
      data: {
        text: data.text!,
        email: data.email,
      }
    });

    return this.toEntity(newFeedback);
  }
}