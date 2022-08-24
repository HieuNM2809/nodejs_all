const createRes = {
    success: (message, data) => ({ message, data, success: true }),
    error: (message, status = 400, data) => ({
        message, status, data
    })
}



module.exports = createRes;