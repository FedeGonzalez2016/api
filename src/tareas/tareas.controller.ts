import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { Tarea } from './tarea.model';

@Controller('tareas')
export class TareasController {
  private tareas: Tarea[] = [];

  @Get()
  getAllTareas(): Tarea[] {
    return this.tareas;
  }

  @Post()
  createTarea(@Body() tarea: Tarea): Tarea {
    tarea.id = Date.now();
    this.tareas.push(tarea);
    return tarea;
  }

  @Put(':id')
  updateTarea(@Param('id') id: number, @Body() updatedTarea: Tarea): Tarea {
    const tarea = this.tareas.find((tarea) => tarea.id === id);
    if (!tarea) {
      throw new NotFoundException('Tarea no encontrada');
    }
    tarea.title = updatedTarea.title;
    return tarea;
  }

  @Delete(':id')
  deleteTarea(@Param('id') id: number): void {
    const tareaIndex = this.tareas.findIndex((tarea) => tarea.id === id);
    if (tareaIndex === -1) {
      throw new NotFoundException('Tarea no encontrada');
    }
    this.tareas.splice(tareaIndex, 1);
  }
}
