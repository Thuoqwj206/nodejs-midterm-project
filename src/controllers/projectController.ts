import { IProjectInterface } from "../interfaces/projectInterface";
import projectService from "../services/projectService";

export class projectController {
    private projectService: any;
    constructor() {
        this.projectService = projectService;
    }

    public getAllProject = (): [IProjectInterface] => {
        return this.projectService.getAllProject
    }

    public getProjectById = (): IProjectInterface => {
        return this.projectService.getProjectById
    }

    public createProject = (): IProjectInterface => {
        return this.projectService.createProject
    }

    public updateProject = (): IProjectInterface => {
        return this.projectService.updateProject
    }

    public deleteProject = () => {
        return this.projectService.deleteProject
    }

    public addProjectMember = () => {
        return this.projectService.addProjectMember
    }

    public deleteMemberFromProject = () => {
        return this.projectService.deleteMemberFromProject
    }
}