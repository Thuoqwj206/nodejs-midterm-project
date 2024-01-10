
import { getCustomRepository } from 'typeorm';
import { IUser } from '../interfaces';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_KEY } from '../configs';
import { TaskService } from './task.service';
import { ProjectRepository, TaskRepository, UserRepository } from '../repositories';
import { UserEntity } from '../models';

export class UserService {
    private userRepository: UserRepository;
    private projectRepository: ProjectRepository
    private taskRepository: TaskRepository

    constructor() {
        this.userRepository = getCustomRepository(UserRepository);
        this.projectRepository = getCustomRepository(ProjectRepository);
        this.taskRepository = getCustomRepository(TaskRepository);
    }

    async getAllUsers() {
        const users = await this.userRepository.find();
        const userInfo: { Name: string; Email: string; }[] = []
        users.map(user => userInfo.push({ Name: user.fullName, Email: user.email }));
        return userInfo;
    }

    async deleteUser(id: number): Promise<{ isSuccess: boolean }> {
        const user = await this.userRepository.findOne({ where: { id: id } });

        if (!user) {
            return { isSuccess: false };
        }
        const tasks = await this.taskRepository.find();
        const projects = await this.projectRepository.find();
        for (const task of tasks) {
            if (task.assignee.id === id) {
                await this.taskRepository.delete(id)
            }
        }
        for (const project of projects) {
            if (project.members.includes(user)) {
                project.members.slice(project.members.indexOf(user), 1);
            }
        }
        await this.userRepository.remove(user);
        return { isSuccess: true };
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({ where: { id: id } })

        if (!user) {
            return { isSuccess: false };
        }

        const userProjects = [];
        const userTasks = [];
        const userInfo: { Name: string; Email: string; createAt: Date }[] = [];

        const projects = await this.projectRepository.find();

        for (const project of projects) {
            if (project.members.includes(user)) {
                userProjects.push(project.name);
            }
        }
        const tasks = await this.taskRepository.find();
        for (const task of tasks) {
            if (task.assignee.id === user.id) {
                userTasks.push(task.name);
            }
        }
        userInfo.push({ Name: user.fullName, Email: user.email, createAt: user.createdAt });
        return { id, userInfo, userProjects, userTasks, isSuccess: true };
    }

    async getUserProjects(token: string) {
        try {
            const accessToken = token.split(' ')[1]
            const decoded = await jwt.verify(accessToken, JWT_ACCESS_KEY) as IUser
            if (!decoded) {
                return { isSuccess: false }
            }
            const projects = await this.projectRepository.find({ where: { members: decoded } });
            return projects;
        } catch (error) {
            console.error('Error getting user projects:', error);
            throw error;
        }
    }

    async getUserTask(token: string) {
        try {
            const accessToken = token.split(' ')[1]
            const user = await jwt.verify(accessToken, JWT_ACCESS_KEY) as IUser
            if (!user) {
                return null; // Or throw an error
            }

            const tasks = await this.taskRepository.find({ where: { assignee: user } });
            return tasks;
        } catch (error) {
            console.error('Error getting user tasks:', error);
            throw error;
        }
    }

    async updateUser(userId: number, updatedData: UserEntity) {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                return { isSuccess: false };
            }
            Object.assign(user, updatedData);
            const updatedUser = await this.userRepository.save(user);
            return {
                updatedUser,
                isSuccess: true,
            };
        } catch (error) {
            console.error(`Error updating user with id ${userId}:`, error);
            throw error;
        }
    }

}