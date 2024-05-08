
import styles from "@/app/ui/dashboard/Docentes/singleDocente/singleDocente.module.css";

const SingleDocentePage =  ({  }) => {

    

  return (
    <div className={styles.container}>
      
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
         <label>Nombre</label>
          <input type="text" name="Nombres" placeholder=""/>
          <label>Apellidos</label>
          <input type="email" name="Apellidos" placeholder="" />
          <label>Dirección</label>
          <input type="text" name="Dirección" />
          <label>Email</label>
          <input type="email" name="Email" />
          <label>Teléfono</label>
          <input type="text" name="telefono" placeholder="" />
          <label>N° de Documento</label>
          <textarea type="text" name="Dni" placeholder="" />
          <button>Actualizar</button>
        </form>
      </div>
    </div>
  );
};

export default SingleDocentePage;