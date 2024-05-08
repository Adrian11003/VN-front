'use client'

import Search from "@/app/ui/dashboard/search/search"
import styles from "@/app/ui/dashboard/Alumnos/Alumnos.module.css"
import Link from "next/link"
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import { useEffect, useState } from 'react';
import { getAlumnos, deleteAlumno } from "@/app/api/alumnos"
import Swal from 'sweetalert2'

const AlumnosPag = () => {
    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAlumnos();
                setAlumnos(data);
            } catch (error) {
                console.error('Error al obtener los datos de los alumnos:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        // Mostrar el SweetAlert2 de confirmación
        Swal.fire({
          title: "¿Estás seguro?",
          text: "¡No podrás revertir esto!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminarlo",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await deleteAlumno(id);
              const updatedAlumnos = alumnos.filter((alumno) => alumno.id !== id);
              setAlumnos(updatedAlumnos);
              Swal.fire({
                title: "¡Eliminado!",
                text: "Tu alumno ha sido eliminado.",
                icon: "success",
              });
            } catch (error) {
              console.error("Error al eliminar el alumno:", error);
              // Mostrar SweetAlert2 de error si ocurre algún problema
              Swal.fire({
                title: "Error",
                text: "Hubo un problema al eliminar el alumno.",
                icon: "error",
              });
            }
          }
        });
      };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Buscar por alumno..." />
                <Link href="/dashboard/Alumnos/Crear">
                    <button className={styles.addButton}>Añadir Nuevo</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Nombres</td>
                        <td>Apellidos</td>
                        <td>Teléfono</td>
                        <td>N° de Documento</td>
                        <td>Dirección</td>
                        <td>Acción</td>
                    </tr>
                </thead>
                <tbody>
                {alumnos.map((alumno, index) => (
                        <tr key={index}>
                            <td>{alumno.nombres_alumno}</td>
                            <td>{alumno.apellidos_alumno}</td>
                            <td>{alumno.telefono_alumno}</td>
                            <td>{alumno.numero_dni}</td>
                            <td>{alumno.direccion_alumno}</td>
                            <td>
                                <div className={styles.buttons}>
                                    <Link href={`/dashboard/Alumnos/${alumno.alumno_id}`}>
                                        <button className={`${styles.button} ${styles.view}`}>
                                            Actualizar
                                        </button>
                                    </Link>
                                <button className={`${styles.button} ${styles.delete}`} onClick={() => handleDelete(alumno.alumno_id)}>
                                    Eliminar
                                </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination />
        </div>
    );
};

export default AlumnosPag