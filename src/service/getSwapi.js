const { dynamodb } = require("../database/dynamoDB");


const get = async (event) => {

  const result = await dynamodb
    .scan({
      TableName: "SwapiDB",
    })
    .promise();

  const tasks = result.Items.map(task => ({
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
};

module.exports = {
  get,
};