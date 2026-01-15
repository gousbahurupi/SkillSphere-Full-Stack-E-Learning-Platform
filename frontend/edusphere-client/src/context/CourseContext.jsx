import { createContext, useContext, useEffect, useState } from "react";
import { getAllCourses } from "../services/course.service";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CourseContext.Provider value={{ courses, loading }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
