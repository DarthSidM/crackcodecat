
import { HeroSection } from './components/HeroSection';
import { CourseOffering } from './components/CourseOffering';
import { FacultySpotlight } from './components/FacultySpotlight';
import { CourseCatalog } from './components/CourseCatalog';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CourseOffering />
      <CourseCatalog />
      <FacultySpotlight />
    </>
  );
}
