import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async create(createProfileDto: CreateProfileDto): Promise<string> {
    const { userId, ...rest } = createProfileDto;

    const SearchUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    await this.prisma.profile.create({
      data: {
        user: { connect: { id: SearchUser.id } },
        userId,
        ...rest,
      },
    });

    return 'ProfileCreated';
  }

  async findAll(limit, page) {
    const skip = limit * (page - 1);
    return this.prisma.profile.findMany({
      skip: skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    const profile = await this.prisma.profile.findUnique({ where: { id } });
    if (!profile) {
      throw new NotFoundException("Profile doesn't exist");
    }
    return profile;
  }

  async update(
    profileId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<string> {
    const { userId, ...rest } = updateProfileDto;

    const searchUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!searchUser) {
      throw new Error('UserNotFound');
    }

    await this.prisma.profile.update({
      where: {
        id: profileId,
      },
      data: {
        user: { connect: { id: userId } },
        ...rest,
      },
    });
    return 'ProfileUpdated';
  }

  async remove(id: number) {
    const profile = await this.prisma.profile.findUnique({ where: { id } });
    if (!profile) {
      throw new NotFoundException("Profile doesn't exist");
    }
    await this.prisma.profile.delete({ where: { id } });
    return 'ProfileDeleted';
  }

  async addProfileImage(id: number, profileImage: string) {
    const profile = await this.prisma.profile.findUnique({ where: { id } });
    if (!profile) {
      throw new NotFoundException("Profile doesn't exist");
    }
    await this.prisma.profile.update({
      where: { id },
      data: { profileImage },
    });
    return 'ProfileImageAdded';
  }

  async addLastSearch(id: number, lastSearch: string) {
    const profile = await this.prisma.profile.findUnique({ where: { id } });
    if (!profile) {
      throw new NotFoundException("Profile doesn't exist");
    }
    await this.prisma.profile.update({
      where: { id },
      data: { lastSearch: [...profile.lastSearch, lastSearch] },
    });
    return 'LastSearchAdded';
  }

  async removeLastSearch(id: number, lastSearch: string) {
    const profile = await this.prisma.profile.findUnique({ where: { id } });
    if (!profile) {
      throw new NotFoundException("Profile doesn't exist");
    }
    await this.prisma.profile.update({
      where: { id },
      data: {
        lastSearch: profile.lastSearch.filter(
          (search) => search !== lastSearch,
        ),
      },
    });
    return 'LastSearchRemoved';
  }

  async removeAllLastSearch(id: number) {
    const profile = await this.prisma.profile.findUnique({ where: { id } });
    if (!profile) {
      throw new NotFoundException("Profile doesn't exist");
    }
    await this.prisma.profile.update({
      where: { id },
      data: { lastSearch: [] },
    });
    return 'LastSearchRemoved';
  }
}
