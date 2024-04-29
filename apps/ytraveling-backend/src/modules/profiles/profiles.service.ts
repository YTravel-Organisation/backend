import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
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
    if (dateOfBirth && !isPast(dateOfBirth)) {
      throw new BadRequestException('Date of birth cannot be in the future.');
    }
  }

  async create(createProfileDto: CreateProfileDto): Promise<string> {
    this.validateDateOfBirth(createProfileDto.dateOfBirth);
    await this.ensureUserExists(createProfileDto.userId);

    try {
      await this.prisma.profile.create({
        data: {
          ...createProfileDto,
          user: { connect: { id: createProfileDto.userId } },
        },
      });
      return 'Profile created successfully.';
    } catch (error) {
      console.error('Failed to create profile:', error);
      throw new InternalServerErrorException('Failed to create profile.');
    }
  }

  async update(
    profileId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<string> {
    if (updateProfileDto.dateOfBirth) {
      this.validateDateOfBirth(updateProfileDto.dateOfBirth);
    }
    if (updateProfileDto.userId) {
      await this.ensureUserExists(updateProfileDto.userId);
    }

    try {
      await this.prisma.profile.update({
        where: { id: profileId },
        data: updateProfileDto,
      });
      return 'Profile updated successfully.';
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw new InternalServerErrorException('Failed to update profile.');
    }
  }

  async findAll(limit: number, page: number) {
    const skip = limit * (page - 1);
    const profiles = await this.prisma.profile.findMany({
      skip,
      take: limit,
    });

    if (!profiles.length) {
      throw new NotFoundException('No profiles found.');
    }

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

  async remove(id: number): Promise<string> {
    await this.prisma.profile.delete({ where: { id } });
    return 'Profile deleted successfully.';
  }

  async addProfileImage(id: number, profileImage: string): Promise<string> {
    if (!profileImage.startsWith('http')) {
      throw new BadRequestException(
        'Invalid URL provided for the profile image.',
      );
    }

    await this.prisma.profile.update({
      where: { id },
      data: { profileImage },
    });

    return 'Profile image updated successfully.';
  }

  async addLastSearch(id: number, lastSearch: string): Promise<string> {
    await this.prisma.profile.update({
      where: { id },
      data: { lastSearch: { push: lastSearch } },
    });
    return 'Last search added successfully.';
  }

  async removeLastSearch(id: number, lastSearch: string): Promise<string> {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
      select: { lastSearch: true },
    });

    if (!profile) {
      throw new NotFoundException("Profile doesn't exist");
    }

    const updatedSearches = profile.lastSearch.filter(
      (search) => search !== lastSearch,
    );
    await this.prisma.profile.update({
      where: { id },
      data: { lastSearch: updatedSearches },
    });

    return 'Last search removed successfully.';
  }

  async removeAllLastSearch(id: number): Promise<string> {
    await this.prisma.profile.update({
      where: { id },
      data: { lastSearch: [] },
    });
    return 'All last searches removed successfully.';
  }
}
