package org.dlsu.arrowsmith.repositories;

import org.dlsu.arrowsmith.classes.main.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;

public interface CourseOfferingRepository extends JpaRepository<CourseOffering, Long> {
    ArrayList<CourseOffering> findAllByFaculty(User user);
    ArrayList<CourseOffering> findAllByFacultyAndTerm(User faculty, Term term);
    ArrayList<CourseOffering> findAllByCourseAndTerm(Course course, Term term);
    ArrayList<CourseOffering> findAllByTypeAndTerm(String type, Term term);
    ArrayList<CourseOffering> findAllByCourseDepartmentAndTerm(Department department, Term term);
    ArrayList<CourseOffering> findAllByServiceToAndTerm(Long serviceTo, Term term);
    CourseOffering findCourseOfferingByOfferingId(Long offering_id);
    CourseOffering findCourseOfferingByCourse_CourseCodeAndSectionAndTerm(String course_code, String section, Term term);
    ArrayList<CourseOffering> findAllByTerm(Term term);
    Page<CourseOffering> findAllByTermOrderByOfferingIdAsc(Term term, Pageable pageable);
    ArrayList<CourseOffering> findAllByCourseCourseCode(String courseCode);
    ArrayList<CourseOffering> findAllByFacultyAndCourse(User user, Course course);
}
