import { Task } from '../entity/task.entity';
import { AppDataSource } from '../../typeorm/data-source';

class TaskRepository {
  repository;

  constructor() {
    this.repository = AppDataSource.getRepository(Task);
  }

  /**
   * Creates a new task for a user.
   * @param {number} userId - The ID of the user who is creating the task.
   * @param {string} title - The title of the task.
   * @param {string} [description] - The description of the task (optional).
   * @param {Date} [dueDate] - The due date of the task (optional).
   * @returns {Promise<Task>} The created task.
   */
  async createTask(
    userId: number,
    title: string,
    description?: string,
    dueDate?: Date
  ): Promise<Task> {
    const task = this.repository.create({
      title,
      description,
      dueDate,
      user: { id: userId },
    });
    return this.repository.save(task);
  }

  /**
   * Check if a task exists by its ID.
   * @param {number} taskId - The ID of the task to retrieve.
   * @returns {Promise<boolean>} The task, or null if it does not exist.
   */
  async userTaskExists(userId: number, taskId: number): Promise<boolean> {
    return this.repository.exists({
      where: { id: taskId, user: { id: userId } },
    });
  }

  /**
   * Retrieves a task by its ID.
   * @param {number} taskId - The ID of the task to retrieve.
   * @returns {Promise<Task | null>} The task, or null if it does not exist.
   */
  async getTask(taskId: number): Promise<Task | null> {
    return this.repository.findOne({ where: { id: taskId } });
  }

  /**
   * Retrieves a user task by its ID.
   * @param {number} userId - The ID of the user (task creator).
   * @param {number} taskId - The ID of the task to retrieve.
   * @returns {Promise<Task | null>} The task, or null if it does not exist.
   */
  async getUserTask(userId: number, taskId: number): Promise<Task | null> {
    return this.repository.findOne({
      where: { id: taskId, user: { id: userId } },
    });
  }

  /**
   * Retrieves all tasks for a specific user.
   * @param {number} userId - The ID of the user whose tasks to retrieve.
   * @returns {Promise<Task[]>} A list of tasks for the user.
   */
  async getUserTasks(userId: number): Promise<Task[]> {
    return this.repository.find({ where: { user: { id: userId } } });
  }

  /**
   * Retrieves a paginated list of tasks for a specific user.
   * @param {number} userId - The ID of the user whose tasks to retrieve.
   * @param {number} page - The page number to retrieve.
   * @param {number} pageSize - The number of tasks per page.
   * @returns {Promise<Task[]>} A paginated list of tasks for the user.
   */
  async getUserTasksPage(
    userId: number,
    page: number,
    pageSize: number
  ): Promise<Task[]> {
    return this.repository.find({
      where: { user: { id: userId } },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  /**
   * Marks a task as completed.
   * @param {number} taskId - The ID of the task to mark as completed.
   * @returns {Promise<void>} Resolves when the task has been updated.
   */
  async markTaskCompleted(taskId: number, completed: boolean): Promise<void> {
    await this.repository.update(taskId, { completed });
  }

  /**
   * Updates a task's details.
   * @param {number} taskId - The ID of the task to update.
   * @param {string} title - The updated title of the task.
   * @param {string} [description] - The updated description of the task (optional).
   * @param {Date} [dueDate] - The updated due date of the task (optional).
   * @returns {Promise<void>} Resolves when the task has been updated.
   */
  async updateTask(
    taskId: number,
    title: string,
    description?: string,
    dueDate?: Date
  ): Promise<void> {
    await this.repository.update(taskId, { title, description, dueDate });
  }

  /**
   * Deletes a task by its ID.
   * @param {number} taskId - The ID of the task to delete.
   * @returns {Promise<void>} Resolves when the task has been deleted.
   */
  async deleteTask(taskId: number): Promise<void> {
    await this.repository.delete(taskId);
  }
}

export default new TaskRepository();
