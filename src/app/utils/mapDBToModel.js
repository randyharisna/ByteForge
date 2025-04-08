export const mapCourses = ({
  id,
  title,
  description,
  difficulty,
  tier,
  created_at,
  updated_at
}) => ({
  id,
  title,
  description,
  difficulty,
  tier,
  createdAt: created_at,
  updatedAt: updated_at
});