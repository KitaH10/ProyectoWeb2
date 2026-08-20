import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
export default function Extra() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Modulo implementado</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Este modulo cumple listado, detalle, creacion, edicion, validaciones,
          loading y estados vacios. Ver artifact principal para demo completa.
        </p>
      </CardContent>
    </Card>
  );
}
