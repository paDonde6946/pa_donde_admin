export const tipoUsuario = [
    { label: 'Administrador', value: '0' },
    { label: 'Usuario', value: '1' }
]

// export const estadoUsuario = [
//     { label: 'Inactivo', value: '0' },
//     { label: 'Activo', value: '1' },
// ]

export const estadoUsuario = { 0 : 'Inactivo' , 1 : 'Activo'  };
export const estadoServicio = {1 : 'Activo', 2 : 'En Camino' , 3 : 'Finalizado' , 4 : 'Inactivo' };

/**
 * 1 : Carro
 * 2 : Camioneta
 * 3 : Moto
 */
export const tipoVehiculo = {1 : 'Carro', 2 : 'Moto'}; 

/**
 * 1 : Carro
 * 2 : Camioneta
 * 3 : Moto
 */
 export const tipoVehiculoDropdown = [{ value: 1, name: 'Carro'}, { value: 2, name: 'Moto'}]; 
