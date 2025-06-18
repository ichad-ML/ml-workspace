import { IsNotEmpty, IsString } from "class-validator";

export class TestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  age: string;
}