export class Base {
  permission(model:any, type:string):boolean {
	return model && model.permissions && model.permissions.indexOf(type) != -1
  }
}
