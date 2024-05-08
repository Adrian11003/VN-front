'use client'

import Search from "@/app/ui/dashboard/search/search"
import styles from "@/app/ui/dashboard/Alumnos/Alumnos.module.css"
import Link from "next/link"
import Image from "next/image"
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import { useEffect, useState } from 'react';
import { getAlumnos } from "@/app/api/alumnos"

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
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Teléfono</th>
                        <th>N° de Documento</th>
                        <th>Dirección</th>
                        <th>Acción</th>
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
                                    <Link href={`/dashboard/Alumnos/${alumno.id}`}>
                                        <button className={`${styles.button} ${styles.view}`}>
                                            Ver
                                        </button>
                                    </Link>
                                    <button className={`${styles.button} ${styles.delete}`}>
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