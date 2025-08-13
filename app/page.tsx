import { HeroCarousel } from './components/HeroCarousel';
import { CourseOffering } from './components/CourseOffering';
import { FacultySpotlight } from './components/FacultySpotlight';
import { CourseCatalog } from './components/CourseCatalog';
import { Footer } from './components/Footer';
import { ScheduleCall } from './components/ScheduleCall';

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <CourseOffering />
     
      <FacultySpotlight />
      <ScheduleCall />
      <Footer />
    </>
  );
}
