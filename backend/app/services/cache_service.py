"""
Cache service to store scheme data in memory for faster chat responses.
This prevents repeated database queries and speeds up the chat.
"""

from datetime import datetime, timedelta
from typing import Optional, List, Dict
import asyncio

class SchemeCache:
    def __init__(self, ttl_minutes: int = 30):
        """
        Initialize cache with time-to-live in minutes.
        Default: 30 minutes
        """
        self.cache: Optional[List[Dict]] = None
        self.last_updated: Optional[datetime] = None
        self.ttl = timedelta(minutes=ttl_minutes)
        self._lock = asyncio.Lock()
    
    def is_expired(self) -> bool:
        """Check if cache has expired"""
        if self.last_updated is None:
            return True
        return datetime.utcnow() - self.last_updated > self.ttl
    
    async def get(self) -> Optional[List[Dict]]:
        """Get cached schemes if not expired"""
        async with self._lock:
            if self.cache is None or self.is_expired():
                return None
            return self.cache
    
    async def set(self, schemes: List[Dict]):
        """Set cache with new schemes data"""
        async with self._lock:
            self.cache = schemes
            self.last_updated = datetime.utcnow()
    
    async def clear(self):
        """Clear the cache"""
        async with self._lock:
            self.cache = None
            self.last_updated = None
    
    def get_stats(self) -> Dict:
        """Get cache statistics"""
        return {
            "cached": self.cache is not None,
            "scheme_count": len(self.cache) if self.cache else 0,
            "last_updated": self.last_updated.isoformat() if self.last_updated else None,
            "is_expired": self.is_expired(),
            "ttl_minutes": self.ttl.total_seconds() / 60
        }

# Global cache instance
scheme_cache = SchemeCache(ttl_minutes=30)
