export class Base {
  permission(model:any, type:string):boolean {
	return model?.permissions?.indexOf(type) != -1
  }
}
