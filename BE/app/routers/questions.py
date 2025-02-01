from fastapi import APIRouter, HTTPException

from app.main import format_res
# from app.services.question_generator import QuestionGenerator

router = APIRouter(
    prefix="/questions",
    tags=['Generate Questions']
)

# question_generator = QuestionGenerator()


@router.get("/generate_question/")
async def generate_question(topic: str = "baseball"):
    try:
        # question = question_generator.generate_question(topic)
        question = "goold"
        return format_res(200, {"question": question})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
