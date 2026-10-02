import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import ProfileHeader from "./components/ProfileHeader.jsx";
import PersonalInfo from "./components/PersonalInfo.jsx";
import Resume from "./components/Resume.jsx";
import SocialLinks from "./components/SocialLinks.jsx";
import About from "./components/About.jsx";
import GithubActivity from "./components/GithubActivity.jsx";
import Stack from "./components/Stack.jsx";
import Blog from "./components/Blog.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Achievements from "./components/Achievements.jsx";
import Certifications from "./components/Certifications.jsx";
import Research from "./components/Research.jsx";
import Footer from "./components/Footer.jsx";
import SearchModal from "./components/SearchModal.jsx";
import BackToTop from "./components/BackToTop.jsx";
import { StripeDivider } from "./components/Panel.jsx";
import { achievements, certifications, research } from "./data/portfolioData";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const initial = stored === "dark" ? "dark" : "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", initial === "dark" ? "#09090b" : "#ffffff");
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "dark" ? "#09090b" : "#ffffff");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="mx-auto w-full max-w-[840px]">
        <ProfileHeader />
        <StripeDivider />
        <PersonalInfo />
        <StripeDivider />
        <Resume />
        <StripeDivider />
        <SocialLinks />
        <StripeDivider />
        <About />
        <StripeDivider />
        <GithubActivity theme={theme} />
        <StripeDivider />
        <Stack />
        <StripeDivider />
        <Blog />
        <StripeDivider />
        <Experience />
        <StripeDivider />
        <Projects />
        <StripeDivider />
        {achievements.length > 0 && (
          <>
            <Achievements />
            <StripeDivider />
          </>
        )}
        {certifications.length > 0 && (
          <>
            <Certifications />
            <StripeDivider />
          </>
        )}
        {research.length > 0 && (
          <>
            <Research />
            <StripeDivider />
          </>
        )}
        <Footer />
      </main>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <BackToTop />
    </div>
  );
}
