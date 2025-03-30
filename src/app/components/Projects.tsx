import React, { useState, useEffect } from 'react';

import Project from '../models/Project';
import definedIcons from '../models/DefinedIcons';
import DBManager from '../service/DatabaseAccess';

import LinearProgressWithLabel from './LinearProgressWithLabel';

import { Unsubscribe } from 'firebase/database';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { Link } from '@mui/material';
import Image from 'next/image';

const dbm = new DBManager();

function Projects() {
    const [projs, setProjs] = useState<Project[]>([]);

    useEffect(() => {
        let unsubscribe: Unsubscribe | null = null;
        dbm.listenToProjects(setProjs).then((fn) => {
            unsubscribe = fn;
        });


        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    useEffect(() => {
        // does what needs to be done when projs is changed
        console.log(projs);
    }, [projs]);

    // const projects = dbManager.getProjects();
    return (
        <div>
            <div>
                {projs.map((proj: Project) => {
                    return (
                        <ProjectDetails key={proj.projectName} project={proj}/>
                    );
                })}
            </div>

            <button onClick={() => {
                dbm.deleteAllProjects();
            }}>
                Delete
            </button>
            <button onClick={() => {
                dbm.createProject("461L Project",  {
                    projectName: "461L Project",
                    description: "This project is a web application built using Flask and MongoDB, and React. The application manages users, projects, and hardware sets, allowing users to log in, join projects, and request hardware. The backend consists of four main Python files that handle different aspects of the application's functionality.",
                    type: "School",
                    progress: 10,
                    interestLevel: 1,
                    languages: ["JavaScript", "Python"],
                    tools: ["React", "Flask", "MongoDB"],
                    issues: ["Fully test backend endpoints with postman.", "Connect front end to backend."],
                    projectLink: "https://github.com/psurge1/461L-project"
                    });
                }}>
                Click
            </button>
        </div>
    );
}

function ProjectDetails({ project }: {project: Project}) {
    // const [proj, setProj] = useState<Project | null>();

    // useEffect(() => {
    //     let unsubscribe: Unsubscribe | null = null;
    //     dbm.listenToProject(project.projectName, setProj).then((fn) => {
    //         unsubscribe = fn;
    //     })

    //     return () => {
    //         if (unsubscribe) {
    //             unsubscribe()
    //         }
    //     };
    // }, [project.ProjectName]);

    // useEffect(() => {

    // }, [proj]);

    return (
        <Link href={project.projectLink} underline="none" rel="noopener noreferrer" target="_blank">
            <Card variant="outlined" sx={{ maxWidth: 360 }}>
                <Box sx={{ p: 2 }}>
                    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {project.projectName}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            {project.type}
                        </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {project.description}
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Stack direction="row" spacing="25%" sx={{  }}>
                        <Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Languages
                            </Typography>
                            {project.languages.map((value: string) => {
                                return (
                                    <Tooltip key={value} title={value}>
                                        <Box sx={{ width: 100, height: 100, position: 'relative' }}>
                                            <Image
                                                src={(definedIcons.has(value)) ? definedIcons.get(value) : "/window.svg"} // Make sure the path is correct
                                                alt={value}
                                                layout="fill" // This will make the image fill the Box size
                                                objectFit="contain" // Maintain aspect ratio
                                                priority // Optional: to prioritize loading the image
                                            />
                                        </Box>
                                    </Tooltip>
                                );
                            })}
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Tools
                            </Typography>
                            {project.tools.map((value: string) => {
                                return (
                                    <p key={value}>{value}</p>
                                );
                            })}
                        </Box>
                    </Stack>
                </Box>
                {/* <Divider/> */}
                <Box sx={{ p: 2 }}>
                    {/* <Typography gutterBottom variant="body2">
                        Progress
                    </Typography> */}
                    <LinearProgressWithLabel value={project.progress}/>
                </Box>
            </Card>
        </Link>
    );
}

export default Projects;
export { ProjectDetails };