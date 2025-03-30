import { getDatabase, Database, Unsubscribe, ref, get, set, remove, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";

import Project from '../models/Project'
import firebaseConfig from "../../../storage/firebaseConfig"; // Import your Firebase config


const app = initializeApp(firebaseConfig);
console.log(app.name);

class DBManager {
    private database: Database;
    constructor() {
        this.database = getDatabase(app);
    }

    // async getProjects(): Promise<Project[]> {
    //     return [];
    // }

    // async getProject(projectName: string): Promise<Project | null> {
    //     const projRef = ref(this.database, 'projects/' + projectName);
    //     try {

    //     }
    //     catch (error) {
    //         console.error(error);
    //         return null;
    //     }
    // }

    async createProject(projectName: string, projectValue: Project): Promise<boolean> {
        const projRef = ref(this.database, 'projects/' + projectName);
        try {
            const snapshot = await get(projRef);
            if (snapshot.exists()) {
                console.log(`Project ${projectName} already exists!`);
                return false;
            }
            else {
                // await set(projRef, {
                //     projectName: projectName,
                //     description: projectValue.description,
                //     type: projectValue.type,
                //     progress: projectValue.progress,
                //     interestLevel: projectValue.interestLevel,
                //     languages: projectValue.languages,
                //     tools: projectValue.tools,
                //     issues: projectValue.issues
                // });
                await set(projRef, projectValue as Project);
                console.log(`Project ${projectName} added successfully!`);
                return true;
            }
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }

    async updateProject(projectName: string, projectValue: Project): Promise<boolean> {
        const projRef = ref(this.database, 'projects/' + projectName);
        try {
            const snapshot = await get(projRef);
            if (!snapshot.exists()) {
                console.log(`Project ${projectName} doesnt exist!`);
                return false;
            }
            else {
                // await set(projRef, {
                //     projectName: projectName,
                //     description: projectValue.description,
                //     type: projectValue.type,
                //     progress: projectValue.progress,
                //     interestLevel: projectValue.interestLevel,
                //     languages: projectValue.languages,
                //     tools: projectValue.tools,
                //     issues: projectValue.issues
                // });
                await set(projRef, projectValue as Project);
                console.log(`Project ${projectName} updated successfully!`);
                return true;
            }
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }

    async deleteAllProjects(): Promise<boolean> {
        const projRef = ref(this.database, 'projects');
        remove(projRef);
        return true;
    }

    async deleteProject(projectName: string): Promise<boolean> {
        const projRef = ref(this.database, 'projects/' + projectName);
        remove(projRef);
        return true;
    }

    async listenToProject(projectName: string, callback: (project: Project | null) => void): Promise<Unsubscribe> {
        const projectRef = ref(this.database, 'projects/' + projectName);
        
        return onValue(projectRef, (snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                callback(snapshot.val() as Project);
            }
            else {
                callback(null);
            }
        });
    }

    async listenToProjects(callback: (project: Project[]) => void): Promise<Unsubscribe> {
        const projectsRef = ref(this.database, 'projects');
        
        return onValue(projectsRef, (snapshot) => {
            if (snapshot.exists()) {
                const projArr: Project[] = Object.keys(snapshot.val()).map(k => snapshot.val()[k]);
                callback(projArr);
            }
            else {
                callback([]);
            }
        });
    }
}

export default DBManager;
