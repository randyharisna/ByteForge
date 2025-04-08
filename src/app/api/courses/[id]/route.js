import CoursesService from "@/app/services/courses/CoursesService";
import CourseValidator from "@/app/validator/courses";
import { createResponse, handleError } from "@/app/utils/responseHandler";

const coursesService = new CoursesService();

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    
    const course = await coursesService.getCourseById(id);

    return createResponse('success', {
      data: {
        course
      }
    });
  } catch (error) {
    return handleError(error);   
  }
}

export async function PUT(req, { params }) {
  try {
    const payload = await req.json();
    CourseValidator.validateCoursePayload(payload);
    const { id } = await params;

    await coursesService.editCourseById(id, payload);

    return createResponse('success', {
      message: 'Course berhasil diperbarui'
    });
  } catch (error) {
    return handleError(error);
  } 
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    await coursesService.deleteCourseById(id);

    return createResponse('success', {
      message: 'Course berhasil dihapus'
    });
  } catch (error) {
    return handleError(error);
  }
}