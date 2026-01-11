import { Can } from "../auth/Can";

export default function Campaigns() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Campañas</h1>

      <Can allow={["admin", "operador"]}>
        <button>Crear campaña</button>
      </Can>

      <Can allow={["admin"]}>
        <button style={{ marginLeft: 8 }}>Eliminar campaña</button>
      </Can>
    </div>
  );
}
