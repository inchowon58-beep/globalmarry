# -*- coding: utf-8 -*-
"""Gemini API로 SeoPage JSON 생성 — 웹문서생성기 전용."""

from __future__ import annotations

import json
import re
import time
from typing import Any, Callable, Dict, List, Optional, Tuple

import requests

from nearby_geo import extract_region, extract_theme, nearby_areas, nearby_keyword_csv, nearby_stations

BRAND = "국제결혼정보원"
FARM = "국제결혼 정보"
SITE_NAME = "국제결혼정보원"
PHONE = "0505-300-7779"
LOCATION = "대한민국 전국"

GEMINI_MODELS: List[Dict[str, str]] = [
    {"id": "gemini-2.5-flash", "label": "Gemini 2.5 Flash (권장 · 빠르고 안정)"},
    {"id": "gemini-2.5-pro", "label": "Gemini 2.5 Pro (품질 우선)"},
    {"id": "gemini-2.5-flash-lite", "label": "Gemini 2.5 Flash-Lite (저비용)"},
    {"id": "gemini-3.5-flash", "label": "Gemini 3.5 Flash"},
    {"id": "gemini-3.1-flash-lite", "label": "Gemini 3.1 Flash-Lite"},
    {"id": "gemini-3.1-pro-preview", "label": "Gemini 3.1 Pro Preview"},
    {"id": "gemini-3-flash-preview", "label": "Gemini 3 Flash Preview"},
    {"id": "gemini-2.0-flash", "label": "Gemini 2.0 Flash"},
]

DEFAULT_MODEL = "gemini-2.5-flash"

DEFAULT_USER_PROMPT = """톤: 신뢰감 있는 국제결혼 정보 안내. 과장·허위·성공 보장 표현 금지.
키워드에 지역명이 있으면 그 지역에서 정보를 찾는 독자 시점으로 쓰세요.
본문은 정보성 가이드처럼, 광고 카피처럼 쓰지 마세요.
{keyword}를 제목·H1·본문·FAQ에 자연스럽게 넣으세요.
국제결혼정보원은 중개업체가 아니라 정보 플랫폼입니다.
"""

SYSTEM_SEO_RULES = f"""당신은 '{FARM} {BRAND}'({SITE_NAME})의 SEO·AEO·OG 웹문서 작성 전문가입니다.
업체명은 반드시 '{FARM}', '{BRAND}', '{SITE_NAME}'만 사용하세요. 다른 업체·중개업체 이름을 만들지 마세요.

전화: {PHONE}
서비스: 국제결혼 절차, 비용, 피해 예방, 정부 정식 등록 업체 비교, 국가별 혼인·비자 안내
범위: {LOCATION}
성격: 중개업체가 아닌 정보 플랫폼

[SEO]
- title 50~60자. 메인 키워드를 앞에 두고 브랜드 또는 국제결혼을 포함.
- metaDescription 140~160자. 키워드 + 절차·비용·정식등록업체 유도.
- metaKeywords 8~12개, 쉼표 구분. 키워드·국제결혼·국제결혼정보원·국제결혼절차·정식등록업체 포함.
- h1에 메인 키워드 포함. title과 완전히 같지 않게.
- 본문 3개 섹션. 각 h2는 서로 다른 각도(문제/원칙/절차 또는 FAQ 유도).
- 각 문단 140자 이상. 키워드 과다반복(키워드 스터핑) 금지. 자연 반복만.

[OG]
- og:title = title, og:description = metaDescription 로 쓸 수 있게 완결된 문장.
- heroSubtitle는 영문 또는 한영 혼합 한 문장.

[AEO]
- FAQ 4개. 실제 검색 질문형(어떻게, 가능한가요, 비용, 등록 등).
- 답변은 80자 이상, 한 질문에 한 주제. 첫 문장에서 바로 답.

[금지]
- 가격 단정, 성사 보장, 타사 비방, 허위 후기, 미등록 업체 추천.
- JSON 이외 설명·마크다운 금지.

아래 JSON 스키마만 출력하세요.
{{
  "title": "문자열",
  "metaDescription": "문자열",
  "metaKeywords": "쉼표 구분 문자열",
  "h1": "문자열",
  "heroSubtitle": "문자열",
  "sections": [
    {{"h2": "소제목1", "paragraphs": ["문단","문단","문단"]}},
    {{"h2": "소제목2", "paragraphs": ["문단","문단","문단"]}},
    {{"h2": "소제목3", "paragraphs": ["문단","문단"]}}
  ],
  "faqs": [
    {{"q": "질문1", "a": "답변"}},
    {{"q": "질문2", "a": "답변"}},
    {{"q": "질문3", "a": "답변"}},
    {{"q": "질문4", "a": "답변"}}
  ],
  "ctaText": "정식 등록 업체 비교 안내 문장"
}}
"""


def default_user_prompt() -> str:
    return DEFAULT_USER_PROMPT.strip() + "\n"


def model_choices() -> List[Dict[str, str]]:
    return list(GEMINI_MODELS)


def _extract_json(text: str) -> Dict[str, Any]:
    raw = (text or "").strip()
    fence = re.search(r"```(?:json)?\s*([\s\S]*?)```", raw)
    if fence:
        raw = fence.group(1).strip()
    start = raw.find("{")
    end = raw.rfind("}")
    if start < 0 or end <= start:
        raise ValueError("제미나이 응답에서 JSON을 찾지 못했습니다.")
    return json.loads(raw[start : end + 1])


def _api_url(model: str) -> str:
    mid = (model or DEFAULT_MODEL).strip() or DEFAULT_MODEL
    if mid.startswith("models/"):
        mid = mid[len("models/") :]
    return f"https://generativelanguage.googleapis.com/v1beta/models/{mid}:generateContent"


class GeminiRateLimitError(RuntimeError):
    """429 / quota 초과 — 잠시 후 재시도."""


def generate_gemini_json(
    keyword: str,
    api_key: str,
    model: str = DEFAULT_MODEL,
    user_prompt: str = "",
    timeout: int = 90,
) -> Dict[str, Any]:
    key = (api_key or "").strip()
    if not key:
        raise ValueError("제미나이 API 키가 없습니다.")
    kw = (keyword or "").strip() or "국제결혼"
    extra = (user_prompt or "").replace("{keyword}", kw).strip()
    user_text = f"메인 키워드: {kw}\n"
    if extra:
        user_text += "\n[추가 작성 지시]\n" + extra + "\n"
    user_text += "\n위 규칙과 스키마에 맞는 JSON만 출력하세요."

    payload = {
        "systemInstruction": {"parts": [{"text": SYSTEM_SEO_RULES}]},
        "contents": [{"role": "user", "parts": [{"text": user_text}]}],
        "generationConfig": {
            "temperature": 0.85,
            "maxOutputTokens": 8192,
            "responseMimeType": "application/json",
        },
    }
    res = requests.post(
        _api_url(model),
        params={"key": key},
        json=payload,
        timeout=timeout,
    )
    if res.status_code >= 400:
        try:
            err = res.json()
            msg = (
                (err.get("error") or {}).get("message")
                or err.get("message")
                or res.text[:400]
            )
        except Exception:
            msg = res.text[:400]
        if res.status_code == 429 or "RESOURCE_EXHAUSTED" in str(msg) or "quota" in str(msg).lower():
            raise GeminiRateLimitError(f"제미나이 한도/대기 ({res.status_code}): {msg}")
        raise RuntimeError(f"제미나이 API 오류 ({res.status_code}): {msg}")

    data = res.json()
    cands = data.get("candidates") or []
    if not cands:
        block = (data.get("promptFeedback") or {}).get("blockReason")
        raise RuntimeError(f"제미나이 응답이 비었습니다.{f' block={block}' if block else ''}")
    parts = (((cands[0] or {}).get("content") or {}).get("parts")) or []
    text = "".join(str(p.get("text") or "") for p in parts)
    if not text.strip():
        raise RuntimeError("제미나이 본문이 비었습니다.")
    return _extract_json(text)


def test_gemini_key(api_key: str, model: str = DEFAULT_MODEL) -> Tuple[bool, str]:
    try:
        generate_gemini_json(
            "국제결혼",
            api_key,
            model=model,
            user_prompt="FAQ는 짧게, 테스트용으로 간결하게.",
            timeout=45,
        )
        return True, f"연결 성공 · 모델 {model}"
    except Exception as exc:
        return False, str(exc)


def assemble_from_gemini(
    keyword: str,
    data: Dict[str, Any],
    *,
    slugify_fn: Callable[..., str],
    image_urls_fn: Callable[[int, int], List[str]],
    idx: int,
) -> Dict[str, Any]:
    from datetime import datetime

    kw = (keyword or "").strip() or "국제결혼"
    region = extract_region(kw)
    theme = extract_theme(kw)
    areas = nearby_areas(region)
    stations = nearby_stations(region)
    geo_kw = nearby_keyword_csv(kw)

    title = str(data.get("title") or f"{kw} | {FARM} {BRAND}")[:80]
    meta_desc = str(data.get("metaDescription") or "")
    if not meta_desc:
        meta_desc = (
            f"{kw} 안내 — {FARM} {BRAND}에서 국제결혼 절차·비용·정식 등록 업체 정보를 확인하세요. 문의 {PHONE}."
        )
    if areas or stations:
        near_bits = " · ".join((areas[:3] + stations[:3])[:4])
        if near_bits not in meta_desc:
            meta_desc = f"{meta_desc} 근방·인근({near_bits}) {theme} 검색 안내."
    meta_kw = str(data.get("metaKeywords") or "")
    if geo_kw and geo_kw not in meta_kw:
        meta_kw = f"{meta_kw}, {geo_kw}" if meta_kw else geo_kw

    sections = []
    for sec in data.get("sections") or []:
        if not isinstance(sec, dict):
            continue
        h2 = str(sec.get("h2") or "").strip()
        paras = [str(p).strip() for p in (sec.get("paragraphs") or []) if str(p).strip()]
        if h2 and paras:
            sections.append({"h2": h2, "paragraphs": paras})
    faqs = []
    for f in data.get("faqs") or []:
        if not isinstance(f, dict):
            continue
        q, a = str(f.get("q") or "").strip(), str(f.get("a") or "").strip()
        if q and a:
            faqs.append({"q": q, "a": a})

    now = datetime.utcnow().isoformat() + "Z"
    seed = abs(hash(f"{kw}|{idx}|gemini")) % 99999 + 1
    return {
        "slug": slugify_fn(kw, idx),
        "keyword": kw,
        "title": title,
        "metaDescription": meta_desc[:180],
        "metaKeywords": meta_kw,
        "h1": str(data.get("h1") or f"{kw} — {BRAND} 정보 가이드"),
        "heroSubtitle": str(data.get("heroSubtitle") or "Trusted International Marriage Info"),
        "heroBadge": "정식 등록 정보",
        "heroTitleLine1": kw,
        "heroTitleLine2": "절차 · 비용 · 업체 비교",
        "heroBar": "올바른 정보가 행복한 시작입니다",
        "sections": sections,
        "faqs": faqs,
        "images": image_urls_fn(3, seed),
        "ctaText": str(data.get("ctaText") or f"검증된 정식등록업체 확인 — {BRAND}"),
        "nearbyAreas": areas,
        "nearbyStations": stations,
        "regionLabel": region or "",
        "keywordTheme": theme,
        "generatedBy": "gemini",
        "geminiModel": "",
        "createdAt": now,
        "updatedAt": now,
    }


def build_gemini_page(
    keyword: str,
    idx: int,
    *,
    api_key: str,
    model: str,
    user_prompt: str,
    slugify_fn: Callable[..., str],
    image_urls_fn: Callable[[int, int], List[str]],
    retries: int = 3,
    on_log: Optional[Callable[[str], None]] = None,
) -> Dict[str, Any]:
    last_err: Optional[Exception] = None
    for attempt in range(1, max(1, retries) + 1):
        try:
            data = generate_gemini_json(keyword, api_key, model=model, user_prompt=user_prompt)
            page = assemble_from_gemini(
                keyword, data, slugify_fn=slugify_fn, image_urls_fn=image_urls_fn, idx=idx
            )
            page["geminiModel"] = model
            if not page["sections"] or not page["faqs"]:
                raise ValueError("섹션 또는 FAQ가 비었습니다.")
            return page
        except GeminiRateLimitError as exc:
            last_err = exc
            wait = min(45.0, 8.0 * attempt)
            if on_log:
                on_log(f"제미나이 한도 — {wait:.0f}초 대기 후 재시도 ({keyword} · {attempt}/{retries})")
            time.sleep(wait)
        except Exception as exc:
            last_err = exc
            if on_log:
                on_log(f"제미나이 실패 ({keyword} · {attempt}/{retries}): {exc}")
            if attempt < retries:
                time.sleep(1.6 * attempt)
    raise RuntimeError(str(last_err) if last_err else "제미나이 생성 실패")
