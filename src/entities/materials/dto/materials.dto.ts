import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MaterialsDto {
  @ApiProperty({ example: 'NextJS', description: 'Name material' })
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  materialName: string;

  @ApiProperty({ example: 1, description: 'Direction id' })
  @IsNumber()
  @IsNotEmpty()
  directionId: number;

  @ApiProperty({ example: 1, description: 'Question block id' })
  @IsNumber()
  @IsNotEmpty()
  questionBlockId: number;

  @ApiProperty({
    example: ['https://nextjs.org, ...'],
    description: 'Url material',
  })
  @IsString({ each: true })
  @IsNotEmpty()
  materialsUrl: string[];
}

export class ResponseMaterialsDto extends MaterialsDto {
  @ApiProperty({ example: '2023-06-19T11:56:30.734Z', description: 'CreateAt' })
  @IsString()
  createAt: string;

  @ApiProperty({
    example: '2023-06-19T11:56:30.734Z',
    description: 'UpdateAt',
  })
  updateAt: string;

  @ApiProperty({ example: 1, description: 'Material id' })
  @IsNumber()
  id: number;
}
