type ApiResultDTO =
  | { status: number, success: boolean; id: number }
  | { status: number, success: boolean; message: string }

export default ApiResultDTO;