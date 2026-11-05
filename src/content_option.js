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
    description: "4 November 2026: most of my updated recent works are on GitHub rather than here, as I've spent the last month cleaning up and publishing repos. For now, this website is outdated and is a work-in-progress till October. Until then, github.com/Ice-Citron is the most recent picture.",
    your_img_url: "/assets/images/Union_Square.JPG",
};

const dataabout = {
    title: "About Me",
    aboutme: `I'm a second-year Computing student at Imperial College London. I train robots. I make robots see. I build robots.`,
    currentProjects: [
        {
            title: "Project Ladder",
            codebase: "https://github.com/Ice-Citron/Project-Ladder.git",
            points: [
                "Successor of Project Automaton: I will attempt to publish my first robotic research paper on cable-insertion.",
                "On the side, I'm currently exploring coverage-driven, edge-case testing for robot deployment, which I believe will be a big bottleneck in robot deployment.",
            ],
        },
    ],
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
        jobtitle: "Full-Stack Developer (Contract)",
        where: "Nosco Asia — Singapore (Remote)",
        date: "May–Aug 2024",
    },
];

const skills = [
    {
        heading: "Languages",
        skills: [
            { name: "Python", level: "primary" },
            { name: "C/C++", level: "primary" },
            { name: "Kotlin" },
            { name: "Java" },
            { name: "Haskell" },
            { name: "TypeScript/JavaScript", level: "primary" },
            { name: "CUDA" },
            { name: "RISC-V assembly" },
        ],
    },
    {
        heading: "ML",
        skills: [
            { name: "PyTorch", level: "primary" },
            { name: "DDP", level: "primary" },
            { name: "Hugging Face Transformers", level: "primary" },
            { name: "LeRobot" },
            { name: "Weights & Biases" },
            { name: "NumPy" },
            { name: "vLLM" },
            { name: "llama.cpp" },
        ],
    },
    {
        heading: "Computer Vision",
        skills: [
            { name: "OpenCV" },
            { name: "YOLO" },
            { name: "SAM" },
            { name: "CNOS" },
            { name: "FoundationPose", level: "primary" },
            { name: "MegaPose", level: "primary" },
            { name: "6D pose estimation", level: "primary" },
            { name: "camera calibration" },
        ],
    },
    {
        heading: "Robotics & Simulation",
        skills: [
            { name: "ROS 2" },
            { name: "MuJoCo C API" },
            { name: "Gazebo" },
            { name: "Isaac Sim", level: "primary" },
            { name: "Universal Robots UR5e", level: "primary" },
            { name: "NVIDIA Cosmos 3" },
        ],
    },
    {
        heading: "Systems & Web",
        skills: [
            { name: "Linux/CUDA toolchain", level: "primary" },
            { name: "Git", level: "primary" },
            { name: "Docker" },
            { name: "GCP", level: "primary" },
            { name: "AWS" },
            { name: "OpenGL", level: "primary" },
            { name: "GLFW" },
            { name: "React", level: "primary" },
            { name: "Node.js", level: "primary" },
            { name: "Firebase", level: "primary" },
        ],
    },
    {
        heading: "FEA & Hardware",
        skills: [
            { name: "Fusion 360", level: "primary" },
            { name: "Blender", level: "primary" },
            { name: "Ansys Fluent", level: "primary" },
            { name: "LS-Dyna", level: "primary" },
            { name: "3D printing", level: "primary" },
            { name: "CNC" },
            { name: "high-voltage electronics", level: "primary" },
            { name: "Betaflight", level: "primary" },
            { name: "soldering" },
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
