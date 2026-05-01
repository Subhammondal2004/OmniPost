class ApiResponse <T> {
    statusCode: number;
    data: T;
    messgae: string;
    success: boolean

    constructor(
        statusCode: number,
        data: T,
        message: string,
        success: boolean
    ){
        this.statusCode = statusCode;
        this.data = data;
        this.messgae = message;
        this.success = statusCode < 400
    }
}

export { ApiResponse }