export class CreateTaskDto {
  title!: string;
  description!: string;
  status!: 'OPEN' | 'IN_PROGRESS' | 'DONE';
}