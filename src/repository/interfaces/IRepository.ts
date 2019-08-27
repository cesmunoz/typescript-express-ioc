import * as mongoose from "mongoose";

export interface IRepository<T> {
  getAll: () => Promise<T[]>;
  get: (id: string) => Promise<T>;
  insert: (item: T) => Promise<T>;
  update: (_id: mongoose.Types.ObjectId, item: T) => Promise<T>;
  delete: (_id: string) => Promise<T>;
}
