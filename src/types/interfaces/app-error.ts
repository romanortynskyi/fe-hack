interface AppError {
  data: {
    statusCode: number
    message: string
    error: string
  }
}

export default AppError
