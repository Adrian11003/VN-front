'use client'

import { useState, useEffect } from 'react';
import { getAlumnos, createAlumnos } from "@/app/api/alumnos";
import { getDniTipos } from "@/app/api/dni";
import { getApoderados } from '@/app/api/apoderados';
import styles from "@/app/ui/dashboard/Alumnos/addAlumnos/addAlumnos.module.css";
import Swal from 'sweetalert2'

const AddAlumnosPage = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [dniTipos, setDniTipos] = useState([]);
  const [apoderados, setApoderados] = useState([]);

  const [formData, setFormData] = useState({
    nombres_alumno: '',
    apellidos_alumno: '',
    direccion_alumno: '',
    telefono_alumno: '',
    numero_dni: '',
    dni_id: '',
    apoderado_id: '', // Agrega el campo para el ID del apoderado
  });

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const data = await getAlumnos();
        setAlumnos(data);
      } catch (error) {
        console.error('Error al obtener los alumnos:', error);
      }
    };

    const fetchDniTipos = async () => {
      try {
        const data = await getDniTipos();
        setDniTipos(data);
      } catch (error) {
        console.error('Error al obtener los tipos de DNI:', error);
      }
    };

    const fetchApoderados = async () => {
      try {
        const data = await getApoderados();
        setApoderados(data);
      } catch (error) {
        console.error('Error al obtener los apoderados:', error);
      }
    };

    fetchAlumnos();
    fetchDniTipos();
    fetchApoderados();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'numero_dni' ? parseInt(value, 10) : name === 'dni_id' || name === 'apoderado_id' ? parseInt(value, 10) : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createAlumnos(formData);

      if (response) {
        Swal.fire({
          title: "Good job!",
          text: "Alumno creado exitosamente",
          icon: "success"
        }).then(() => {
          // Redireccionar al listado de alumnos
          window.location.href = "/dashboard/Alumnos";
        });
      }
    } catch (error) {
      console.error('Error al crear el alumno:', error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder="Nombres" name="nombres_alumno" value={formData.nombres_alumno} onChange={handleChange} required />
        <input type="text" placeholder="Apellidos" name="apellidos_alumno" value={formData.apellidos_alumno} onChange={handleChange} required />
        <input type="text" placeholder="Dirección" name="direccion_alumno" value={formData.direccion_alumno} onChange={handleChange} required />
        <input type="text" placeholder="Teléfono" name="telefono_alumno" value={formData.telefono_alumno} onChange={handleChange} required />
        <input type="text" placeholder="Numero de Dni" name="numero_dni" value={formData.numero_dni} onChange={handleChange} required />
        <select name="dni_id" value={formData.dni_id} onChange={handleChange} required>
          <option value="">Seleccione un tipo de DNI</option>
          {dniTipos.map((tipoDni) => (
            <option key={tipoDni.dni_id} value={tipoDni.dni_id}>
              {tipoDni.tipo_dni}
            </option>
          ))}
        </select>
        <select name="apoderado_id" value={formData.apoderado_id} onChange={handleChange} required>
          <option value="">Seleccione un apoderado</option>
          {apoderados.map((apoderado) => (
            <option key={apoderado.apoderado_id} value={apoderado.apoderado_id}>
              {apoderado.nombres_apoderado} {apoderado.apellidos_apoderado}
            </option>
          ))}
        </select>
        <button type="submit" className={styles.crear}>Crear</button>
      </form>
    </div>
  );
};

export default AddAlumnosPage;
