
import { MoreThanOrEqual, getCustomRepository } from 'typeorm';
import { ITask, IStatus, IPriority, ITaskType, Status } from '../interfaces';
import { PriorityRepository, ProjectRepository, StatusRepository, TaskRepository, TypeRepository, UserRepository } from '../repositories';
import { TaskEntity } from '../models';
export class TaskService {
    private taskRepository: TaskRepository;
    private statusRepository: StatusRepository;
    private priorityRepository: PriorityRepository;
    private typeRepository: TypeRepository;
    private userRepository: UserRepository;
    private projectRepository: ProjectRepository;

    constructor() {
        this.taskRepository = getCustomRepository(TaskRepository);
        this.statusRepository = getCustomRepository(StatusRepository);
        this.priorityRepository = getCustomRepository(PriorityRepository);
        this.typeRepository = getCustomRepository(TypeRepository);
        this.userRepository = getCustomRepository(UserRepository);
        this.projectRepository = getCustomRepository(ProjectRepository);
    }

    async getAllTaskForUser(id: number) {
        const tasks = await this.taskRepository.find({ where: { assignee: { id } }, relations: ['project'] });
        return tasks;
    }

    async getAllTaskForProject(id: number) {
        const tasks = await this.taskRepository.find({ where: { project: { id } }, relations: ['assignee'] });
        return tasks;
    }

    async getAllTasksByStatusAndPriority() {
        const tasks = await this.taskRepository.find({ relations: ['status', 'priority'] });

        const tasksByStatus = tasks.reduce((acc, task) => {
            const status = task.status;
            const priority = task.priority;
            let statusGroup = acc.find((group) => group.status.id === status.id);

            if (!statusGroup) {
                statusGroup = { status, tasks: [] };
                acc.push(statusGroup);
            }

            statusGroup.tasks.push({
                task: task.name,
                priority,
            });

            return acc;
        }, []);
        tasksByStatus.sort((a, b) => a.status.order - b.status.order);

        tasksByStatus.forEach((group) => {
            group.tasks.sort((a: { priority: { order: number; }; }, b: { priority: { order: number; }; }) => a.priority.order - b.priority.order);
        });

        return tasksByStatus;
    }


    async createTask(body: TaskEntity) {
        try {
            const { name, project, priority, type, status, assignee, startDate, endDate } = body;

            const targetAssignee = await this.userRepository.findOne({ where: { id: body.assignee.id } });

            if (!targetAssignee || targetAssignee.isActive === false) {
                return { isSuccess: false, isActive: false };
            }

            const targetProject = await this.projectRepository.findOne({ where: { id: project.id } });

            if (!targetProject) {
                return { isSuccess: false, outDated: true };
            }

            const inputStartDate = new Date(startDate);
            const inputEndDate = new Date(endDate);

            if (
                inputStartDate.getTime() < targetProject.startDate.getTime() ||
                inputEndDate.getTime() > targetProject.endDate.getTime()
            ) {
                return { isSuccess: false, outDated: true };
            }
            const task = new TaskEntity()
            task.name = name;
            const newTask = await this.taskRepository.save(task);
            targetProject.tasks.push(newTask);
            await this.projectRepository.save(targetProject);

            return { newTask, isSuccess: true };
        } catch (error) {
            console.log(error);
            return { isSuccess: false };
        }
    }


    async updateTask(id: number, body: Partial<TaskEntity>) {
        const task = await this.taskRepository.findOne({ where: { id } });
        if (!task) {
            return { isSuccess: false };
        }
        const targetAssignee = await this.userRepository.find({ where: { id: body.id } });
        if (!targetAssignee) {
            return { isSuccess: false, isActive: false };
        }

        const targetProject = await this.projectRepository.findOne({ where: { id: task.project.id } });

        if (!targetProject) {
            return { isSuccess: false, outDated: true };
        }

        const inputStartDate = new Date(body.startDate);
        const inputEndDate = new Date(body.endDate);

        if (
            inputStartDate.getTime() < targetProject.startDate.getTime() ||
            inputEndDate.getTime() > targetProject.endDate.getTime()
        ) {
            return { isSuccess: false, outDated: true };
        }
        const updatedTask = this.taskRepository.save({
            ...task, ...body
        })
        if (updatedTask) {
            return { updateTask: updatedTask, isSuccess: true };
        }

    }

    async deleteTask(id: string): Promise<{ isSuccess: boolean }> {
        const deletedTask = await this.taskRepository.delete(id);

        if (deletedTask) {
            return { isSuccess: true };
        }
    }

    async createStatus(body: IStatus) {
        const { name, order, isVisible } = body;

        if (await this.statusRepository.findOne({ where: { name } })) {
            return { isSuccess: false };
        }

        const exist = await this.statusRepository.findOne({ where: { order } });

        if (exist) {
            await this.statusRepository.update({ order: MoreThanOrEqual(order) }, { order: () => `"order" + 1` });
        }

        const newStatus = this.statusRepository.create({
            name,
            order,
            isVisible,
        });
        return { isSuccess: true, newStatus };
    }

    async listStatusInOrder() {
        const statusOrder = await this.statusRepository.find({ order: { order: 'ASC' } });
        return { isSuccess: true, statusOrder };
    }

    async updateStatus(id: number, body: IStatus) {
        const status = this.statusRepository.find({ where: { id: id } })
        if (!status) {
            return { isSuccess: false }
        }
        const updateStatus = this.priorityRepository.save({
            ...status,
            ...body
        })
        return { isSuccess: true, updateStatus };
    }
    async hiddenStatus(id: number) {
        const status = await this.statusRepository.find({ where: { id: id } })
        if (!status) {
            return { isSuccess: false }
        }
        const hiddenStatus = await this.statusRepository.save({
            ...status,
            isVisible: false
        })
        return { hiddenStatus, isSuccess: true }
    }

    async listPriorityInOrder() {
        const priorityOrder = await this.priorityRepository.find({ order: { order: 'ASC' } });
        return { isSuccess: true, priorityOrder };
    }

    async createPriority(body: IPriority) {
        const { name, order } = body;
        if (await this.priorityRepository.findOne({ where: { name } })) {
            return { isSuccess: false };
        }
        const exist = await this.priorityRepository.findOne({ where: { order } });

        if (exist) {
            await this.priorityRepository.update({ order: MoreThanOrEqual(order) }, { order: () => `"order" + 1` });
        }
        const newPriority = this.priorityRepository.create({
            name,
            order,
        });
        return { isSuccess: true, newPriority };
    }

    async updatePriority(id: number, body: IPriority) {
        const priority = this.priorityRepository.find({ where: { id: id } })
        if (!priority) {
            return { isSuccess: false }
        }
        const updatePriority = this.priorityRepository.save({
            ...priority,
            ...body
        })
        return { isSuccess: true, updatePriority };
    }

    async hiddenPriority(id: number) {
        const priority = await this.priorityRepository.find({ where: { id: id } })
        if (!priority) {
            return { isSuccess: false }
        }
        const hiddenPriority = await this.priorityRepository.save({
            ...priority,
            isVisible: false
        })
        return { hiddenPriority, isSuccess: true }
    }

    async createTaskType(body: ITaskType) {
        const { name, color } = body;

        if (await this.typeRepository.findOne({ where: { name } })) {
            return { isSuccess: false };
        }

        let updatedColor = color;

        switch (name) {
            case 'Default':
                updatedColor = 'White';
                break;
            case 'Bug':
                updatedColor = 'Red';
                break;
            case 'Feature':
                updatedColor = 'Green';
                break;
        }

        const newType = await this.typeRepository.create({
            name,
            color: updatedColor,
        });
        return { isSuccess: true, newType };
    }

    async listTaskType() {
        const types = await this.typeRepository.find();
        return { isSuccess: true, types };
    }

    async updateType(id: number, body: ITaskType) {
        const type = this.typeRepository.find({ where: { id: id } })
        if (!type) {
            return { isSuccess: false };
        }
        const updateType = await this.typeRepository.save({
            ...type, ...body
        })
        return { updateType, isSuccess: true }
    }

    async hiddenType(id: number) {
        const type = this.typeRepository.find({ where: { id: id } })
        if (!type) {
            return { isSuccess: false }
        }
        const hiddenType = await this.typeRepository.save({
            id: id, isVisible: false
        }
        )
        return { hiddenType, isSuccess: true };
    }
}
