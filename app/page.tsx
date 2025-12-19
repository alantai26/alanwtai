import { tech } from "./skills";
import { languages } from "./languages";

export default function Home() {

  return (
    <div className="w-full h-screen bg-black flex flex-col items-start justify-start pt-10 pl-150 pr-150">
      <h1 className="text-white text-4xl font-bold">Alan Tai</h1>
      <p className="text-gray-300 text-lg">Software Engineer</p>

      <h1 className="text-white text-2xl font-bold mt-16">About me</h1>
      <p className="text-gray-300 text-base leading-relaxed mt-4">
        I am a second year student at Northeastern University studying Computer Science with a minor in Economics!
        I recently was presented with the amazing opportunity to become a Software Engineering Co-op at NExT Consulting.
        What I will be doing here is building internal tools to help streamline operations and improve efficiency for companies such as Verizon and State Street.
        Some technologies I will be working with include React, Node.js, and AWS.
      </p>

      
      <h1 className="text-white text-2xl font-bold mt-16">Skills</h1>
      <div className="flex gap-8 mt-8">
        {languages.map((language) => (
          <div key={language.name} className="flex flex-col items-center">
            <img src={language.image} alt={language.name} className="w-16 h-16" />
            <p className="text-white text-sm mt-2">{language.name}</p>
          </div>
        ))}
      </div>

      <h1 className="text-white text-2xl font-bold mt-16">Libraries and Tools</h1>
      <div className="flex gap-8 mt-8">
        {tech.map((t) => (
          <div key={t.name} className="flex flex-col items-center">
            <img src={t.image} alt={t.name} className="w-16 h-16" />
            <p className="text-white text-sm mt-2">{t.name}</p>
          </div>
        ))}
      </div>

      <h1 className="text-white text-2xl font-bold mt-16">Projects</h1>

      <h1 className="text-white text-2xl font-bold mt-16">Experience</h1>
      

    </div>
  );
}
