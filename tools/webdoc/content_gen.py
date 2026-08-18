# -*- coding: utf-8 -*-
"""문서 본문 생성 (템플릿) — 국제결혼정보원.
키워드 전달 시 SeoPage 스키마(title/meta/OG/FAQ/hero)로
국제결혼 정보 상세 페이지를 생성합니다. 이미지는 3장.
"""

from __future__ import annotations

import hashlib
import json
import os
import random
import string
import time
from datetime import datetime
from typing import Any, Dict, List
from urllib.parse import quote

from nearby_geo import extract_region, extract_theme, nearby_areas, nearby_html_blocks, nearby_keyword_csv, nearby_stations
from gemini_gen import DEFAULT_MODEL, build_gemini_page

BRAND = "국제결혼정보원"
FARM = "국제결혼 정보"
SITE_NAME = "국제결혼정보원"
PHONE = "0505-300-7779"
PHONE_TEL = "05053007779"
LOCATION = "대한민국 전국"
IMAGE_BASE = "https://image.cattery.co.kr/weding"
IMAGE_COUNT = 10
IMAGE_USE = 3  # 히어로 1 + 본문 2


def _rng(keyword: str, idx: int) -> random.Random:
    seed = int(hashlib.md5(f"{keyword}|{idx}|cloud".encode()).hexdigest()[:8], 16)
    return random.Random(seed)


def image_urls(count: int, seed: int) -> List[str]:
    rng = random.Random(seed)
    pool = [f"{IMAGE_BASE}/{i:02d}.webp" for i in range(1, IMAGE_COUNT + 1)]
    rng.shuffle(pool)
    return pool[:count]


def slugify(keyword: str, idx: int) -> str:
    base = "".join(
        c if c.isalnum() or c in "-_" else "-" for c in keyword.lower().replace(" ", "-")
    )
    base = base.strip("-")[:36] or "gukjeinfo"
    tail = f"{idx:02d}{''.join(random.choices(string.ascii_lowercase + string.digits, k=4))}"
    return f"{base}-{tail}"


def _page_to_summary(page: Dict[str, Any]) -> Dict[str, str]:
    return {
        "slug": page["slug"],
        "keyword": page.get("keyword") or "",
        "title": page.get("title") or page.get("h1") or page["slug"],
        "metaDescription": page.get("metaDescription") or "",
        "h1": page.get("h1") or page.get("title") or page["slug"],
        "createdAt": page.get("createdAt") or "",
        "updatedAt": page.get("updatedAt") or page.get("createdAt") or "",
    }


def build_content(keyword: str, idx: int) -> Dict[str, Any]:
    rng = _rng(keyword, idx)
    kw = keyword.strip() or "국제결혼"
    heroes = [
        "Trusted International Marriage Info",
        "Process, Cost & Registered Agencies",
        "Start with Verified Information",
        "Gukje Marriage Information Center",
    ]
    line2_opts = [
        "절차 · 비용 · 업체 비교",
        "정식 등록 정보",
        "피해 예방 체크리스트",
        "국가별 가이드",
    ]
    bar_opts = [
        "올바른 정보가 행복한 시작입니다",
        "과장 광고보다 확인 가능한 정보",
        "계약 전 등록번호를 확인하세요",
        "정식 등록 업체만 안내합니다",
    ]
    intro_h2 = [
        f"{kw}, 왜 정확한 정보가 필요할까요",
        f"{kw} 알아보기 전 꼭 확인할 점",
        f"안전한 선택을 위한 {kw} 안내",
        f"{kw}와 국제결혼정보원의 원칙",
    ]

    title = f"{kw} | {BRAND} 절차·비용·정식등록업체"
    if len(title) > 60:
        title = f"{kw} | {BRAND}"
    region = extract_region(kw)
    theme = extract_theme(kw)
    areas = nearby_areas(region)
    stations = nearby_stations(region)
    meta_desc = (
        f"{kw} 안내 — {BRAND}에서 국제결혼 절차·비용·피해 예방과 "
        f"정부 정식 등록 업체 비교 정보를 확인하세요."
    )
    if areas or stations:
        near_bits = " · ".join((areas[:3] + stations[:3])[:4])
        meta_desc = f"{meta_desc} 근방·인근({near_bits}) {theme} 검색 안내."
    if len(meta_desc) > 160:
        meta_desc = meta_desc[:157] + "..."

    variants = ["차분히", "꼼꼼히", "따뜻하게"]
    tone = variants[idx % len(variants)]
    h2_0 = intro_h2[idx % len(intro_h2)]

    sections = [
        {
            "h2": h2_0,
            "paragraphs": [
                f"{kw}를 검색하셨다면, 가장 먼저 확인할 것은 확인할 수 있는 정보입니다. "
                f"{FARM} {BRAND}는 {tone} 절차·비용·피해 예방 포인트를 한곳에서 안내합니다.",
                f"급하게 상담부터 받기보다, 정부 정식 등록 업체인지와 계약서·환불 규정을 먼저 확인하는 것이 안전합니다. "
                f"{BRAND}는 과장 광고보다 확인 가능한 정보를 우선합니다.",
                f"관심 국가와 거주 지역을 기준으로 필요 서류와 일정을 정리한 뒤, "
                f"업체 비교 페이지에서 등록번호와 상호를 대조해 보세요.",
            ],
        },
        {
            "h2": f"{BRAND}가 {kw}에서 지키는 원칙",
            "paragraphs": [
                f"정식 등록 정보 안내, 계약 전 체크리스트, 국가별 절차 정리가 {BRAND}의 기준입니다. "
                f"성공 보장이나 무조건 성사 같은 표현은 쓰지 않습니다.",
                f"안내 범위는 {LOCATION}입니다. 지역명이 포함된 검색어는 근방 구·동 정보와 함께 연결합니다.",
                f"{kw}로 찾아오신 분이라면 비용 총액만 보지 말고 중개 수수료, 항공·체류, 번역·공증, "
                f"추가 비용을 항목별로 확인하세요. 문의 {PHONE}.",
            ],
        },
        {
            "h2": f"{kw} FAQ와 다음 단계",
            "paragraphs": [
                f"{kw} 정보를 확인한 뒤에는 검증된 정식 등록 업체 비교 페이지로 이동해 "
                f"상호·등록번호·전문 국가를 확인하세요.",
                f"{BRAND}는 중개 계약을 대리하지 않습니다. 최종 상담과 계약은 해당 업체와 직접 진행하시기 바랍니다.",
            ],
        },
    ]
    faqs = [
        {
            "q": f"{kw} 정보는 어디서 확인하나요?",
            "a": f"{BRAND} 정보 가이드와 업체 비교 페이지에서 절차·비용·정식 등록 정보를 확인할 수 있습니다. "
            f"제휴 문의는 사이트 하단 양식 또는 {PHONE}으로 남겨 주세요.",
        },
        {
            "q": "정식 등록 업체만 소개하나요?",
            "a": f"네. {BRAND}는 정부 정식 등록 업체 정보만 안내하는 것을 원칙으로 합니다. "
            f"등록번호와 대표자·소재지를 계약 전에 다시 확인하세요.",
        },
        {
            "q": f"{kw} 전국에서 이용할 수 있나요?",
            "a": "네. 전국 거주자를 대상으로 정보 가이드를 제공합니다. "
            f"문의 {PHONE}.",
        },
        {
            "q": "국제결혼정보원 문의 전화번호는?",
            "a": f"{PHONE}입니다. {SITE_NAME} 제휴·정보 문의로 남겨 주시면 됩니다.",
        },
    ]
    now = datetime.utcnow().isoformat() + "Z"
    line2 = line2_opts[idx % len(line2_opts)]
    geo_kw = nearby_keyword_csv(kw)
    meta_keywords = (
        f"{kw}, 국제결혼, 국제결혼정보원, 국제결혼절차, 국제결혼비용, "
        f"국제결혼업체, 정식등록업체, 결혼중개업"
    )
    if geo_kw:
        meta_keywords = f"{meta_keywords}, {geo_kw}"
    return {
        "slug": slugify(kw, idx),
        "keyword": kw,
        "title": title,
        "metaDescription": meta_desc,
        "metaKeywords": meta_keywords,
        "h1": f"{kw} — {BRAND} 정보 가이드",
        "heroSubtitle": heroes[idx % len(heroes)],
        "heroBadge": "정식 등록 정보",
        "heroTitleLine1": kw,
        "heroTitleLine2": line2,
        "heroBar": bar_opts[idx % len(bar_opts)],
        "sections": sections,
        "faqs": faqs,
        "images": image_urls(IMAGE_USE, rng.randint(1, 99999)),
        "ctaText": f"검증된 정식등록업체 확인 — {BRAND}",
        "nearbyAreas": areas,
        "nearbyStations": stations,
        "regionLabel": region or "",
        "keywordTheme": theme,
        "createdAt": now,
        "updatedAt": now,
    }


def write_html(page: Dict[str, Any], site_url: str) -> str:
    imgs = page.get("images") or []
    hero = imgs[0] if imgs else ""
    sections = ""
    for i, sec in enumerate(page["sections"]):
        ps = "".join(f"<p>{p}</p>" for p in sec["paragraphs"])
        sections += f"<section><h2>{sec['h2']}</h2>{ps}</section>"
        if i < 2 and i + 1 < len(imgs):
            sections += (
                f'<figure><img src="{imgs[i+1]}" alt="{page["keyword"]} 국제결혼 {i+2}" '
                f'loading="lazy"/></figure>'
            )
    faqs = "".join(
        f"<details><summary>{f['q']}</summary><p>{f['a']}</p></details>" for f in page["faqs"]
    )
    nearby = nearby_html_blocks(page.get("keyword") or "", page.get("regionLabel") or None)
    url = f"{site_url.rstrip('/')}/guide/{page['slug']}"
    og = hero or ""
    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8"/>
<title>{page['title']}</title>
<meta name="description" content="{page['metaDescription']}"/>
<meta name="keywords" content="{page['metaKeywords']}"/>
<link rel="canonical" href="{url}"/>
<meta property="og:type" content="article"/>
<meta property="og:title" content="{page['title']}"/>
<meta property="og:description" content="{page['metaDescription']}"/>
<meta property="og:url" content="{url}"/>
<meta property="og:image" content="{og}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="{page['title']}"/>
<meta name="twitter:description" content="{page['metaDescription']}"/>
<meta name="twitter:image" content="{og}"/>
</head>
<body>
<header><a href="{site_url}">{SITE_NAME}</a></header>
<article>
<h1>{page['h1']}</h1>
<p>{page['heroSubtitle']}</p>
{sections}
<section><h2>자주 묻는 질문</h2>{faqs}</section>
{nearby}
<p><a href="{site_url.rstrip('/')}/agencies">{page['ctaText']}</a></p>
</article>
</body>
</html>"""


def generate_batch(
    keywords: List[str],
    out_dir: str,
    site_url: str,
    sync_public: str = "",
    stop_requested=None,
    gen_mode: str = "template",
    gemini_api_key: str = "",
    gemini_model: str = DEFAULT_MODEL,
    gemini_prompt: str = "",
    on_log=None,
) -> List[str]:
    os.makedirs(out_dir, exist_ok=True)
    pages_dir = os.path.join(out_dir, "pages")
    os.makedirs(pages_dir, exist_ok=True)
    slugs: List[str] = []
    entries: List[Dict[str, str]] = []
    urls: List[str] = []
    n = len(keywords)
    gemini_gap = 2.8
    for i, kw in enumerate(keywords, 1):
        if stop_requested and stop_requested():
            break
        use_gemini = (gen_mode or "template").strip().lower() == "gemini"
        if use_gemini:
            if on_log:
                on_log(f"[{i}/{n}] 제미나이 생성 시작: {kw}")
            try:
                page = build_gemini_page(
                    kw,
                    i,
                    api_key=gemini_api_key,
                    model=gemini_model or DEFAULT_MODEL,
                    user_prompt=gemini_prompt or "",
                    slugify_fn=slugify,
                    image_urls_fn=image_urls,
                    on_log=on_log,
                )
                if on_log:
                    on_log(f"[{i}/{n}] 제미나이 완료: {page.get('slug')}")
            except Exception as exc:
                if on_log:
                    on_log(f"[{i}/{n}] 제미나이 실패 → 기본 양식: {kw} · {exc}")
                page = build_content(kw, i)
                page["generatedBy"] = "template-fallback"
        else:
            page = build_content(kw, i)
            page["generatedBy"] = "template"
        slugs.append(page["slug"])
        entries.append(_page_to_summary(page))
        with open(os.path.join(pages_dir, f"{page['slug']}.json"), "w", encoding="utf-8") as f:
            json.dump(page, f, ensure_ascii=False, indent=2)
        html = write_html(page, site_url)
        with open(os.path.join(out_dir, f"{page['slug']}.html"), "w", encoding="utf-8") as f:
            f.write(html)
        urls.append(f"{site_url.rstrip('/')}/guide/{quote(page['slug'])}")
        index = {
            "slugs": slugs,
            "entries": entries,
            "updatedAt": datetime.utcnow().isoformat() + "Z",
        }
        with open(os.path.join(out_dir, "index.json"), "w", encoding="utf-8") as f:
            json.dump(index, f, ensure_ascii=False, indent=2)
        if use_gemini and i < n:
            if on_log:
                on_log(f"[{i}/{n}] 다음 글까지 {gemini_gap:.0f}초 대기")
            left = float(gemini_gap)
            while left > 0:
                if stop_requested and stop_requested():
                    break
                step = min(0.5, left)
                time.sleep(step)
                left -= step
    if not urls:
        return []
    index = {
        "slugs": slugs,
        "entries": entries,
        "updatedAt": datetime.utcnow().isoformat() + "Z",
    }
    with open(os.path.join(out_dir, "index.json"), "w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False, indent=2)
    with open(os.path.join(out_dir, "urls.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(urls))
    if sync_public:
        pub_pages = os.path.join(sync_public, "pages")
        os.makedirs(pub_pages, exist_ok=True)
        existing: Dict[str, Any] = {"slugs": [], "entries": [], "updatedAt": ""}
        idx_path = os.path.join(sync_public, "index.json")
        if os.path.isfile(idx_path):
            with open(idx_path, encoding="utf-8") as f:
                existing = json.load(f)
        by_slug = {e["slug"]: e for e in (existing.get("entries") or []) if e.get("slug")}
        for slug, entry in zip(slugs, entries):
            if stop_requested and stop_requested():
                break
            src = os.path.join(pages_dir, f"{slug}.json")
            dst = os.path.join(pub_pages, f"{slug}.json")
            with open(src, encoding="utf-8") as f:
                data = f.read()
            with open(dst, "w", encoding="utf-8") as f:
                f.write(data)
            by_slug[slug] = entry
            if slug in existing.get("slugs", []):
                existing["slugs"].remove(slug)
            existing.setdefault("slugs", []).insert(0, slug)
        existing["entries"] = [by_slug[s] for s in existing["slugs"] if s in by_slug]
        existing["updatedAt"] = datetime.utcnow().isoformat() + "Z"
        with open(idx_path, "w", encoding="utf-8") as f:
            json.dump(existing, f, ensure_ascii=False, indent=2)
    return urls
