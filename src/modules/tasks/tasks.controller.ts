import { Request, Response } from 'express';
import { Task } from '../../entity/task.entity';
import TaskRepository from '../../repositories/task.repository';
import TaskValidation from './tasks.validation';

/**
 * This class handles API endpoints related to task management.
 */
class TaskController {
  /**
   * Creates a new task for the authenticated user.
   *
   * @param req - Express request object containing task data in the body
   * @param res - Express response object
   */
  async createTask(req: Request, res: Response) {
    const userId = req.user!.id;
    const { title, description, dueDate } = req.body;

    const { error, value } = TaskValidation.validateTaskData({
      title,
      description,
      dueDate,
    });

    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    const task = await TaskRepository.createTask(
      userId,
      value.title,
      value.description,
      value.dueDate
    );

    res.status(201).json({ message: 'Task created successfully', task });
  }

  /**
   * Retrieves all tasks for the authenticated user with pagination.
   *
   * @param req - Express request object with potential query string parameters for pagination
   * @param res - Express response object
   */
  async getTasks(req: Request, res: Response) {
    const userId = req.user!.id;

    // Get pagination parameters from query string
    const { error, value } = TaskValidation.validatePageParams(
      { page: req.query.page, pageSize: req.query.pageSize },
      { page: 1, pageSize: 10 }
    );

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const tasks = await TaskRepository.getUserTasksPage(
      userId,
      value.page,
      value.pageSize
    );
    res.status(200).json({ tasks });
  }

  /**
   * Gets a specific task by its ID.
   *
   * @param req - Express request object with task ID in the URL parameters
   * @param res - Express response object
   */
  async getTaskById(req: Request, res: Response) {
    const userId = req.user!.id;
    const taskId = Number(req.params.id);

    const { error, value } = TaskValidation.validateTaskId({ id: taskId });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the task exists and belongs to the current user
    const task: Task | null = await TaskRepository.getUserTask(
      userId,
      value.id
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ task });
  }

  /**
   * Update a task for the authenticated user.
   *
   * @param req - Express request object containing task data in the body
   * @param res - Express response object
   */
  async updateTask(req: Request, res: Response) {
    const userId = req.user!.id;
    const taskId = Number(req.params.id);
    const { title, description, dueDate } = req.body;

    const { error, value } = TaskValidation.validateUpdateData({
      id: taskId,
      title,
      description,
      dueDate,
    });

    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    const taskExists = await TaskRepository.userTaskExists(userId, taskId);

    if (!taskExists) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await TaskRepository.updateTask(
      value.id,
      value.title,
      value.description,
      value.dueDate
    );

    res.status(201).json({ message: 'Task updated successfully' });
  }

  /**
   * Mark a task as completed for the authenticated user.
   *
   * @param req - Express request object containing task data in the body
   * @param res - Express response object
   */
  async markTaskCompleted(req: Request, res: Response) {
    const userId = req.user!.id;
    const taskId = Number(req.params.id);
    const completed = req.body.completed;

    const { error, value } = TaskValidation.validateMarkComplete({
      id: taskId,
      completed,
    });

    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    const taskExists = await TaskRepository.userTaskExists(userId, taskId);

    if (!taskExists) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await TaskRepository.markTaskCompleted(value.id, completed);

    const message = completed
      ? 'Task marked as completed'
      : 'Task marked as incomplete';

    res.status(201).json({ message });
  }

  /**
   * Delete a task for the authenticated user.
   *
   * @param req - Express request object containing task data in the body
   * @param res - Express response object
   */
  async deleteTask(req: Request, res: Response) {
    const userId = req.user!.id;
    const taskId = Number(req.params.id);

    const { error, value } = TaskValidation.validateTaskId({ id: taskId });

    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    const taskExists = await TaskRepository.userTaskExists(userId, taskId);

    if (!taskExists) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const task = await TaskRepository.deleteTask(value.id);

    res.status(201).json({ message: 'Task deleted successfully', task });
  }
}

export default new TaskController();
