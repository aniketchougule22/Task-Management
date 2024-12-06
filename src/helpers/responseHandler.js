const sendResponse=(res, statusCode, status, message, data) => {

    let response={
        status: status,
        message: message,
        data: data
    }
    res.status(statusCode).json(response)

}
module.exports = { 
    sendResponse 
};