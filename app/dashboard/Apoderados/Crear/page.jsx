import styles from "@/app/ui/dashboard/Apoderados/addApoderados/addApoderados.module.css"
const AddApoderadosPage = () => {
    return (
        <div className={styles.container}>
          <form action="" className={styles.form}>
            <input type="text" placeholder="Nombres" name="Nombres" required />
            <input type="text" placeholder="Apellidos" name="Apellidos" required />
            <input type="email" placeholder="Email" name="Email" required />
            <input type="text" placeholder="Teléfono" name="Telefono" required />
            <input type="text" placeholder="Dirección" name="Direccion" />
            <input type="text" placeholder="Dni" name="Dni" />
            <button type="submit">Crear</button>
          </form>
        </div>
      );
    };


export default  AddApoderadosPage 
