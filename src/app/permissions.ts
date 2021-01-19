export function permission(model, type):boolean {
    return model.permissions.indexOf(type) != -1;
}