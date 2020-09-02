import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "roleTransform",
})
export class RoleTransformPipe implements PipeTransform {
  transform(value: string): string {
    let roleName = "";
    switch (value) {
      case "CLIENTE_ROLE":
        roleName = "Persona natural";
        break;
      case "EMPRESA_ROLE":
        roleName = "Empresa";
        break;
      case "ADMIN_ROLE":
        roleName = "Administrador";
        break;

      default:
        // code...
        break;
    }

    return roleName;
  }
}
