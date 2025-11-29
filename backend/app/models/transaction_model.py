from pydantic import BaseModel
from typing import List

class TransactionSummary(BaseModel):
    month: str
    income: float
    expenses: float
    savings: float

class ExpenseCategory(BaseModel):
    category: str
    amount: float
    percentage: float