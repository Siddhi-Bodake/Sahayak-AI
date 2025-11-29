from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    mongo_uri: str
    exa_api_key: str
    groq_api_key: str
    gemini_api_key: str
    gemini_chat_model: str
    gemini_embed_model: str
    chat_encryption_key: str
    whatsapp_token: str
    jwt_secret: str

    class Config:
        env_file = ".env"

settings = Settings()