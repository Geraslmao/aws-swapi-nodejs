const { dynamodb } = require("../database/dynamoDB");
const { swapiService, obtenerDatosSWAPI, guardarEnDynamoDB } = require("../service/swapiServices");



const post = async (event) => {
  try {
    const personId = event.pathParameters?.id || "";
    const data = await obtenerDatosSWAPI(personId);
    await guardarEnDynamoDB(data);

    return {
      statusCode: 200,
      body: "Datos guardados en DynamoDB exitosamente.",
    };
  } catch (error) {
    console.error("Error al procesar y guardar los datos:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};

const get = async (event) => {
  try {
    const result = await dynamodb
      .scan({
        TableName: "SwapiDB",
      })
      .promise();

    const tasks = result.Items.map((task) => ({
      nombre: task.nombre,
      altura: task.altura,
      masa: task.masa,
      color_cabello: task.color_cabello,
      color_piel: task.color_piel,
      color_ojos: task.color_ojos,
    }));

    return {
      status: 200,
      body: tasks,
    };
  } catch (error) {
    console.error("Error al obtener los datos de DynamoDB:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};

module.exports = {
  post,
  get,
};