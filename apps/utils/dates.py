# -*- coding: utf-8 -*-
import datetime
from functools import lru_cache


@lru_cache(maxsize=None)
def days_ago(days):
    """ Дата N дней назад"""
    return datetime.date.today() - datetime.timedelta(days=days)
