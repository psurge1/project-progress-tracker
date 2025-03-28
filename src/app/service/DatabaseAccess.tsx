import { getDatabase, ref, get, set, update, push, remove, onValue, DataSnapshot } from "firebase/database";
import { initializeApp } from "firebase/app";

import Project from '../models/Project'
import firebaseConfig from "../../../storage/firebaseConfig"; // Import your Firebase config


const app = initializeApp(firebaseConfig);
console.log(app.name);

class DBManager {
    private db;
    private projectsRef;

    constructor() {
        this.db = getDatabase();
        this.projectsRef = ref(this.db, 'projects');
    }

    // Fetch all projects
    async getProjects(): Promise<Project[]> {
        try {
            const snapshot: DataSnapshot = await get(this.projectsRef);
            if (snapshot.exists()) {
                const projects: Project[] = [];
                snapshot.forEach((childSnapshot) => {
                    const project = childSnapshot.val() as Project;
                    projects.push(project);
                });
                return projects;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
            return [];
        }
    }

    // Fetch a specific project by ID
    async getProjectById(projectId: string): Promise<Project | null> {
        console.log("Querying Project: " + projectId);
        const projectRef = ref(this.db, 'projects/${projectId}');
        try {
            const snapshot: DataSnapshot = await get(projectRef);
            if (snapshot.exists()) {
                return snapshot.val() as Project;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching project:", error);
            return null;
        }
    }

    // Function to create a new project
    async createProject(projectData: Project): Promise<string | null> {
        try {
            const newProjectRef = push(this.projectsRef); // Generate a unique ID for the new project
            await set(newProjectRef, projectData); // Set the project data at the new reference
            return newProjectRef.key; // Return the unique ID of the new project
        } catch (error) {
            console.error("Error creating project:", error);
            return null;
        }
    }

    // Function to update a project's details
    async updateProject(projectId: string, updates: Partial<Project>): Promise<void> {
        const projectRef = ref(this.db, `projects/${projectId}`);
        try {
            await update(projectRef, updates);
            console.log("Project updated successfully!");
        } catch (error) {
            console.error("Error updating project:", error);
        }
    }

    // Function to delete a project
    async deleteProject(projectId: string): Promise<void> {
        const projectRef = ref(this.db, `projects/${projectId}`);
        try {
            await remove(projectRef);
            console.log("Project deleted successfully!");
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    }

    // Function to listen for real-time updates to a specific project
    listenForProjectUpdates(projectId: string, callback: (projectData: Project | null) => void): () => void {
        const projectRef = ref(this.db, `projects/${projectId}`);
        const onValueChange = (snapshot: DataSnapshot) => {
            if (snapshot.exists()) {
            callback(snapshot.val() as Project);
            } else {
            callback(null);
            }
        };

        onValue(projectRef, onValueChange);

        // Return a function to unsubscribe from the listener
        return () => {
            // Detach the listener
        };
    }
}

export default DBManager;
