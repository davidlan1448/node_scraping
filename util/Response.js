exports.success = (res, data, message = "Petición éxitosa" ,status, success = true) => {
    res.status(status || 200).send({
        data,
        message,
        success
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