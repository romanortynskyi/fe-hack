import BaseEntity from './base-entity';

interface UserEntity extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  token?: string;
  imgSrc?: string;
}

export default UserEntity;
