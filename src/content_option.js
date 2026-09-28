const logotext = "SIENAR INDUSTRIES";
const meta = {
    title: "Sienar Industries",
    description: "Shi Hao Ng: Computing student at Imperial College London working on robotics and frontier AI",
};

const introdata = {
    title: "I'm Shi Hao",
    animated: {
        first: "I build and evaluate robot policies",
        second: "I write C++, PyTorch and occasionally build railguns",
        third: "I fly FPV drones",
    },
    description: "September 2026: most of my updated recent works are on GitHub rather than here, as I've spent the last month cleaning up and publishing repos. For now, this website is outdated and is a work-in-progress till October. Until then, github.com/Ice-Citron is the most recent picture.",
    your_img_url: "/assets/images/Union_Square.JPG",
};

const dataabout = {
    title: "About Me",
    aboutme: `I'm a second-year Computing student at Imperial College London. I just finished a summer as a Robotics & Machine Learning intern at Vikaso Robotics, where I built their first camera-to-robot calibration pipeline for a UR5e and RealSense setup, a configurable perception stack (three segmentation and four 6D pose models behind one interface), and a benchmark harness that reproduced each model's published BOP results across ten datasets.

Before that: a C++/OpenGL game engine, GPT-2 pre-trained from scratch on 4× H100s for my IB extended essay, an augmented railgun that averaged 132 km/h across ten firing trials, an FPV drone I designed and printed myself, and a summer welding inside glass furnaces in Taichung. I like the part of robotics where the software has to survive contact with hardware.`,
    currentProjects: [
        {
            title: "Project Ladder: Coverage-driven evaluation of learned manipulation policies",
            description: "A paper coming out of the Intrinsic AI for Industry Challenge, where our policy scored 89 on hidden evals versus 141 locally. The gap is the subject: how to know your local tests actually cover the conditions you'll be judged on. Targeting October 2026.",
        },
        {
            title: "GT-GAP",
            description: "Verification and certification infrastructure for learned robotic systems — tooling that produces evidence a third party can defend, not just a demo. Early, and being built with my co-founder Rucha.",
        },
    ],
    interests: "Startups, frontier AI, defence tech and robotics — specifically the question of how you prove a learned system works.",
};

const worktimeline = [
    {
        jobtitle: "Robotics & Machine Learning Intern",
        where: "Vikaso Robotics 4.0 — Aylesbury",
        date: "Jul–Sep 2026",
    },
    {
        jobtitle: "Re-Founder & Co-President",
        where: "Imperial College Drone Society",
        date: "Oct 2025–Apr 2026",
    },
    {
        jobtitle: "Engineering Intern (Welding & Hot Repair)",
        where: "Nosco Asia — Taiwan Glass, Taichung",
        date: "Jun–Jul 2025",
    },
    {
        jobtitle: "Team Lead & Technical Lead",
        where: "F1 in Schools — Team Anduril",
        date: "2023–2024",
    },
    {
        jobtitle: "Full-Stack Developer (Contract)",
        where: "Nosco Asia — Singapore (Remote)",
        date: "May–Aug 2024",
    },
    {
        jobtitle: "Silica Plant Researcher (Intern)",
        where: "Nosco Asia — Singapore",
        date: "Jun–Aug 2023",
    },
];

const skills = [
    {
        heading: "Languages",
        skills: [
            { name: "Python", level: "primary" },
            { name: "C/C++", level: "primary" },
            { name: "TypeScript/JavaScript", level: "primary" },
            { name: "Kotlin" },
            { name: "Java" },
            { name: "Haskell" },
            { name: "RISC-V assembly" },
        ],
    },
    {
        heading: "Machine Learning",
        skills: [
            { name: "PyTorch", level: "primary" },
            { name: "Distributed training (DDP)", level: "primary" },
            { name: "Hugging Face Transformers", level: "primary" },
            { name: "LeRobot" },
            { name: "YOLO" },
            { name: "SAM" },
            { name: "Weights & Biases" },
            { name: "NumPy" },
            { name: "vLLM" },
            { name: "llama.cpp" },
        ],
    },
    {
        heading: "Robotics & Simulation",
        skills: [
            { name: "Universal Robots UR5e", level: "primary" },
            { name: "6D pose estimation (FoundationPose, MegaPose, SAM-6D)", level: "primary" },
            { name: "NVIDIA Isaac Sim", level: "primary" },
            { name: "NVIDIA Isaac Lab" },
            { name: "MuJoCo (C API)" },
            { name: "Gazebo" },
            { name: "ROS 2" },
            { name: "OpenCV" },
            { name: "Intel RealSense" },
        ],
    },
    {
        heading: "Systems & Graphics",
        skills: [
            { name: "Linux / CUDA toolchain", level: "primary" },
            { name: "OpenGL", level: "primary" },
            { name: "GLFW" },
            { name: "Git", level: "primary" },
            { name: "Docker" },
        ],
    },
    {
        heading: "Web & Cloud",
        skills: [
            { name: "React", level: "primary" },
            { name: "Node.js", level: "primary" },
            { name: "Firebase", level: "primary" },
            { name: "Google Cloud Platform", level: "primary" },
            { name: "AWS" },
            { name: "Tailwind CSS" },
        ],
    },
    {
        heading: "CAD, FEA & Fabrication",
        skills: [
            { name: "Fusion 360", level: "primary" },
            { name: "Blender", level: "primary" },
            { name: "Ansys Fluent", level: "primary" },
            { name: "LS-Dyna", level: "primary" },
            { name: "Mastercam" },
            { name: "3D printing (FDM, resin, PET-CF)", level: "primary" },
            { name: "CNC machining" },
        ],
    },
    {
        heading: "Electronics & Hardware",
        skills: [
            { name: "High-voltage electronics", level: "primary" },
            { name: "Betaflight", level: "primary" },
            { name: "Soldering" },
            { name: "Circuit design" },
        ],
    },
];

const contactConfig = {
    YOUR_EMAIL: "shng2025@gmail.com",
    YOUR_IMPERIAL_EMAIL: "shi-hao.ng25@imperial.ac.uk",
    YOUR_FONE: "+44 7436 514 602",
    YOUR_LINKEDIN: "https://www.linkedin.com/in/shi-hao-ng-83b55b224/",
    description: "Feel free to reach out if you'd like to collaborate on frontier AI, defense tech, robotics, or anything interesting.",
    // creat an emailjs.com account
    // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
    YOUR_SERVICE_ID: "service_bicnrhc",
    YOUR_TEMPLATE_ID: "template_ui5x697",
    YOUR_USER_ID: "x79I4B5lifhvNyXSY",
};

const socialprofils = {
    github: "https://github.com/Ice-Citron",
    linkedin: "https://www.linkedin.com/in/shi-hao-ng-83b55b224/",
};
export {
    meta,
    dataabout,
    worktimeline,
    skills,
    introdata,
    contactConfig,
    socialprofils,
    logotext,
};
