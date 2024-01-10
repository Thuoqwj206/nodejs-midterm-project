import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, IInvitation, Status } from '../interfaces';
import NodeCache from 'node-cache';
import { EXPIRES_TIME, JWT_ACCESS_KEY, JWT_TIME, myCache } from '../configs';
import { InvitationRepository, ProjectRepository, UserRepository } from '../repositories';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { getCustomRepository } from 'typeorm';

export class AuthService {
    private userRepository: UserRepository;
    private invitationRepository: InvitationRepository;
    private projectRepository: ProjectRepository;

    constructor() {
        myCache.set('keyWithTTL', 'value', EXPIRES_TIME);
        this.userRepository = getCustomRepository(UserRepository)
        this.invitationRepository = getCustomRepository(InvitationRepository)
        this.projectRepository = getCustomRepository(ProjectRepository)
    }

    async registerUser(body: IUser) {
        const { username, fullName, password, email, invite_id } = body;

        if (await this.userRepository.find({
            where: {
                username: username
            }
        })) {
            return false;
        }
        const invitation = await this.invitationRepository.findOne({ where: { invite_id: invite_id } });
        if (!invitation) {
            return { isSuccess: false };
        }
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const newUser = await this.userRepository.create({
            username,
            fullName,
            email,
            password: hashed,
            invite_id,
        });
        if (invitation.status === 'ACTIVE') {
            const project = await this.projectRepository.findOne({ where: { id: invitation.project.id } });

            if (project) {
                project.members.push(newUser)
                invitation.status = Status.expired
                return { id: newUser.id, username: newUser.username, email: newUser.email }
            }
        } else {
            return { isSuccess: false };
        }
    }

    async loginUser(body: IUser) {
        const { username, password } = body;
        const user = await this.userRepository.findOne({ where: { username: username } });
        if (!user || user.isActive === false) {
            return { isSuccess: false, isUsername: true };
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return { isSuccess: false, isPassword: true };
        }
        if (user && validPassword) {
            const token = await jwt.sign(
                {
                    id: user.id,
                    isAdmin: user.isAdmin,
                },
                JWT_ACCESS_KEY as string,
                { expiresIn: JWT_TIME }
            );

            return { isSuccess: true, data: { user, token } };
        }
    }
    async logoutUser(token: string) {
        console.log(token);
        myCache.set(token.split(' ')[1], token);
    }
}
