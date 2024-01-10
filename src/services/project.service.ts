import { v4 as uuid4 } from 'uuid';
import slugify from 'slugify';
import jwt, { decode } from 'jsonwebtoken';
import { InvitationRepository, ProjectRepository, StatusRepository, TaskRepository } from '../repositories';
import { getCustomRepository } from 'typeorm';
import { IDecode, IInvitation, IProject, IUser, Status } from '../interfaces';
import { InvitationEntity, ProjectEntity, UserEntity } from '../models';
import { JWT_ACCESS_KEY } from '../configs';

export class ProjectService {
    private projectRepository: ProjectRepository
    private taskRepository: TaskRepository
    private statusRepository: StatusRepository
    private invitationRepository: InvitationRepository
    constructor() {
        this.projectRepository = getCustomRepository(ProjectRepository)
        this.taskRepository = getCustomRepository(TaskRepository)
        this.statusRepository = getCustomRepository(StatusRepository)
        this.invitationRepository = getCustomRepository(InvitationRepository)
    }
    async getAllProject() {
        const projects = await this.projectRepository.find();
        if (!projects) {
            return { isSuccess: false };
        }


        const projectData = Promise.all(
            projects.map(async (project) => {
                const { name, tasks } = project;
                const numOfTask = project.tasks.length;
                let closedTask: number = 0;
                for (const task of tasks) {
                    const taskStatus = task.status
                    if (taskStatus && taskStatus.name === 'Closed') {
                        closedTask += 1;
                    }
                }
                const process = (closedTask / numOfTask) * 100;
                return [{ name, numOfTask, process }];
            })
        );
        return { projectData, isSuccess: true };
    }

    async getProjectById(id: number) {
        const project = await this.projectRepository.findOne({ where: { id: id } });
        if (!project) {
            return { isSuccess: false };
        }
        if (project) {
            return { id, name: project.name, taskNames: project.tasks, memberNames: project.members };
        }
    }

    async createProject(body: IProject) {
        const { name, startDate, endDate } = body;
        const newProject = await this.projectRepository.create({
            name,
            slug: `${slugify(name, { lower: true })}-${uuid4()}`,
            startDate,
            endDate,
        });
        return { isSuccess: true, newProject };
    }

    async updateProject(body: ProjectEntity, id: number) {
        const targetProject = await this.projectRepository.findOne({ where: { id: id } })
        const inputStartDate = new Date(body.startDate);
        const inputEndDate = new Date(body.endDate);

        if (
            inputStartDate.getTime() < targetProject.startDate.getTime() ||
            inputEndDate.getTime() > targetProject.endDate.getTime()
        ) {
            return { isSuccess: false, outDated: true };
        }
        const updatedProject = this.projectRepository.save({
            ...targetProject, ...body
        })
        return { updatedProject, isSuccess: true }
    }

    async deleteProject(id: number) {
        const project = await this.projectRepository.findOne({ where: { id: id } });
        if (!project) {
            return { isSuccess: false };
        }
        await this.projectRepository.delete(project);
        return { isSuccess: true };
    }

    async addProjectMember(body: UserEntity[], id: number) {
        const project = await this.projectRepository.findOne({ where: { id: id } });
        if (!project) {
            return { isSuccess: false };
        } else {
            const noActiveUsers: UserEntity[] = []
            body.map(member => {
                if ((project.members.includes(member)) || member.isActive == false) {
                    noActiveUsers.push(member)
                }
                else {
                    project.members.push(member)
                }
            })
            return { project: project, noActiveUsers: noActiveUsers }
        }
    }

    async deleteMemberFromProject(body: UserEntity[], id: number) {
        const project = await this.projectRepository.findOne({ where: { id: id } });
        if (!project) {
            return { isSuccess: false };
        }
        else {
            body.map(member => {
                if (project.members.includes(member)) {
                    project.members.slice(body.indexOf(member), 1)
                }
            })
            return { project, isSuccess: true };
        }

    }

    async createProjectInvitation(token: string, id: number) {
        const project = await this.projectRepository.findOne({ where: { id } });
        if (project) {
            const accessToken = token.split(' ')[1];
            const decoded = jwt.verify(accessToken, JWT_ACCESS_KEY) as IDecode;
            const invite_id = uuid4()
            let invite = new InvitationEntity()
            invite.invite_id = invite_id
            const newInviteData = [decoded.id, id]
            const newInvitation = this.invitationRepository.save({
                ...invite, ...newInviteData
            });
            return {
                newInvitation,
                isSuccess: true,
            };
        }
        return { isSuccess: false };
    }

    async addMemberFromInviteId(token: string, inviteId: string) {
        const accessToken = token.split(' ')[1]
        const decoded = jwt.verify(accessToken, JWT_ACCESS_KEY) as UserEntity
        const invite = await this.invitationRepository.findOne({ where: { invite_id: inviteId } }) as InvitationEntity
        const project = await this.projectRepository.findOne({ where: { id: invite.project.id } })

        if (!project || invite.status === Status.expired || project.members.includes(decoded)) {
            return { isSuccess: false }
        }
        project.members.push(decoded)
        invite.status = Status.expired
        return { project, isSuccess: true }
    }
}
