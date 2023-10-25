import { ApiProperty } from "@nestjs/swagger";

export class UpdateStreamDto {
  @ApiProperty({ example: 'New Stream Direction', description: 'Updated stream direction' })
  streamDirection: string;

  @ApiProperty({ example: true, description: 'Updated stream status' })
  isActive: boolean;
}
