import { EntityRepository, Repository } from 'typeorm';
import { InvitationEntity } from '../models';
@EntityRepository(InvitationEntity)
export class InvitationRepository extends Repository<InvitationEntity> {
}
