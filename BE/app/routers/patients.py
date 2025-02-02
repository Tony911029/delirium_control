from fastapi import APIRouter, HTTPException

from app.main import format_res

router = APIRouter(
    prefix="/patients",
    tags=['Patients']
)

@router.get("/patients/{patient_id}")
async def get_patient():
    try:
        question = "good"
        return format_res(200, {"question": question})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/patients/")
async def get_patient():
    try:
        question = "good"
        return format_res(200, {"question": question})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
