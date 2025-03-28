interface Project {
    projectName: string;
    description: string;
    type: string;
    progress: number;
    interestLevel: number;
    languages: string[];
    tools: string[];
    issues: string[];
}

export default Project;