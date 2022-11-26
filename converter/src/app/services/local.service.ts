import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private _Storage: Storage | null = null;

  constructor(
    public storage: Storage
  ) { 
    this.init();
  }

  public async init()
  {
    this._Storage = await this.storage.create()
    return this._Storage;
  }
  public set(key: string, data: any): void
  {
    this._Storage?.set(key, data);
  }

  public async get(key: string): Promise<any>
  {
    return await this._Storage?.get(key);
  }

  public async remove(key: string): Promise<any>
  {
    return await this._Storage?.remove(key)
  }

  public async keyExists(key: string): Promise<any> 
  {
    return await this._Storage?.keys();
  }
}
