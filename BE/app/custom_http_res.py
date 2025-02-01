from fastapi.responses import JSONResponse
from typing import Any
from datetime import datetime

from pydantic import BaseModel


# Define Pydantic models for response
class BaseResponseModel(BaseModel):
    status: int
    data: Any
    timestamp: str


def format_res(status_code: int, data: Any) -> JSONResponse:
    response = BaseResponseModel(
        status=status_code,
        data=data,
        timestamp=datetime.now().isoformat()
    )
    return JSONResponse(
        content=response.dict()
    )
