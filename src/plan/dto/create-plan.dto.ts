import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Premium', description: 'The name of the plan' })
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: true, description: 'Defines if the selection is enable for this plan' })
  selection: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: true, description: 'Defines if the preview is enable for this plan' })
  preview: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: true, description: 'Defines if the quick copy option is enable for this plan' })
  quickCopy: boolean;

  // @IsBoolean()
  // @IsNotEmpty()
  // @ApiProperty({example: true, description: 'Defines if the selection is enable for this plan'})
  // fontRecuperation: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: true, description: 'Defines if the history is enable for this plan' })
  history: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: true, description: 'Defines if the translation is enable for this plan' })
  translation: boolean;
}
