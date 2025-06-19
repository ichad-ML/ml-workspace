import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class TestDto2 {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
