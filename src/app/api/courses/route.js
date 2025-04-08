import CoursesService from "@/app/services/courses/CoursesService";
import CourseValidator from "@/app/validator/courses";
import { createResponse, handleError } from "@/app/utils/responseHandler";

const coursesService = new CoursesService();

export async function POST(req, { params }) {
  try {
    const payload = await req.json();
    CourseValidator.validateCoursePayload(payload);
    
    const courseId = await coursesService.addCourse(payload);

    return createResponse('success', {
      message: 'Course berhasil ditambahkan',
      data: {
        courseId
      }
    }, 201);
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(req, { params }) {
  try {
    const courses = await coursesService.getCourses();
    
    return createResponse('success', {
      data: {
        courses
      }
    });
  } catch (error) {
    return handleError(error);
  }
}