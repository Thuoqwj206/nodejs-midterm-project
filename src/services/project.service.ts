
import { IInvitation, IUser } from '../interfaces'
import { IProject } from '../interfaces/project.interface'
import Project from '../models/project'
import Invitation from '../models/invite'
import { stringify, v4 as uuid4 } from 'uuid'
import { IInvite } from '../interfaces/request-with-inviteid.interface'
import { startSession } from 'mongoose'
import slugify from 'slugify'


export const getAllProject = async () => {
    const projects = await Project.find()
    return projects
}

export const getProjectById = async (id: string) => {
    const project = await Project.findById(id)
    if (project) {
        return { project, isSuccess: true }
    }
    return { isSuccess: false }
}

export const createProject = async (body: IProject) => {
    const { name, startDate, endDate } = body
    const newProject = await new Project({
        name, slug: `${slugify(name, { lower: true })}-${uuid4()}`, startDate, endDate
    })
    await newProject.save()
    return { isSuccess: true, newProject }
}

export const updateProject = async (body: IProject, id: string) => {
    const updateProject = await Project.findOneAndUpdate(
        { _id: id },
        { $set: body },
        { new: true }
    )
    return { isSuccess: true, updateProject }
}

export const deleteProject = async (id: string) => {
    const project = await Project.findById(id)
    if (!project) {
        return { isSuccess: false }
    }
    await project.deleteOne()
    return { isSuccess: true }
}

export const addProjectMember = async (body: IProject, id: string) => {
    const { members } = body
    const updatedProject = await Project.findOneAndUpdate(
        { _id: id },
        { $pushAll: { members: members } },
        { new: true }
    );
    if (!updatedProject) {
        return { isSuccess: false }
    }
    return { updatedProject, isSuccess: true }
}

export const deleteMemberFromProject = async (body: IProject, id: string) => {
    const { members } = body
    console.log(members)
    const updatedProject = await Project.findOneAndUpdate(
        { _id: id },
        { $pullAll: { members: members } },
        { new: true }
    );
    if (!updatedProject) {
        return { isSuccess: false }
    }
    return { isSuccess: true, updatedProject }
}

export const createProjectInvitation = async (body: IInvitation) => {
    const { creator, status, project } = body
    const newInvitation = await new Invitation({
        invite_id: uuid4(),
        creator, status, project
    })
    if (newInvitation) {
        await newInvitation.save()
        return {
            newInvitation, isSuccess: true
        }
    }
    return { isSuccess: false }
}

export const addMemberFromInviteId = async (body: IInvite) => {
    const { userId, inviteId } = body
    const invitation: IInvitation = await Invitation.findOne({ 'invite_id': inviteId })
    if (!invitation) {
        return {
            isSuccess: false
        }
    }
    const session = await startSession()
    session.startTransaction()
    if (invitation.status === 'ACTIVE') {
        const projectUpdateResult = await Project.updateOne(
            { _id: invitation.project },
            { $addToSet: { members: userId } },
            { session }
        );

        const invitationUpdateResult = await Invitation.updateOne(
            { _id: invitation.id },
            { $set: { status: 'EXPIRED' } },
            { session }
        );
        console.log(projectUpdateResult, invitationUpdateResult)
        if (projectUpdateResult.modifiedCount === 1 && invitationUpdateResult.modifiedCount === 1) {
            await session.commitTransaction();
            session.endSession();
            const project = await Project.findById(invitation.project)
            return { isSuccess: true, project };
        } else {
            return {
                isSuccess: false
            }
        }
    }
}