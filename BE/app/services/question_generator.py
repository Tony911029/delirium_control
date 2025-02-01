# import torch
# from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline, BitsAndBytesConfig
# from langchain_core.prompts import PromptTemplate
# import time


# class QuestionGenerator:
#     def __init__(self):
#         self.model_id = 'meta-llama/Meta-Llama-3-8B-Instruct'
#         self.device = "cuda"

#         # Load the tokenizer and model from local path
#         self.tokenizer = AutoTokenizer.from_pretrained(self.model_id)
#         self.pad_token = self.tokenizer.eos_token  # Set pad_token to eos_token

#         self.bnb_config = BitsAndBytesConfig(
#             load_in_4bit=True,
#             bnb_4bit_use_double_quant=True,
#             bnb_4bit_quant_type="nf4",
#             bnb_4bit_compute_dtype=torch.bfloat16
#         )
#         self.model = AutoModelForCausalLM.from_pretrained(
#             self.model_id,
#             device_map="cuda",
#             quantization_config=self.bnb_config
#         )

#         self.prompt_template = PromptTemplate(
#             input_variables=["topic"],
#             template=(
#                 "You are an English teacher. Generate 10 open-ended questions for new English learners about the topic: {topic}.\n"
#                 "Don't include the answers or annotation, only generate those 10 questions. \n"
#             )
#         )

#     def extract_questions(self, text: str) -> list[str]:
#         lines = text.split('\n')
#         questions = [line.strip() for line in lines if line.strip().endswith('?')]
#         return questions

#     def generate_question(self, topic: str) -> list[str]:
#         prompt = self.prompt_template.format(topic=topic)

#         # Use the pipeline with the loaded model and tokenizer
#         generator = pipeline(
#             "text-generation",
#             model=self.model,
#             tokenizer=self.tokenizer
#         )

#         # Generate the response
#         start_time = time.time()
#         response = generator(prompt, max_new_tokens=1000)[0]['generated_text']
#         end_time = time.time()
#         elapsed_time = end_time - start_time
#         print(f"Time taken to generate questions: {elapsed_time:.2f} seconds")

#         questions = self.extract_questions(response)
#         return questions
