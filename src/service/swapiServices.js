const { v4 } = require("uuid");
const axios = require("axios");
const { dynamodb } = require("../model/DocumentClient");


const traducirAtributos = (data) => {
  const mapeo = {
    name: "nombre",
    height: "altura",
    mass: "masa",
    hair_color: "color_cabello",
    skin_color: "color_piel",
    eye_color: "color_ojos",
  };

  return Object.keys(data).reduce((obj, key) => {
    obj[mapeo[key] || key] = data[key];
    return obj;
  }, {});
};

const obtenerDatosSWAPI = async (personId) => {
  const swapiUrl = "https://swapi.py4e.com/api/people/" + personId;
  const response = await axios.get(swapiUrl);
  return response.data;
};

const guardarEnDynamoDB = async (data) => {
  const id = v4();
  const translatedData = traducirAtributos(data);
  translatedData.id = id;

  const params = {
    TableName: "SwapiDB",
    Item: translatedData,
  };

  await dynamodb.put(params).promise();
};

module.exports = {
  obtenerDatosSWAPI,
  guardarEnDynamoDB,
};