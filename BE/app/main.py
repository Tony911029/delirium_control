from fastapi import FastAPI, HTTPException, Request, status
from .custom_http_res import format_res
from .routers import questions
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse


app = FastAPI()


# TODO: refine the list
origins = [
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return format_res(exc.status_code, {"detail": exc.detail})


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    return format_res(status.HTTP_500_INTERNAL_SERVER_ERROR, {"detail": str(exc)})


# Register the endpoint
app.include_router(questions.router)
