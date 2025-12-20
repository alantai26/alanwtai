import { tech } from "./skills";
import { languages } from "./languages";
import { projects } from "./projects";
import { experience } from "./experience";

export default function Home() {

  return (
    <div className="w-full overflow-y-auto bg-black flex flex-col items-start justify-start pt-10 pl-50 pr-50 pb-10">
      //Headshot and Introduction
      <div className="flex gap-6 items-start">
        <img src="/ALAN-TAI-HEADSHOT-1.png" alt="Alan Tai" className="w-24 h-34 flex-shrink-0 rounded-full" />
        <div>
          <h1 className="text-white text-4xl font-bold">Hi, my name is Alan!</h1>
          <p className="text-gray-300 text-base leading-relaxed mt-4">
            I am a second year student at Northeastern University studying Computer Science with a minor in Economics!
            I recently was presented with the amazing opportunity to become a Software Engineering Co-op at NExT Consulting.
            What I will be doing here is building internal tools to help streamline operations and improve efficiency for companies such as Verizon and State Street.
          </p>

          <h1 className="text-white text-1xl font-bold mt-6">Connect with me here:</h1>
          <div className="flex gap-6 mt-2">
            <a href="https://github.com/alantai26" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
              GitHub
            </a>
            <a href="https://linkedin.com/in/alantaineu" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
              LinkedIn
            </a>
            <a href="mailto:talan4030@gmail.com" className="text-gray-300 hover:text-white transition">
              Email
            </a>
          </div>
        </div>
      </div>

      //Skills Section
      <h1 className="text-white text-2xl font-bold mt-16">Languages</h1>
      <div className="flex gap-8 mt-8 flex-wrap w-full">
        {languages.map((language) => (
          <div key={language.name} className="flex flex-col items-center">
            <img src={language.image} alt={language.name} className="w-16 h-16 rounded-full" />
            <p className="text-white text-sm mt-2">{language.name}</p>
          </div>
        ))}
      </div>

      //Libraries and Tools
      <h1 className="text-white text-2xl font-bold mt-16">Libraries and Tools</h1>
      <div className="flex gap-8 mt-8 flex-wrap w-full">
        {tech.map((t) => (
          <div key={t.name} className="flex flex-col items-center">
            <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full" />
            <p className="text-white text-sm mt-2">{t.name}</p>
          </div>
        ))}
      </div>


      //Projects Section
      <h1 className="text-white text-2xl font-bold mt-16">Projects</h1>
      <div className="flex flex-col gap-8 mt-8 w-full">
        {projects.map((project) => (
          <div key={project.id} className="border border-gray-700 rounded-lg p-6 hover:border-gray-500 transition-all group relative">
            {project.image && <img src={project.image} alt={project.name} className="rounded-lg mb-4 w-30 h-30" />}
            <h3 className="text-white text-lg font-semibold">{project.name}</h3>
            <p className="text-gray-400 text-sm">{project.date}</p>
            <p className="text-gray-300 mt-3">{project.description}</p>
            <div className="flex gap-2 mt-4 flex-wrap">
              {project.techStack.map((tech) => (
                <span key={tech} className="text-xs bg-gray-700 text-gray-200 px-3 py-1 rounded">{tech}</span>
              ))}
            </div>
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 inline-block transition-all bg-gray-700 hover:bg-white text-gray-300 hover:text-black px-4 py-2 rounded font-medium"
              >
                View Project
              </a>
            )}
          </div>
        ))}
      </div>


      //Experience Section
      <h1 className="text-white text-2xl font-bold mt-16">Experience</h1>
      <div className="flex flex-col gap-8 mt-8 w-full">
        {experience.map((exp) => (
          <div key={exp.id} className="border border-gray-700 rounded-lg p-6">
            {exp.image && <img src={exp.image} alt={exp.company} className="rounded-lg mb-4 w-30 h-30 object-cover" />}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white text-lg font-semibold">{exp.title}</h3>
                <p className="text-gray-400">{exp.company}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">{exp.date}</p>
                <p className="text-gray-500 text-sm">{exp.location}</p>
              </div>
            </div>
            <ul className="mt-4 ml-4 space-y-2">
              {exp.achievements?.map((achievement, idx) => (
                <li key={idx} className="text-gray-300 text-sm list-disc">
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  );
}
