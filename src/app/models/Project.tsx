interface Project {
    projectName: string;
    description: string;
    type: string;
    progress: number;
    interestLevel: number;
    languages: string[];
    tools: string[];
    issues: string[];
    projectLink: string;
}

interface ProjectGroup {
    projectName: Project;
}

export default Project;
export {type ProjectGroup};