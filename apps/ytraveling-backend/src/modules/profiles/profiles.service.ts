import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../tools/database.config';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { isPast } from 'date-fns';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  private async ensureUserExists(userId: number): Promise<void> {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
  }

  private validateDateOfBirth(dateOfBirth: Date): void {
    if (!isPast(dateOfBirth)) {
      throw new BadRequestException('Date of birth cannot be in the future.');
    }
  }

  async create(createProfileDto: CreateProfileDto): Promise<string> {
    this.validateDateOfBirth(createProfileDto.dateOfBirth);
    await this.ensureUserExists(createProfileDto.userId);

    try {
      await this.prisma.profile.create({
        data: {
          user: { connect: { id: createProfileDto.userId } },
          ...createProfileDto,
        },
      });
      return 'Profile created successfully.';
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create profile.');
    }
  }

  async update(
    profileId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<string> {
    if (updateProfileDto.dateOfBirth) {
      this.validateDateOfBirth(updateProfileDto.dateOfBirth);
      await this.ensureUserExists(updateProfileDto.userId);
    }

    try {
      await this.prisma.profile.update({
        where: { id: profileId },
        data: {
          user: { connect: { id: profileId } },
          ...updateProfileDto,
        },
      });
      return 'Profile updated successfully.';
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to update profile.');
    }
  }

  async findAll(limit: number, page: number) {
    const skip = limit * (page - 1);
    const profiles = await this.prisma.profile.findMany({
      skip: skip,
      take: limit,
    });

    return profiles.map((profile) => ({
      ...profile,
      postalCode: profile.postalCode.toString(),
    }));
  }

  async findOne(id: number) {
    const profile = await this.prisma.profile.findUnique({ where: { id } });
    if (!profile) {
      throw new NotFoundException("Profile doesn't exist");
    }

    return {
      ...profile,
      postalCode: profile.postalCode.toString(),
    };
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
    console.log('Profile Image:', profileImage);
    if (!profileImage.startsWith('http')) {
      throw new BadRequestException(
        'Invalid URL provided for the profile image.',
      );
    }

    const profile = await this.prisma.profile.findUnique({ where: { id } });
    if (!profile) {
      throw new NotFoundException("Profile doesn't exist");
    }

    try {
      const updatedProfile = await this.prisma.profile.update({
        where: { id },
        data: {
          profileImage: profileImage,
        },
      });

      if (updatedProfile.profileImage !== profileImage) {
        throw new Error('Failed to update profile image.');
      }

      return 'Profile image updated successfully.';
    } catch (error) {
      console.error('Error updating profile image:', error);
      throw new InternalServerErrorException(
        'Failed to update profile image due to an unexpected error.',
      );
    }
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
