exports.success = (res, data, type, sourse, message = "Petición éxitosa" ,status, success = true) => {
    res.status(status || 200).send({
        message,
        success,
        type,
        sourse,
        data
    })
}

exports.error = (res, status = 500, error_code = 0, details = null, message = "Server error") => {
    console.error('[response error] ' , details);

    res.status(status).send({
        success: false,
        message,
        error_code,
        details
    });
}