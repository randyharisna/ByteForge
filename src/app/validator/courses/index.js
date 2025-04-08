import InvariantError from "@/app/exceptions/InvariantError";
import { CoursePayloadSchema } from "./schema";

const CourseValidator = {
  validateCoursePayload: (payload) => {
    const validationResult = CoursePayloadSchema.safeParse(payload);

    if (!validationResult.success) {
      const errorMessages = validationResult.error.issues.map(issue => `${issue.path}: ${issue.message}`);

      throw new InvariantError(errorMessages);
    }
  },
};

export default CourseValidator;