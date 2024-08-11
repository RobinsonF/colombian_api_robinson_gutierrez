//PUNTO A
export const agruparPresidentesPorPartido = (presidentes) => {
    const agrupado = presidentes.reduce((acc, presidente) => {
        const partido = presidente.politicalParty;
        if (!acc[partido]) {
            acc[partido] = {
                partidoPolitico: partido,
                presidentes: [],
                conteo: 0,
            };
        }
        acc[partido].presidentes.push(presidente);
        acc[partido].conteo++;
        return acc;
    }, {});

    return Object.values(agrupado).sort((a, b) => b.conteo - a.conteo);
};

//PUNTO B
export const agruparAtraccionesPorDeptoCiudad = (atracciones) => {
    return atracciones.reduce((acc, atraccion) => {
        const { city } = atraccion;
        const { departmentId, name: cityName } = city;

        let departamento = acc.find(depto => depto.departmentId === departmentId);
        if (!departamento) {
            departamento = {
                departmentId,
                ciudades: []
            };
            acc.push(departamento);
        }

        let ciudad = departamento.ciudades.find(c => c.ciudad === cityName);
        if (!ciudad) {
            ciudad = {
                ciudad: cityName,
                atracciones: [],
                conteo: 0,
            };
            departamento.ciudades.push(ciudad);
        }

        ciudad.atracciones.push(atraccion);
        ciudad.conteo++;

        return acc;
    }, []);
};



//PUNTO C
export const agruparAeropuertosPorDeptoCiudad = (aeropuertos) => {
    return aeropuertos.reduce((acc, aeropuerto) => {
        const { department, city } = aeropuerto;
        const { id: departmentId, name: departmentName } = department;
        const { id: cityId, name: cityName } = city;

        let departamento = acc.find(depto => depto.departmentId === departmentId);
        if (!departamento) {
            departamento = {
                departmentId,
                departmentName,
                ciudades: []
            };
            acc.push(departamento);
        }

        let ciudad = departamento.ciudades.find(c => c.cityId === cityId);
        if (!ciudad) {
            ciudad = {
                cityId,
                ciudad: cityName,
                aeropuertos: [],
                conteo: 0,
            };
            departamento.ciudades.push(ciudad);
        }

        ciudad.aeropuertos.push(aeropuerto);
        ciudad.conteo++;

        return acc;
    }, []);
};


//PUNTO D
export const agruparAeropuertosPorRegionDeptoCiudadTipo = (aeropuertos) => {
    const agrupados = aeropuertos.reduce((acc, aeropuerto) => {
      const { department, city, type } = aeropuerto;
      const { regionId, name: departmentName } = department;
      const { name: cityName } = city;
  
      const regionName = getRegionNameById(regionId);
  
      if (!acc[regionName]) {
        acc[regionName] = { departamento: {} };
      }
  
      if (!acc[regionName].departamento[departmentName]) {
        acc[regionName].departamento[departmentName] = { ciudad: {} };
      }
  
      if (!acc[regionName].departamento[departmentName].ciudad[cityName]) {
        acc[regionName].departamento[departmentName].ciudad[cityName] = { tipo: {}};
      }
  
      if (!acc[regionName].departamento[departmentName].ciudad[cityName].tipo[type]) {
        acc[regionName].departamento[departmentName].ciudad[cityName].tipo[type] = 0;
      }
  
      acc[regionName].departamento[departmentName].ciudad[cityName].tipo[type]++;
  
      return acc;
    }, {});
  
    return { region: agrupados };
  };

const getRegionNameById = (regionId) => {
    const regiones = {
        1: "Caribe",
        2: "Pacifico",
        3: "Orinoquía",
        4: "Amazonia",
        5: "Andina",
        6: 'Insular'
    };

    return regiones[regionId] || "Desconocida";
};

