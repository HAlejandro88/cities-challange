

const saveData = async(model, data) => {
    try {
        const response = await model.find();
        if (response.length <= 0) {
            const createData = await model.create(data)
            return createData;
        } else {
            return 'los datos ya estan guardados'
        }
    } catch (error) {
        return 'no se pudo guardar los datos en la base de datos'
    }
}

module.exports = saveData;