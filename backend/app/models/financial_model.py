from pydantic import BaseModel

class FinancialHealthScore(BaseModel):
    overall: float
    savingsRate: float
    debtRatio: float
    budgetAdherence: float