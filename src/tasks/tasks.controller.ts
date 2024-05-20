import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { Task } from './enities/tasks.schema';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { TasksService } from './tasks.service';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';


@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
    constructor (
        private taskService: TasksService
    ) {}
    @Post()
    async create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request, @Res() res: Response): Promise<void> {
        const user = req.user;
        const task = await this.taskService.create(createTaskDto, user );
        res.json(task);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.taskService.update(id, updateTaskDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.taskService.delete(id);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Task> {
        return this.taskService.findOne(id);
    }

    @Get('user/:userId')
    async findAllByUser(@Param('userId') userId: string): Promise<Task[]> {
        return this.taskService.findAllByUser(userId);
    }
}
