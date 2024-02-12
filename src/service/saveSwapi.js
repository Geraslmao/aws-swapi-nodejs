const { v4 } = require("uuid");
const axios = require("axios");
const AWS = require("aws-sdk");
const _ = require("lodash");

const { dynamodb } = require("../database/dynamoDB");

const post = async (event, context) => {
  try {
    const personId = event.pathParameters?.id || "";
    const swapiUrl = "https://swapi.py4e.com/api/people/" + personId;
    const response = await axios.get(swapiUrl);
    const data = response.data;
    const id = v4();

    // definimos el mapeo de cada campo y lo traducimos al espanol
    const mapeo = {
      name: "nombre",
      height: "altura",
      mass: "masa",
      hair_color: "color_cabello",
      skin_color: "color_piel",
      eye_color: "color_ojos",
    };

    // usamos la variable mapeo para mapear con lodash
    const translatedData = _.mapKeys(
      data,
      (valor, clave) => mapeo[clave] || clave
    );
    translatedData.id = id;

    // guardamos en la bd en DynamoDB
    await guardarEnDynamoDB(translatedData);

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

async function guardarEnDynamoDB(data) {
  const params = {
    TableName: "SwapiDB", // Reemplaza con el nombre de tu tabla en DynamoDB
    Item: data,
  };

  try {
    await dynamodb.put(params).promise();
    console.log("Datos guardados en DynamoDB exitosamente.");
  } catch (error) {
    console.error("Error al guardar en DynamoDB:", error.message);
    throw error;
  }
}

module.exports = {
  post,
};
