from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    mongo_uri: str
    exa_api_key: str
    groq_api_key: str
    whatsapp_token: str
    jwt_secret: str

    class Config:
        env_file = ".env"

settings = Settings()