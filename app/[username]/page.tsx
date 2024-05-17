'use client';

import Image from "next/image";
import ThemeSwitch from "@/components/theme-switch";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import html2pdf from 'html2pdf.js';

interface Skill {
  skill: string;
  percentage: number;
}

interface Education {
  id: number;
  degree: string;
  institute: string;
  year: number;
}

interface Project {
  id: number;
  project_name: string;
  project_description: string;
  project_image: string | null;
  project_url: string;
}

interface Experience {
  id: number;
  company_name: string;
  job_title: string;
  duration: string;
  job_description: string;
}

interface Achievement {
  id: number;
  achievement: string;
}

interface UserData {
  first_name: string;
  email: string;
  picture: string | null;
  age: number | null;
  phone: string;
  about_me: string;
  skills: Skill[];
  education: Education[];
  projects: Project[];
  experiences: Experience[];
  achievements: Achievement[];
}

const Dashboard = ({
  params
}: {
  params: {
    username: string;
  }
}) => {
  const router = useRouter();
  const username = params.username;
  const myUsername = localStorage.getItem('username');

  const [userData, setUserData] = useState<UserData>({
    first_name: "User Not Found",
    email: "",
    picture: "",
    age: null,
    phone: "",
    about_me: "",
    skills: [],
    education: [],
    projects: [],
    experiences: [],
    achievements: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Authorization');

        const response = await fetch(`${process.env.BACKEND_URL}/api/users/${username}/details/`, {
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = () => {
    window.location.href = `/${myUsername}/edit`;
  }

  const handleLogout = () => {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('username');
    router.push('/login');
  }

  const downloadPDF = () => {
    const originalElement = document.getElementById('cv-section');

    // Create a new element that wraps the original element
    const wrapper = document.createElement('div');
    wrapper.style.padding = '40px';
    wrapper.style.background = 'black';
    wrapper.style.height = '200vh';
    wrapper.appendChild(originalElement.cloneNode(true));

    // Create the PDF from the new element
    html2pdf()
      .set({ html2canvas: { scale: 2, backgroundColor: 'black' } })
      .from(wrapper)
      .save();

    // Clean up the new element
    wrapper.remove();
  }



  return (
    <>
      <main className="max-w-xl mx-auto px-6 py-20 relative min-h-screen font-light">
        {username === myUsername && (
          <div className="flex flex-row gap-10">
            <a className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 mb-20"
              href={`/${myUsername}/edit`}
            >
              <code className="font-mono font-bold" >
                Edit Your Resume
              </code>
            </a>
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-red-500 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-red-500 lg:p-4 lg:dark:bg-zinc-800/30 mb-20 bg-red-600"
              onClick={handleLogout}
            >
              <code className="font-mono font-bold">
                Log Out
              </code>
            </p>
          </div>
        )}
        <div id="cv-section" className="h-[100%]">
          <section className="flex items-center">
            <Image
              alt="Author"
              src={userData.picture || "https://picsum.photos/300/300"}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            <div className="ml-4">
              <h1 className="mb-0.5 text-xl text-slate-900 dark:text-slate-100">
                {userData.first_name}
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                {userData.email}
              </p>
              {userData.phone ? (
                <span className="text-sm text-slate-400 dark:text-slate-400">
                  Phone: {userData.phone}
                </span>
              ) : null}
              {userData.age ? (
                <p className="text-sm text-slate-400 dark:text-slate-400">
                  Age: {userData.age}
                </p>
              ) : null}
            </div>
          </section>
          {userData.about_me.length > 0 && (<section className="my-9 text-sm">
            <h3 className="mb-1 text-slate-900 dark:text-slate-100">About</h3>
            <div className="text-slate-600 dark:text-slate-300">
              <p>{userData.about_me}</p>
            </div>
          </section>)}
          {userData.education.length > 0 && (
            <section className="my-14 text-sm">
              <h3 className="mb-6">{'Education'}</h3>
              <div className="flex flex-col gap-6">
                {userData.education.map((education, index) => {
                  return (
                    <div className="flex" key={index}>
                      <div className="mr-8 max-w-[100px] w-full text-slate-400 dark:text-slate-400">
                        {education.year}
                      </div>
                      <div className="flex flex-col flex-1">
                        <h4 className="mb-1">{education.degree}</h4>
                        <p className="text-slate-600 dark:text-slate-300">{education.institute}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
          {userData.skills.length > 0 && (
            <section className="my-14 text-sm">
              <h3 className="mb-6">{'Skills'}</h3>
              <div className="flex flex-col gap-6">
                {userData.skills.map((skill, index) => {
                  return (
                    <div className="flex" key={index}>
                      <div className="mr-8 max-w-[100px] w-full text-slate-400 dark:text-slate-400">
                        {skill.skill}
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg">
                          <div
                            style={{ width: `${skill.percentage}%` }}
                            className="h-full bg-slate-600 dark:bg-slate-400 rounded-lg"
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
          {userData.projects.length > 0 && (
            <section className="my-14 text-sm">
              <h3 className="mb-6">{'Projects'}</h3>
              <div className="flex flex-col gap-6">
                {userData.projects.map((project, index) => {
                  return (
                    <div className="flex" key={index}>
                      <div className="mr-8 max-w-[100px] w-full text-slate-400 dark:text-slate-400">
                        {project.project_name}
                      </div>
                      <div className="flex flex-col flex-1">
                        <p className="text-slate-600 dark:text-slate-300">{project.project_description}</p>

                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-900 dark:text-slate-100 hover:underline mt-2"
                          style={{ color: "blue" }}
                        >
                          {project.project_url.startsWith("Navigate to project - ") ? project.project_url.substring(21) : project.project_url}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}


          {userData.experiences.length > 0 && (
            <section className="my-14 text-sm">
              <h3 className="mb-6">{'Experiences'}</h3>
              <div className="flex flex-col gap-6">
                {userData.experiences.map((experience, index) => {
                  return (
                    <div className="flex" key={index}>
                      <div className="mr-8 max-w-[100px] w-full text-slate-400 dark:text-slate-400">
                        {experience.job_title}
                      </div>
                      <div className="flex flex-col flex-1">
                        <h4 className="mb-1">{experience.company_name}</h4>
                        <p className="text-slate-600 dark:text-slate-300">{experience.duration}</p>
                        <p className="mt-3 text-slate-600">{experience.job_description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {userData.achievements.length > 0 && (
            <section className="my-14 text-sm">
              <h3 className="mb-6">{'Achievements'}</h3>
              <div className="flex flex-col gap-6">
                {userData.achievements.map((achievement, index) => {
                  return (
                    <div className="flex" key={index}>
                      <div className="mr-8 max-w-[100px] w-full text-slate-400 dark:text-slate-400">
                        {achievement.achievement}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

        </div>
        <button
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-md border border-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10 w-full"
          onClick={downloadPDF}
        >Download as PDF
        </button>
      </main>
    </>
  );
}

export default Dashboard;