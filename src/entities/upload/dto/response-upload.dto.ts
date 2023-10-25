import { ApiProperty } from '@nestjs/swagger';

export class ResponseUploadDto {
  @ApiProperty({
    example: '/avatars/avatar_pokemon.png',
    description: 'Url file',
  })
  avatar: string;
}
