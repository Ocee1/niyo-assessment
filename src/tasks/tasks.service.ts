import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskDocument } from './enities/tasks.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { TaskGateway } from './tasks.gateway';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<Task>,
        private taskGateway: TaskGateway, 
    ) {}

    async findAll(): Promise<Task[]> {
        return this.taskModel.find().populate('user').exec();
    }

    async create(createTaskDto: CreateTaskDto, data: any): Promise<Task> {
        const newTask = new this.taskModel({...createTaskDto, user: data.id });
        this.taskGateway.emitTaskCreated(newTask); // Emit event
        return newTask.save();
    }

    async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
      return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        const result = await this.taskModel.findByIdAndDelete(id).exec();
        if (!result) {
          throw new NotFoundException(`Task with ID not found`);
        }
    }

    async findOne(id: string): Promise<Task> {
        const task = await this.taskModel.findById(id).populate('user').exec();
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return task;
    }

    async findAllByUser(userId: string): Promise<Task[]> {
        return this.taskModel.find({ user: userId }).populate('user').exec();
    }
}
