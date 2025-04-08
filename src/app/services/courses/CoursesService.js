import { Pool } from "pg";
import { nanoid } from "nanoid";
import InvariantError from "@/app/exceptions/InvariantError";
import NotFoundError from "@/app/exceptions/NotFoundError";
import { mapCourses } from "@/app/utils/mapDBToModel";

class CoursesService {
  constructor() {
    this._pool = new Pool();
  }

  async addCourse({ title, description, difficulty, tier }) {
    const id = `course-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    
    const query = {
      text: 'INSERT INTO courses VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING course_id',
      values: [id, title, description, difficulty, tier, createdAt, updatedAt]
    };
    
    const result = await this._pool.query(query);

    if (!result.rows[0].course_id) {
      throw new InvariantError('Course gagal ditambahkan');
    }

    return result.rows[0].course_id;
  }

  async getCourses() {
    const result = await this._pool.query('SELECT * FROM courses');
    return result.rows.map(mapCourses);
  }

  async getCourseById(id) {
    const query = {
      text: 'SELECT * FROM courses WHERE course_id = $1',
      values: [id]
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Course tidak ditemukan');
    }

    return result.rows.map(mapCourses)[0];
  }

  async editCourseById(id, { title, description, difficulty, tier }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: 'UPDATE courses SET title = $1, description = $2, difficulty = $3, tier = $4, updated_at = $5 WHERE course_id = $6 RETURNING course_id',
      values: [title, description, difficulty, tier, updatedAt, id]
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui course. Id tidak ditemukan');
    }
  }

  async deleteCourseById(id) {
    const query = {
      text: 'DELETE FROM courses WHERE course_id = $1 RETURNING course_id',
      values: [id]
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Course gagal dihapus. Id tidak ditemukan');
    }
  }
}

export default CoursesService;